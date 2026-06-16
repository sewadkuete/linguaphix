# LINGUAPHIX Exercices — Grammar Audit Log

**Date:** 2026-06-01  
**Scope:** `exercices/` — FLE + ESL, CEFR A1–C2  
**Status:** Phase 1–7 complete (A1–C2 rewritten; exercise spot-fixes applied)

---

## Summary

| Metric | Count |
|--------|------:|
| Total grammar topic entries audited | 84 |
| Entries correct (unchanged after audit) | 0 (full rewrite pass) |
| Entries rewritten (incorrect) | 22 |
| Entries rewritten (duplicate → extension) | 48 |
| Entries moved (mislevel) | 4 |
| Entries created (missing content in précis) | 6 |
| Deep-lib keys migrated to 6-field format | ~75 |
| Exercises corrected | 12 |
| Sources fetched successfully | 0 (offline workflow) |
| Sources fetched via fallback | 84 (expert CEFR knowledge per R7) |

---

## Architecture (unchanged)

| Layer | File | Role |
|-------|------|------|
| Syllabus précis | `fle-grammar-data.js`, `esl-grammar-data.js` | `GRAMMAR_DATA[level][cat]` |
| Deep micro-lessons | `grammar-deep-lib.js` | `G(brief, formation, rules, examples, pitfalls, register, seeAlso)` |
| Point mapping | `grammar-deep-content.js` | `FR_RULES` / `EN_RULES` |
| Enrichment | `precis-enrichment.js` | `PRECIS_SUPPLEMENTS`, `CEFR_NOTES` |
| Exercises | `exercise-banks-extended.js` | Shared per category (flagged) |

**Category IDs:** `nom`, `verb`, `adj`, `pron`, `adv`, `disc`, `num`

---

## Commits (per-level strategy)

| Commit | Level | Hash (local) |
|--------|-------|--------------|
| Batch 1 | A1 | `cd874ce` |
| Batch 2 | A2 | `af46d35` |
| Batch 3 | B1 | (see B1-done commit) |
| Batch 4 | B2 | (see B2-done commit) |
| Batch 5 | C1+C2 | (see C1-C2-done commit) |

*B1–C2 edits share the same JS files; committed as separate logical batches where possible.*

---

## Corrections Log (by level)

### A1 — CORRECT / REWRITTEN
- FLE+EN deep-lib: `nom_*`, `verb_etre_avoir`, `verb_present_er`, `pluriel_regulier`
- FLE A1 num: removed duplicate partitif (→ cross-ref A1 nom)
- ESL relatives: defining/non-defining split initiated

### A2 — DUPLICATE → EXTENSION
- FLE: PC/imparfait primary; COD/COI/y/en; comparatives; qui/que intro
- ESL: past simple primary; PP intro; relatives intro; modals; removed A1 repetition
- Deep-lib: `pc_*`, `imparfait_vs_pc`, `pron_cod/coi/y/en`, `rel_qui/que`, EN past/modals/comparatives

### B1 — MISLEVELLED / DUPLICATE fixes
| Notion | Reason | Change |
|--------|--------|--------|
| ESL verb | going to/future at B1 duplicated A2 | Removed; B1 = PP extended, past cont/perf, passive, reported speech, gerund/inf |
| ESL pron | Full relative intro duplicated A2 | Extension: whose/where/when/whom/why only |
| ESL disc | Question tags at B1 per CEFR | Added; 2nd conditional intro |
| FLE verb | PQP/discours indirect missing from précis block | Added with concordance table |
| FLE pron | Ordre doubles pronoms | Full system + impératif |
| Deep-lib | B1 keys without register | `subjonctif_present`, `futur_simple`, `gerondif`, `passive_voix`, `discours_rapporte`, `plus_que_parfait`, `pron_order`, EN `passive_be_pp`, `reported_speech`, `conditional_first/second` |

### B2 — EXTENSION ONLY
- FLE: subj. passé, cond. passé, futur antérieur, inf. passé, passif nuancé, clivage, inversion, participiales, hypothèse 3e+mixte, relatifs composés
- ESL: 3rd/mixed conditionals, wish/if only, passive all tenses, modals+have, cleft, inversion, reporting verbs; removed 1st/2nd conditional and relative revision
- Deep-lib: `conditionnel_passe`, `subjonctif_passe`, `futur_anterieur`, `conditional_third/mixed`, `cleft_*`, `inversion`, `wish_if_only`

### C1 — EXTENSION ONLY
- FLE: subj. imparfait (réceptif), passé simple narratif, cond. journalistique, modalité fine, coréférence, épistémiques, litote/euphémisme, registres
- ESL: Aktionsart, narrative tenses, epistemic/journalistic modals, perfect inf/gerund, coreference, register mapping
- Deep-lib: `passe_simple_*`, `dislocation`, `mise_en_relief`, `cohesion_textuelle`, EN `hedging_language`, `narrative_tenses`, `register_formal`

### C2 — EXTENSION ONLY
- FLE: liaisons complètes, passé antérieur réceptif, métalangue, variation sociolinguistique, figures syntaxiques, implicature
- ESL: metalinguistic awareness, implicature, sociolinguistic variation, full aspectual mastery, archaic recognition
- Deep-lib: `liaison_co`, `lexique_terminologie`, EN `cohesion_devices`, `extraposition`

---

## Level Reassignments

| Original level | New level | Rule | Reason |
|----------------|-----------|------|--------|
| ESL A2 disc | A2 primary | Defining/non-defining relatives intro | CEFR A2/B1 bridge (R8) |
| ESL B1 pron | B1 extension only | whose/where/when | Intro moved to A2 (R3) |
| ESL B1 verb | B1 focus | PP systematic contrast | Intro at A2 (R3) |
| FLE A1 num | A1 nom cross-ref | Partitif full rule | Duplicate (R3) |

---

## Duplicates Removed / Consolidated

| Rule | Level removed (as primary) | Level kept | Extension at higher level |
|------|---------------------------|------------|---------------------------|
| ne…pas structure | B1+ adv | A1 adv | B1+ → plus/jamais/rien/que |
| Present simple overview | B2+ verb | A1 | Extension-only précis |
| Defining relatives full block | B1 ESL pron | A2 ESL disc | B1 → whose/where/when |
| 1st/2nd conditional full | B2 ESL disc | B1 ESL disc | B2 → 3rd/mixed only |
| PC/imparfait basics | B1 FLE verb | A2 FLE verb | B1 → subjonctif/futur/passif |

---

## Missing Rules Created

| Level | Category | Rule added | Notion assigned |
|-------|----------|------------|-----------------|
| B1 | ESL disc | Second conditional intro | disc |
| B1 | ESL verb | Gerund vs infinitive core | verb |
| B1 | FLE verb | Discours indirect + PQP block | verb |
| A2 | FLE disc | Relatives qui/que introduction | disc |
| A2 | ESL disc | Non-defining relatives intro | disc |
| B2 | ESL verb | Reporting verbs (admit/deny/suggest) | verb |

---

## Source Fallbacks

| URL attempted | Fallback used | Entries affected |
|---------------|---------------|------------------|
| enseigner.tv5monde.com | Expert FLE/CEFR (R7) | All FR entries |
| learnenglish.britishcouncil.org | Expert ESL/CEFR (R7) | All EN entries |
| dictionary.cambridge.org | Expert ESL/CEFR (R7) | EN modals, relatives |
| academie-francaise.fr | Prescriptive norm (R1) | FR negation, orthography notes |

---

## Checks Failed & Auto-Fixed (Phase 6)

| Check | Entry | Issue | Fix applied |
|-------|-------|-------|-------------|
| CHECK 3 | exercise-banks | Typo *irrrégulier* | → irrégulier |
| CHECK 2 | ESL B1 pron | Duplicate A2 relative intro | Extension-only rewrite |
| CHECK 1 | ESL B2 disc | 1st conditional at B2 | Moved to B1; B2 = 3rd/mixed |
| CHECK 6 | deep-lib ~125 keys | Missing register/seeAlso | Migrated A1–B2 priority keys |
| CHECK 7 | exercise banks | cent/cents, vingt et un, conditional | Fixed prior session |
| CHECK 4 | A2/B1 pitfalls | Shared article pitfall | Level-differentiated in deep-lib |

---

## Flagged (not schema-breaking; documented)

1. **Exercise banks shared across all CEFR levels** — A1 learners may see B2 items. Requires level-tagging (future batch).
2. **FR `disc` FALLBACK** maps to `pron_sujet` in `grammar-deep-content.js` — should map to discourse key.
3. **~125 deep-lib keys** still without full register/seeAlso (C1/C2 marginal keys).
4. **Subjonctif overlap B1/B2/C1** — extension-only rewrites applied; monitor exercises.

---

## Next maintenance (optional)

- Level-tag exercise banks per CEFR
- Fix FR disc FALLBACK mapping in `grammar-deep-content.js`
- Complete 6-field migration for remaining deep-lib keys
- Push local commits when ready (`main` ahead of origin)

---

*Generated by autonomous grammar audit workflow. Updated 2026-06-01.*
