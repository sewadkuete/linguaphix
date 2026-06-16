/**
 * Recherche thématique cross-niveaux pour le précis grammaticale.
 */
(function (global) {
  "use strict";

  var LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var CAT_IDS = ["nom", "verb", "adj", "pron", "adv", "disc", "num"];

  var ALIASES = {
    fr: {
      pc: ["passé composé", "passe compose", "passé-composé"],
      imparfait: ["imparfait", "imparfaits"],
      subjonctif: ["subjonctif", "subjunctif"],
      conditionnel: ["conditionnel", "conditionnelle"],
      cod: ["cod", "complément d'objet direct", "le la les"],
      coi: ["coi", "complément d'objet indirect", "lui leur"],
      negation: ["négation", "negation", "ne pas", "ne…pas"],
      participe: ["participe passé", "participe present", "participe présent"],
      relatif: ["relatif", "relative", "qui que dont où"],
      article: ["article défini", "article indéfini", "article partitif", "articles"],
      pluriel: ["pluriel", "pluriels"],
      accord: ["accord", "accords", "accorder"],
      pronoms: ["pronom", "pronoms", "pronominal"],
      futur: ["futur simple", "futur proche", "futur antérieur"],
      passe: ["passé simple", "plus-que-parfait", "passé antérieur"],
      voix: ["voix passive", "passif", "passive"],
      gerondif: ["gérondif", "gerondif", "en + ant"],
      discours: ["discours indirect", "discours rapporté", "parole directe"],
      comparatif: ["comparatif", "comparaison", "plus que"],
      superlatif: ["superlatif"],
      imperatif: ["impératif", "imperatif"],
      en: ["en y", "pronoms en", "adverbe en"],
      y: ["y ", "pronom y"],
      on: ["on ", "pronom on"],
      ce: ["c'est", "ce sont", "démonstratif"]
    },
    en: {
      perfect: ["present perfect", "past perfect", "future perfect"],
      continuous: ["present continuous", "past continuous", "progressive"],
      passive: ["passive voice", "passive be", "get-passive"],
      modal: ["modal", "modals", "can could", "must should"],
      relative: ["relative clause", "relative pronoun", "who which that whose", "defining relative"],
      article: ["a an", "the", "zero article", "articles"],
      plural: ["plural", "plurals", "-s"],
      agreement: ["agreement", "accord"],
      pronoun: ["pronoun", "pronouns", "object pronoun", "subject pronoun"],
      conditional: ["conditional", "first conditional", "second conditional", "third conditional", "if clause"],
      reported: ["reported speech", "indirect speech"],
      gerund: ["gerund", "infinitive", "verb ing", "-ing form"],
      comparative: ["comparative", "more than", "as…as"],
      superlative: ["superlative", "the most"],
      negation: ["negation", "negative", "not", "never", "don't", "doesn't", "didn't", "no none"],
      quantifier: ["quantifier", "some any", "much many", "few little"],
      tense: ["past simple", "present simple", "will future", "going to"],
      they: ["singular they", "they them their"]
    }
  };

  function norm(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[àâä]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[ïî]/g, "i")
      .replace(/[ôùûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/[''´`]/g, "'")
      .replace(/[…]/g, "...")
      .replace(/[^\w\s'-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokens(s) {
    return norm(s)
      .replace(/-/g, " ")
      .split(" ")
      .filter(function (t) {
        return t.length > 1 || t === "y";
      });
  }

  function expandQuery(query, lang) {
    var q = norm(query);
    var userTokens = tokens(q);
    var aliasPhrases = [];
    var map = ALIASES[lang] || {};

    Object.keys(map).forEach(function (key) {
      var keyMatch = q === key || (key.length >= 3 && userTokens.indexOf(key) >= 0);
      var phraseMatch = map[key].some(function (phrase) {
        var np = norm(phrase);
        if (!np || np.length < 3) return false;
        if (q.indexOf(np) >= 0) return true;
        return q.length >= 4 && np.indexOf(q) >= 0;
      });
      if (keyMatch || phraseMatch) {
        map[key].forEach(function (phrase) {
          var np = norm(phrase);
          if (np && aliasPhrases.indexOf(np) < 0) aliasPhrases.push(np);
        });
      }
    });

    return { raw: q, tokens: userTokens, aliasPhrases: aliasPhrases };
  }

  function entryMatchesQuery(entry, queryInfo) {
    if (queryInfo.raw.length < 2) return false;
    if (entry.searchText.indexOf(queryInfo.raw) >= 0) return true;

    if (queryInfo.tokens.length > 0) {
      var allUser = queryInfo.tokens.every(function (t) {
        return t.length < 2 || entry.searchText.indexOf(t) >= 0;
      });
      if (allUser && queryInfo.tokens.some(function (t) { return t.length >= 2; })) return true;
    }

    return queryInfo.aliasPhrases.some(function (phrase) {
      return phrase.length >= 2 && entry.searchText.indexOf(phrase) >= 0;
    });
  }

  function catLabel(cat, lang) {
    if (!cat) return "";
    return lang === "fr" ? cat.labelFr : cat.labelEn;
  }

  function buildIndex(data, lang, categories) {
    var entries = [];
    var catMap = {};
    (categories || []).forEach(function (c) { catMap[c.id] = c; });

    LEVELS.forEach(function (level) {
      if (!data[level]) return;
      CAT_IDS.forEach(function (catId) {
        var entry = data[level][catId];
        if (!entry || !entry.pointsDetail) return;
        var cat = catMap[catId];
        entry.pointsDetail.forEach(function (pd, pointIndex) {
          var label = pd.label || (entry.points && entry.points[pointIndex]) || "";
          var detail = pd.detail || "";
          entries.push({
            level: level,
            catId: catId,
            catLabel: catLabel(cat, lang),
            catColor: cat ? cat.color : "gray",
            pointIndex: pointIndex,
            label: label,
            detail: detail,
            themeTitle: entry.title || "",
            searchText: norm(label + " " + detail + " " + (entry.title || "") + " " + catLabel(cat, lang)).replace(/-/g, " ")
          });
        });
      });
    });

    return { lang: lang, entries: entries, builtAt: Date.now() };
  }

  function scoreEntry(entry, queryInfo) {
    if (!entryMatchesQuery(entry, queryInfo)) return -1;

    var score = 0;
    var labelN = norm(entry.label).replace(/-/g, " ");
    var q = queryInfo.raw;

    if (q.length >= 2 && labelN.indexOf(q) >= 0) score += 120;
    if (q.length >= 3 && entry.searchText.indexOf(q) >= 0) score += 40;

    queryInfo.tokens.forEach(function (tok) {
      if (tok.length < 2 && tok !== "y") return;
      if (labelN.indexOf(tok) >= 0) score += 55;
      else if (entry.searchText.indexOf(tok) >= 0) score += 12;
    });

    if (queryInfo.tokens.length > 1 && queryInfo.tokens.every(function (t) {
      return t.length < 2 || labelN.indexOf(t) >= 0;
    })) {
      score += 30;
    }

    queryInfo.aliasPhrases.forEach(function (phrase) {
      if (entry.searchText.indexOf(phrase) >= 0) score += 25;
      if (labelN.indexOf(phrase) >= 0) score += 35;
    });

    return score > 0 ? score : 1;
  }

  function snippet(text, queryInfo, maxLen) {
    maxLen = maxLen || 140;
    var n = norm(text);
    var hit = queryInfo.raw;
    var idx = n.indexOf(hit);
    if (idx < 0 && queryInfo.tokens.length) {
      queryInfo.tokens.some(function (t) {
        var i = n.indexOf(t);
        if (i >= 0) { idx = i; hit = t; return true; }
        return false;
      });
    }
    if (idx < 0) return text.replace(/\s+/g, " ").trim().slice(0, maxLen) + (text.length > maxLen ? "…" : "");
    var plain = text.replace(/\s+/g, " ").trim();
    var start = Math.max(0, idx - 40);
    var end = Math.min(plain.length, idx + hit.length + 80);
    var part = plain.slice(start, end);
    if (start > 0) part = "…" + part;
    if (end < plain.length) part = part + "…";
    return part;
  }

  function search(index, query, opts) {
    opts = opts || {};
    var limit = opts.limit || 50;
    if (!index || !query || norm(query).length < 2) {
      return { query: query, results: [], total: 0 };
    }
    var queryInfo = expandQuery(query, index.lang);
    var scored = [];

    index.entries.forEach(function (entry) {
      var s = scoreEntry(entry, queryInfo);
      if (s > 0) {
        scored.push({
          level: entry.level,
          catId: entry.catId,
          catLabel: entry.catLabel,
          catColor: entry.catColor,
          pointIndex: entry.pointIndex,
          label: entry.label,
          themeTitle: entry.themeTitle,
          score: s,
          snippet: snippet(entry.detail, queryInfo)
        });
      }
    });

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      var lv = LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level);
      if (lv !== 0) return lv;
      return a.label.localeCompare(b.label);
    });

    return {
      query: query,
      results: scored.slice(0, limit),
      total: scored.length
    };
  }

  /** Audit index + contenu précis */
  function auditPrecis(data, lang, categories) {
    var index = buildIndex(data, lang, categories);
    var issues = [];
    var expected = 0;

    LEVELS.forEach(function (level) {
      if (!data[level]) {
        issues.push({ type: "MISSING_LEVEL", level: level });
        return;
      }
      CAT_IDS.forEach(function (catId) {
        var entry = data[level][catId];
        if (!entry) {
          issues.push({ type: "MISSING_CATEGORY", level: level, catId: catId });
          return;
        }
        var n = (entry.points || []).length;
        expected += n;
        if (!(entry.pointsDetail && entry.pointsDetail.length === n)) {
          issues.push({
            type: "POINTS_DETAIL_MISMATCH",
            level: level,
            catId: catId,
            points: n,
            details: entry.pointsDetail ? entry.pointsDetail.length : 0
          });
        }
        (entry.pointsDetail || []).forEach(function (pd, i) {
          if (!pd.detail || pd.detail.length < 80) {
            issues.push({ type: "SHORT_DETAIL", level: level, catId: catId, label: pd.label, len: (pd.detail || "").length });
          }
        });
      });
    });

    if (index.entries.length !== expected) {
      issues.push({
        type: "INDEX_COUNT_MISMATCH",
        expected: expected,
        indexed: index.entries.length
      });
    }

    var sampleThemes = lang === "fr"
      ? ["passé composé", "subjonctif", "négation", "cod", "relatif", "futur", "participe passé"]
      : ["present perfect", "passive", "modal", "relative", "conditional", "gerund", "negation"];

    var emptyThemes = sampleThemes.filter(function (theme) {
      return search(index, theme).total === 0;
    });

    if (emptyThemes.length) {
      issues.push({ type: "THEME_NO_RESULTS", themes: emptyThemes });
    }

    return {
      lang: lang,
      indexSize: index.entries.length,
      expectedPoints: expected,
      issueCount: issues.length,
      issues: issues,
      sampleSearch: sampleThemes.map(function (t) {
        return { theme: t, hits: search(index, t).total };
      })
    };
  }

  global.PrecisSearch = {
    buildIndex: buildIndex,
    search: search,
    audit: auditPrecis,
    norm: norm
  };
})(typeof window !== "undefined" ? window : global);
