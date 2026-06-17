/**
 * Phase 0 — builds grammar_inventory.json from the live ESL data files.
 * Run: node exercices/tools/esl-inventory.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "js");
const OUT = path.join(__dirname, "..", "..");

function loadData(file) {
  const code = fs.readFileSync(path.join(ROOT, file), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.GRAMMAR_DATA;
}

const CATEGORY_MAP = {
  nom: "nominal",
  verb: "verbal",
  adj: "adjectival",
  pron: "pronominal",
  adv: "adverbial",
  disc: "discourse",
  num: "quantification"
};

const esl = loadData("esl-grammar-data.js");
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const cats = Object.keys(CATEGORY_MAP);

const inventory = {
  generated: new Date().toISOString(),
  language: "ESL",
  data_structure: {
    file: "exercices/js/esl-grammar-data.js",
    shape: "window.GRAMMAR_DATA[LEVEL][categoryKey] = { title, précis, points[] }",
    category_keys: CATEGORY_MAP,
    related_files: [
      "exercices/js/grammar-deep-lib.js (en deep micro-lessons)",
      "exercices/js/grammar-deep-content.js (point→deep mapping)",
      "exercices/js/precis-enrichment.js (en supplements, parses précis → pointsDetail)",
      "exercices/js/exercise-banks-extended.js (en exercise banks, _byLevel tiers)",
      "exercices/js/exercise-generator.js (assembles 40 exercises/level×category)"
    ]
  },
  entries: []
};

levels.forEach(function (lv) {
  cats.forEach(function (cat) {
    const d = esl[lv] && esl[lv][cat];
    if (!d) {
      inventory.entries.push({
        entry_id: "ESL|" + lv + "|" + cat,
        level: lv, category: CATEGORY_MAP[cat], category_key: cat,
        notion_label: null, present: false
      });
      return;
    }
    inventory.entries.push({
      entry_id: "ESL|" + lv + "|" + cat,
      level: lv,
      category: CATEGORY_MAP[cat],
      category_key: cat,
      notion_label: d.title || null,
      present: true,
      points: d.points || [],
      precis_length: (d.précis || "").length,
      has_pitfall: /✗|⚠️/.test(d.précis || ""),
      has_source: /\[Source:|📚/.test(d.précis || ""),
      cross_refs: ((d.précis || "").match(/→\s*[A-C][12]\|[a-z]+/g) || [])
    });
  });
});

inventory.summary = {
  total_slots: levels.length * cats.length,
  present: inventory.entries.filter(function (e) { return e.present; }).length,
  with_source: inventory.entries.filter(function (e) { return e.has_source; }).length
};

fs.writeFileSync(path.join(OUT, "grammar_inventory.json"), JSON.stringify(inventory, null, 2));
console.log("grammar_inventory.json:", inventory.summary);
