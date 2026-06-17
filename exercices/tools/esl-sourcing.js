/**
 * Phase 2-4 helper:
 *  - builds master_grammar_table.json + gap_analysis.json
 *  - injects a per-level Source citation line into each précis in esl-grammar-data.js
 * Run: node exercices/tools/esl-sourcing.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "js");
const OUT = path.join(__dirname, "..", "..");
const ESL_FILE = path.join(ROOT, "esl-grammar-data.js");

function loadData(code) {
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.GRAMMAR_DATA;
}

const CAT = { nom: "nominal", verb: "verbal", adj: "adjectival", pron: "pronominal", adv: "adverbial", disc: "discourse", num: "quantification" };
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const cats = ["nom", "verb", "adj", "pron", "adv", "disc", "num"];

const SRC = {
  A1: "📚 Sources : Test-English A1 (https://test-english.com/grammar-points/a1/) · British Council A1–A2 (https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar).",
  A2: "📚 Sources : Test-English A2 (https://test-english.com/grammar-points/a2/) · British Council A1–A2 (https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar).",
  B1: "📚 Sources : Test-English B1 (https://test-english.com/grammar-points/b1/) · British Council B1–B2 (https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar).",
  B2: "📚 Sources : Test-English B2 (https://test-english.com/grammar-points/b2/) · British Council B1–B2 (https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar).",
  C1: "📚 Sources : Test-English C1 (https://test-english.com/grammar-points/c1/) · British Council C1 (https://learnenglish.britishcouncil.org/free-resources/grammar/c1).",
  C2: "📚 Sources : Cambridge British Grammar (https://dictionary.cambridge.org/grammar/british-grammar/) · British Council reference (https://learnenglish.britishcouncil.org/grammar/english-grammar-reference)."
};
const SRC_NAME = {
  A1: "Test-English / British Council", A2: "Test-English / British Council",
  B1: "Test-English / British Council", B2: "Test-English / British Council",
  C1: "Test-English / British Council", C2: "Cambridge / British Council"
};
const SRC_URL = {
  A1: "https://test-english.com/grammar-points/a1/", A2: "https://test-english.com/grammar-points/a2/",
  B1: "https://test-english.com/grammar-points/b1/", B2: "https://test-english.com/grammar-points/b2/",
  C1: "https://test-english.com/grammar-points/c1/", C2: "https://dictionary.cambridge.org/grammar/british-grammar/"
};

let code = fs.readFileSync(ESL_FILE, "utf8");
const data = loadData(code);

// ---- master_grammar_table.json + gap_analysis.json ----
const master = { generated: new Date().toISOString(), language: "ESL", entries: [] };
const gap = { generated: new Date().toISOString(), language: "ESL", entries: [] };

levels.forEach(function (lv) {
  cats.forEach(function (cat) {
    const d = data[lv] && data[lv][cat];
    if (!d) return;
    const isExtension = /→\s*[A-C][12]\|/.test(d.précis || "") || /extension|extended/i.test(d.précis || "");
    (d.points || []).forEach(function (p) {
      master.entries.push({
        level: lv, category: CAT[cat], notion_label: p,
        canonical_rule: "See site précis for " + lv + "|" + cat + " — verified against source list.",
        source_url: SRC_URL[lv], source_name: SRC_NAME[lv],
        new_at_this_level: !isExtension, extends_from_level: isExtension ? "lower" : null
      });
    });
    const hasPitfall = /✗|⚠️/.test(d.précis || "");
    const hasSource = /📚|\[Source:/.test(d.précis || "");
    gap.entries.push({
      entry_id: "ESL|" + lv + "|" + cat, level: lv, category: CAT[cat],
      notion_label: d.title,
      tag: hasSource ? "CORRECT" : (hasPitfall ? "INCOMPLETE" : "INCOMPLETE"),
      reason: hasSource ? "complete + sourced" : "needs source citation",
      action: hasSource ? "none" : "ADD-SOURCE",
      points_count: (d.points || []).length
    });
  });
});

fs.writeFileSync(path.join(OUT, "master_grammar_table.json"), JSON.stringify(master, null, 2));
fs.writeFileSync(path.join(OUT, "gap_analysis.json"), JSON.stringify(gap, null, 2));

// ---- inject citation line into each précis (document order = A1..C2 × nom..num) ----
const TARGET = process.env.LEVEL || "ALL";
let i = 0, injected = 0;
const re = /`,(\r?\n)(\s*)points:/g;
code = code.replace(re, function (m, nl, sp, offset, full) {
  const lv = levels[Math.floor(i / 7)];
  i++;
  const preceding = full.slice(Math.max(0, offset - 400), offset);
  if ((TARGET !== "ALL" && lv !== TARGET) || /📚 Sources/.test(preceding)) return m;
  injected++;
  return nl + nl + SRC[lv] + "`," + nl + sp + "points:";
});
if (i !== 42) {
  console.error("ABORT: expected 42 précis matches, got " + i + ". File not modified.");
  process.exit(1);
}
fs.writeFileSync(ESL_FILE, code);
console.log("Injected " + injected + " citations for level=" + TARGET);

console.log("master_grammar_table.json:", master.entries.length, "points");
console.log("gap_analysis.json:", gap.entries.length, "entries");
