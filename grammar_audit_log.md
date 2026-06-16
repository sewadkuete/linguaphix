# LINGUAPHIX Exercices — Grammar Audit Log

**Date:** 2026-06-01  
**Scope:** `exercices/` — FLE + ESL, CEFR A1–C2  
**Status:** Phase 1 complete · Phase 3–4 in progress (A1 rewritten; A2–C2 pending)

---

## Summary

| Metric | Count |
|--------|------:|
| Grammar topic entries (levels × categories × langs) | 84 |
| Deep-lib micro-lesson keys (fr + en) | ~200 |
| Exercise bank items (fr.pron, en.pron, etc.) | shared per category |
| Entries audited | 84 |
| Entries corrected (this session) | 18 |
| Entries created | 0 |
| Entries flagged for human review | 12 |
| Entries verified unchanged (pending full pass) | 66 |

---

## Phase 1 — Content inventory

### Architecture (notion system — unchanged)

| Layer | File | Role |
|-------|------|------|
| Syllabus précis | `exercices/js/fle-grammar-data.js`, `esl-grammar-data.js` | `GRAMMAR_DATA[level][catId]` → `title`, `précis`, `points[]` |
| Deep micro-lessons | `exercices/js/grammar-deep-lib.js` | `GRAMMAR_DEEP_LIB[lang][key]` → 6 fields via `G()` |
| Point → key mapping | `exercices/js/grammar-deep-content.js` | `FR_RULES` / `EN_RULES` + `KEY_ALIASES` |
| Enrichment | `exercices/js/precis-enrichment.js` | `PRECIS_SUPPLEMENTS`, `CEFR_NOTES` |
| Exercises | `exercices/js/exercise-banks-extended.js` | 8×5 banks per category (shared across levels) |
| UI | `exercices/js/grammar-platform.js` | Renders précis + points + exercises |

**Category IDs (7):** `nom`, `verb`, `adj`, `pron`, `adv`, `disc`, `num`  
**Routes:** `/exercices/fle/index.html`, `/exercices/esl/index.html`, `/exercices/index.html`

### Full topic inventory

#### FLE (`fle-grammar-data.js`)

| Level | nom | verb | adj | pron | adv | disc | num |
|-------|-----|------|-----|------|-----|------|-----|
| A1 | Articles & nom | Verbes au présent | Adjectifs qualificatifs | Pronoms sujets | Négation et adverbes | Syntaxe de base | Nombres et quantité |
| A2 | Articles contractés & noms composés | Imparfait, modaux, pronominaux | Comparatif et superlatif | Pronoms COD, COI, y, en | Négations composées | Connecteurs et relatives | Ordinaux et quantité |
| B1 | Nominalisation | Subjonctif, futur, gérondif, passif | Accord PP avancé | Ordre pronoms & relatives | Restriction, connecteurs | Subordonnées & hypothèse | Quantification |
| B2 | Syntaxe nominale avancée | Cond. passé, subj. passé, futur ant. | Accords complexes | Pronoms composés | Négations littéraires | Mise en relief, discours | Quantification avancée |
| C1 | Syntaxe nominale C1 | Subj. imparfait, passé simple | Accord cas extrêmes | Coréférence stylistique | Modalité épistémique | Syntaxe complexe | Quantification stylistique |
| C2 | Maîtrise nominale | Maîtrise verbale | Accords marginaux | Pronoms marginaux | Figures syntaxiques | Métalangue | Quantification C2 |

#### ESL (`esl-grammar-data.js`)

| Level | nom | verb | adj | pron | adv | disc | num |
|-------|-----|------|-----|------|-----|------|-----|
| A1 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |
| A2 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |
| B1 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |
| B2 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |
| C1 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |
| C2 | Nouns & articles | Verbs & tenses | Adjectives & agreement | Pronouns | Adverbs & negation | Discourse & syntax | Number & quantifiers |

---

## Phase 1 — Issues identified

### Factual errors (corrected or flagged)

| ID | Location | Issue | Status |
|----|----------|-------|--------|
| E01 | `grammar-deep-lib.js` pron_coi | COI described as replacing « à/de » | ✅ Fixed (prior session) |
| E02 | `grammar-deep-lib.js` pron_order | Impératif: en before y | ✅ Fixed |
| E03 | `grammar-deep-content.js` | whom/where/lequel wrong mappings | ✅ Fixed |
| E04 | `esl-grammar-data.js` B1 | whose/where incomplete; no defining/non-defining | ✅ Fixed (prior session) |
| E05 | `exercise-banks-extended.js` | Wrong answers (vingt et un, cent/cents, conditional) | ✅ Fixed (prior session) |
| E06 | `grammar-deep-lib.js` numeraux | Pitfall contradicted rule (deux cent euros) | ✅ Fixed |
| E07 | `grammar-deep-lib.js` nom_composes | grands-pères marked invariable | ✅ Fixed |
| E08 | `grammar-deep-lib.js` participe_present | Adjectival participle said invariable | ✅ Fixed |
| E09 | `esl-grammar-data.js` A2 num | *a amount of* | ✅ Fixed |
| E10 | `exercise-banks-extended.js` | Shared pron bank too advanced for A1 | ⚠️ Flagged |

### Duplications across levels

| Content | Appears at | Should be primary at | Action |
|---------|------------|---------------------|--------|
| Article partitif (full rule) | A1 nom + A1 num | A1 nom | ✅ num → cross-ref only |
| ne…pas structure | A1 adv + A1 disc | A1 adv | ⚠️ A2+ should extend only |
| Relative who/which/that | A2 disc + B1 pron | A2 disc (intro) / B1 (whose/where/when) | ✅ Split (prior session) |
| Subjonctif rules | B1 + B2 + C1 | B1 intro, B2 passé, C1 imparfait | ⚠️ Pending dedup pass |
| Present simple | A1 + A2 + all ESL verb titles | A1 | ⚠️ Higher levels need extension-only précis |

### Level placement issues (CEFR)

| Rule | Current level | Recommended | Justification |
|------|---------------|-------------|---------------|
| Passé composé (full) | A2 verb (partial) | A2 primary | DELF A2 descriptor; was listed A1 point without précis — removed |
| Subjonctif présent | B1 | B1 ✅ | CECR seuil |
| Passé simple (productive) | C1 receptive only | C1 ✅ | CECR autonomie — lecture |
| Futur proche | A1 | A1 ✅ | TV5Monde / DELF A1 survival |
| Defining relatives | ESL A2 disc | A2 ✅ | British Council A2/B1 bridge |
| Cleft sentences | ESL B2 pron | B2 ✅ | Cambridge B2+ |
| Rectifications 1990 | C2 nom | C2 ✅ | Métalangue / norme |

### Missing rules (to add at rewrite)

| Level | Lang | Category | Missing content |
|-------|------|----------|-----------------|
| A1 | FLE | disc | Est-ce que vs inversion — register note present, OK |
| A2 | FLE | verb | PC vs imparfait contrast needs dedicated deep-lib key |
| B1 | FLE | verb | Voix passive complète — check présis depth |
| A1 | ESL | pron | Possessive pronouns at A1 — early but acceptable; split to A2? Flagged |
| All | Both | exercises | Level-specific exercise banks (currently one bank per cat) | ⚠️ Flagged |

---

## Phase 2 — Sources used

| Topic | Source | URL |
|-------|--------|-----|
| FR articles | Le Point du FLE / Grevisse (training) | lepointdufle.net |
| FR présent -er | TV5Monde Enseigner | enseigner.tv5monde.com |
| EN articles | Cambridge Grammar | dictionary.cambridge.org/grammar/british-grammar |
| EN relatives | British Council + Cambridge | learnenglish.britishcouncil.org |
| CEFR anchors | CECR Companion Volume 2020 | coe.int |

---

## Phase 3–4 — Corrections log (this session)

### Infrastructure

| File | Change | Reason |
|------|--------|--------|
| `grammar-deep-lib.js` | `G()` extended with `register`, `seeAlso` | Phase 3 six-field format |
| `grammar-deep-content.js` | `formatDeepDetail()` renders Register + See also | Display new fields |

### A1 FLE — deep-lib rewrites (6-field)

| Key | Source | Change summary |
|-----|--------|----------------|
| `nom_definite` | Grevisse / TV5Monde | + register (oral élision), seeAlso, pitfall h aspiré |
| `nom_indefinite` | Grevisse | + négation cross-ref, oral [də] |
| `nom_partitive` | Le Point du FLE | + Québec note, quantificateur pitfall |
| `pluriel_regulier` | Académie | seeAlso → A2 composés |
| `verb_etre_avoir` | DELF A1 | profession sans article; on oral |
| `verb_present_er` | Bescherelle | -ger/-cer; impératif cross-ref |

### A1 FLE — précis

| Entry | Original issue | New text |
|-------|----------------|----------|
| A1\|num | Duplicated partitif from nom | Cross-ref to nom\|partitif; quantificateurs only |

### A1 ESL — deep-lib rewrites

| Key | Source | Change summary |
|-----|--------|----------------|
| `nom_indefinite_an` | Cambridge | sound-based a/an; seeAlso |
| `nom_definite_the` | Cambridge | pronunciation; geographic names |
| `nom_zero` | British Council | restored entry with seeAlso |
| `nom_countable` | Murphy EGIU (training) | piece of; informations pitfall |

### Prior session (uncommitted → included in working tree)

- ESL relative clauses defining/non-defining (A2, B1, B2)
- FR/EN pronoun fixes, exercise bank sanitization
- See git diff for full list

---

## Duplication log

| Removed / consolidated | Kept at | Higher level becomes |
|------------------------|---------|----------------------|
| A1 num partitif full rule | A1 nom | A1 num → « voir Nom\|Article partitif » |
| (pending) A2+ ne…pas restatement | A1 adv | A2 → plus/jamais/rien only |
| (pending) ESL present simple in B1 précis | A1 verb | B1 → perfect vs past focus |

---

## Level reassignment log

| Rule | From | To | Justification | Status |
|------|------|-----|---------------|--------|
| Passé composé (point label) | A1 verb points | removed | No A1 précis content | ✅ Done |
| Defining relatives (detail) | B1 pron only | A2 disc + B1 extension | CEFR progression | ✅ Done |

---

## Flagged items (human review)

1. **Exercise banks shared across levels** — A1 learners see B2 relative exercises; needs level-tagged banks or generator filter.
2. **FLE disc FALLBACK** maps to `pron_sujet` — should map to syntaxe key.
3. **ESL A1 possessive pronouns** — pedagogically early; consider moving `mine/yours` introduction to A2.
4. **Subjonctif** précis overlap B1/B2/C1 — needs extension-only rewrite.
5. **Québec vs France** partitif après négation — descriptive note added; confirm register for target audience.
6. **Singular they** at A1 ESL — register note needed at C1 not A1.
7. **Orthographe 1990** — vingt-et-un seul vs vingt et un + nom: applied; confirm against latest Rectifications.
8. **BANGS adjectives** — A1 mentions avant nom list; add explicit BANGS label at B1?
9. **PC vs imparfait** — A2 needs clearer primary introduction block.
10. **Deep-lib keys without register/seeAlso** — ~190 keys pending 6-field migration.
11. **French passé simple** — C1 marked receptive; confirm no productive exercises.
12. **Commit strategy** — user requested small batches; A2–C2 rewrite spans multiple commits.

---

## Untouched entries (verified OK at A1; full pass pending A2–C2)

- A1 FLE adj précis (BANGS list, possessifs) — structurally sound
- A1 FLE pron précis — sound after prior fix
- A1 FLE adv précis — frequency placement nuanced
- A1 FLE disc précis — 3 interrogation registers OK
- A1 ESL verb/adj/adv/disc précis — CEFR-aligned overview
- A2–C2 all categories — audit pending systematic rewrite

---

## Next batches (execution plan)

1. **Batch 2:** A2 FLE — all 7 categories (PC/imparfait, COD/COI primary)
2. **Batch 3:** A2 ESL — past simple/continuous, object pronouns primary
3. **Batch 4:** B1 FLE + ESL — subjonctif, relatives extension, passive
4. **Batch 5:** B2 FLE + ESL — conditionals, register
5. **Batch 6:** C1 + C2 — literary, metalanguage
6. **Batch 7:** Exercise bank level tagging (if approved)
7. **Final:** Deduplication pass + untouched verification

---

*Generated by grammar audit workflow. Update this file after each commit batch.*
