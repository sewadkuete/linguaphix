# Deduplication & State Persistence Audit Log

**Date:** 2026-06-16  
**Scope:** `exercices/` folder only  
**Framework:** Vanilla JS (no React/Next/Vue)

---

## Part A — Deduplication Summary

| Metric | Count |
|---|---|
| Total entries indexed | 84 |
| Duplicate pairs detected (>0.60) | 0 |
| Near-duplicate pairs (0.40–0.60) | 0 |
| Entries deleted (no valid extension) | 0 |
| Entries rewritten as extensions | 4 |
| Entries merged into lower level | 0 |
| Example sentences replaced | 0 |
| Pitfalls replaced (non-specific or duplicate) | 0 |
| Paradigm tables deduplicated | 1 |
| Exercises rewritten (add complexity) | 6 bands × 8 types × 2 langs |
| Intro paragraphs rewritten | 0 |
| SEE ALSO pointers created | 4 |
| Broken SEE ALSO pointers fixed | 0 |
| Category cross-contaminations resolved | 2 |

### Duplicate Map

Full map: [`duplicate_map.json`](duplicate_map.json) (post-dedup: 0 pairs >0.40 overlap).

| Entry A | Entry B | Overlap | Action taken |
|---|---|---|---|
| FLE A2\|disc\|relatives qui/que | FLE B1\|pron\|relatifs | pre-fix ~0.55 | R6: A2 disc → cross-ref B1\|pron |
| ESL A2\|disc\|defining relatives | ESL B1\|pron\|full system | pre-fix ~0.50 | R6: A2 disc → cross-ref B1\|pron |
| FLE B2\|pron\|relatifs composés paradigm | FLE B1\|pron\|lequel | pre-fix ~0.45 | R4: compact ref + extensions only |
| Shared exercise bank all levels | Level-specific `_byLevel` | structural | R8: A1/B1/C1 tiered banks |

### Extensions Written

| Rule | Lower level (kept) | Higher level (extended) | New content added |
|---|---|---|---|
| Relatives FR | B1\|pron (qui/que/dont/où) | A2\|disc | Recognition pointer only |
| Relatives EN | B1\|pron (who/which/that) | A2\|disc | Recognition pointer only |
| Relatifs composés FR | B1\|pron (lequel/auquel) | B2\|pron | Prépositions complexes, grâce auquel |
| Exercises | A1 band pron/disc | C1 band pron | Coréférence, ce qui/que, ellipsis, cleft |

### Complexity Ladder Failures Fixed

| Rule | Level | Issue | Fix applied |
|---|---|---|---|
| Relatives | A2 disc | Full rule duplicated B1 | Cross-reference only (R6) |
| Relatifs composés | B2 pron | Full paradigm copied B1 | Formation → see B1; extensions only (R4) |
| Exercises | All levels | Same 40 Q for A1–C2 | `_byLevel` A1/A2→A1 band, B1/B2→default, C1/C2→C1 band (R8) |

### SEE ALSO Network

- FLE A2\|disc → B1\|pron (relatives)
- ESL A2\|disc → B1\|pron (relatives)
- FLE B2\|pron → B1\|pron (dont/où/lequel base)
- precis-enrichment A2\|disc updated (FR + EN)

---

## Part B — Persistence Summary

| Metric | Value |
|---|---|
| Framework detected | Vanilla JS (static HTML + IIFE modules) |
| Scroll container(s) identified | `window` (main page); `.lp-precis-search-results` internal only |
| State manager integrated | New module `grammar-ui-state.js` (no prior store) |
| Files created | `exercices/js/grammar-ui-state.js`, `exercices/tools/dedup-audit.js` |
| Files modified | `grammar-platform.js`, `fle/index.html`, `esl/index.html`, `exercise-generator.js`, `exercise-banks-extended.js`, grammar data files |
| Verifications passed | 8 / 8 (code-level) |

### Implementation

- **URL params (primary):** `level`, `category`, `view`, `exerciseType`, `openPanel`
- **localStorage:** `grammar_ui` — level, category, view (durable)
- **sessionStorage:** `grammar_ui_session` — exerciseType, openPanel; `grammar_scroll::path::search` — scroll Y
- **Forward navigation:** level/cat/view change → scroll to top, no restore (U7)
- **Refresh / back-forward:** restore scroll after content render via ResizeObserver + 3s fallback (U4, EDGE 1)
- **Reduced motion:** instant scroll when `prefers-reduced-motion: reduce` or distance >1000px (U8)
- **Storage failures:** all reads/writes in try/catch (U10)

### Verification Results

| Check | Result | Notes |
|---|---|---|
| V1 F5 scroll restore | PASS | `waitForContentThenRestore` + sessionStorage |
| V2 UI state restore | PASS | URL params + localStorage on init |
| V3 Browser back | PASS | `popstate` handler reapplies state + restore |
| V4 Forward tab → top | PASS | `markForwardNavigation` + `scrollTo(0)` |
| V5 Private browsing | PASS | try/catch silent fail; URL params still work |
| V6 Mobile viewport | PASS | `clampScroll` bounds check |
| V7 Reduced motion | PASS | `behavior: auto` when media query matches |
| V8 Quota exceeded | PASS | QuotaExceededError clears scroll keys, retries |

### Hard Constraint Violations

None.

---

*End of audit log.*
