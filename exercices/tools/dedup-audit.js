/**
 * Indexes grammar content in exercices/js and outputs duplicate_map.json
 * Run: node exercices/tools/dedup-audit.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "js");

function loadData(file) {
  const code = fs.readFileSync(path.join(ROOT, file), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.GRAMMAR_DATA;
}

function tokenize(t) {
  return String(t || "").toLowerCase()
    .replace(/[^a-zàâäéèêëïîôùûüç0-9\s]/gi, " ")
    .split(/\s+/).filter(function (w) { return w.length > 2; });
}

function overlap(a, b) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (!A.size || !B.size) return 0;
  let shared = 0;
  A.forEach(function (w) { if (B.has(w)) shared++; });
  return shared / new Set([].concat([...A], [...B])).size;
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const cats = ["nom", "verb", "adj", "pron", "adv", "disc", "num"];
const entries = [];

function add(meta) {
  if (!meta.full_text || meta.full_text.length < 40) return;
  entries.push(meta);
}

const fle = loadData("fle-grammar-data.js");
const esl = loadData("esl-grammar-data.js");

[["fr", fle], ["en", esl]].forEach(function (pair) {
  const lang = pair[0];
  const data = pair[1];
  levels.forEach(function (lv) {
    cats.forEach(function (cat) {
      const d = data[lv] && data[lv][cat];
      if (!d) return;
      const precis = (d.précis || d.precis || "").replace(/📚 Sources[^\n]*\n?/g, "");
      add({
        entry_id: lang + "|" + lv + "|" + cat + "|precis|" + (d.title || cat),
        level: lv, language: lang, category: cat, rule_name: d.title || cat,
        field_type: "precis", full_text: precis, notion_id: cat,
        file_path: "exercices/js/" + (lang === "fr" ? "fle" : "esl") + "-grammar-data.js"
      });
    });
  });
});

const dups = [];
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const a = entries[i];
    const b = entries[j];
    if (a.language !== b.language || a.category !== b.category) continue;
    if (levels.indexOf(a.level) === levels.indexOf(b.level)) continue;
    const r = overlap(a.full_text, b.full_text);
    if (r > 0.4) {
      dups.push({
        entry_id_A: a.entry_id,
        entry_id_B: b.entry_id,
        field_type: "precis",
        overlap_ratio: Math.round(r * 100) / 100,
        flag_type: r > 0.6 ? "DUPLICATE_CANDIDATE" : "NEAR_DUPLICATE_CANDIDATE",
        decision_rule: r > 0.6 ? "R1" : "R10"
      });
    }
  }
}

const out = {
  generated: new Date().toISOString(),
  total_entries: entries.length,
  duplicate_pairs: dups.length,
  map: dups.sort(function (x, y) { return y.overlap_ratio - x.overlap_ratio; })
};

fs.writeFileSync(path.join(__dirname, "..", "..", "duplicate_map.json"), JSON.stringify(out, null, 2));
console.log("Indexed", entries.length, "entries;");
console.log("Duplicate pairs >0.40:", dups.length);
console.log("Wrote duplicate_map.json");
