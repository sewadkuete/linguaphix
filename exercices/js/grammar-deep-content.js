/**
 * Associe chaque point du programme à GRAMMAR_DEEP_LIB et formate le précis pédagogique.
 */
(function (global) {
  "use strict";

  function norm(s) {
    return (s || "").toLowerCase()
      .replace(/[àâä]/g, "a").replace(/[éèêë]/g, "e").replace(/[ïî]/g, "i")
      .replace(/[ôùûü]/g, "u").replace(/ç/g, "c");
  }

  function pick(lib, key) {
    return lib && lib[key] ? lib[key] : null;
  }

  function firstMatch(lib, keys) {
    for (var i = 0; i < keys.length; i++) {
      var c = pick(lib, keys[i]);
      if (c) return c;
    }
    return null;
  }

  /** Règles de correspondance point → clé LIB (ordre = priorité) */
  function resolveLibKey(lang, catId, pointLabel, level) {
    const p = norm(pointLabel);
    const rules = lang === "fr" ? FR_RULES : EN_RULES;
    const catRules = rules[catId] || [];
    for (var i = 0; i < catRules.length; i++) {
      var r = catRules[i];
      if (r.test(p, level)) return aliasKey(lang, r.key);
    }
    const fb = (FALLBACK[lang] || {})[catId];
    return fb ? aliasKey(lang, fb) : null;
  }

  function aliasKey(lang, key) {
    const aliases = KEY_ALIASES[lang] || {};
    return aliases[key] || key;
  }

  const KEY_ALIASES = {
    en: {
      verb_imperative: "imperative",
      verb_passive: "passive_be_pp",
      verb_reported_speech: "reported_speech",
      verb_modals: "modal_can",
      verb_will_future: "verb_will",
      adj_predicative: "adj_ed_ing",
      adj_possessive: "pron_possessive",
      adj_demonstrative: "pron_demonstrative",
      adj_no_agreement: "adj_order",
      adj_comparative: "comp_er_more",
      adj_superlative: "superlative",
      rel_who: "pron_relative_who",
      rel_whose: "pron_relative_whose",
      rel_whom: "pron_relative_whose",
      rel_what: "noun_clauses",
      pron_one: "pron_indefinite",
      pron_coreference: "cohesion_devices",
      neg_be_not: "no_none",
      neg_do_does: "emphasis_do",
      adv_frequency: "adverb_position",
      adv_place_time: "prepositions_time",
      adv_already_yet: "verb_present_perfect",
      adv_manner_ly: "adverb_position",
      adv_degree: "too_enough",
      adv_only: "adverb_position",
      adv_formal_connectors: "discourse_markers",
      adv_so_such: "so_such",
      adv_inversion: "inversion",
      adv_epistemic: "hedging_language",
      adv_litotes: "hedging_language",
      adv_good_well: "too_enough",
      disc_svo: "pron_subject",
      disc_questions: "pron_interrogative",
      disc_there: "there_existential",
      disc_prepositions: "prepositions_place",
      disc_connectors: "linking_words",
      disc_cause: "linking_words",
      disc_purpose: "noun_clauses",
      disc_time_clauses: "prepositions_time",
      disc_concession: "discourse_markers",
      disc_inversion: "inversion",
      disc_participle_clauses: "participle_clauses",
      disc_register: "register_formal",
      disc_academic: "academic_passive",
      num_cardinals: "quant_all_every",
      num_some_any: "quant_some_any",
      num_many_much: "quant_many_much",
      num_few_little: "quant_few_little",
      num_ordinals: "quant_all_every",
      num_quantifiers: "both_either_neither",
      num_fractions: "quantifiers_advanced",
      num_majority: "quantifiers_advanced",
      num_collective: "subject_verb_agreement",
      num_approximation: "quantifiers_advanced",
      num_formal: "quantifiers_advanced"
    },
    fr: {}
  };

  function resolveDeepContent(lang, level, catId, pointIndex, pointLabel) {
    const lib = global.GRAMMAR_DEEP_LIB && global.GRAMMAR_DEEP_LIB[lang];
    if (!lib) return null;
    let key = resolveLibKey(lang, catId, pointLabel, level);
    if (key && lib[key]) return lib[key];
    const aliases = KEY_ALIASES[lang] || {};
    if (key && aliases[key] && lib[aliases[key]]) return lib[aliases[key]];
    const fb = (FALLBACK[lang] || {})[catId];
    if (fb && lib[fb]) return lib[fb];
    return null;
  }

  function formatDeepDetail(deep, lang) {
    if (!deep) return "";
    const isFr = lang === "fr";
    const L = function (fr, en) { return isFr ? fr : en; };
    const parts = [];

    parts.push(L("📌 EN BREF", "📌 IN SHORT"));
    parts.push(deep.brief);

    if (deep.formation && deep.formation.trim()) {
      parts.push("");
      parts.push(L("📐 FORMATION", "📐 FORMATION"));
      deep.formation.split("\n").forEach(function (line) {
        const t = line.trim();
        if (t) parts.push(t);
      });
    }

    parts.push("");
    parts.push(L("📖 À RETENIR", "📖 KEY RULES"));
    (deep.rules || []).forEach(function (r) {
      parts.push("• " + r);
    });

    parts.push("");
    parts.push(L("📝 EXEMPLES", "📝 EXAMPLES"));
    (deep.examples || []).forEach(function (ex) {
      parts.push("Ex. : " + ex);
    });

    if (deep.pitfalls && deep.pitfalls.length) {
      parts.push("");
      parts.push(L("⚠️ ATTENTION", "⚠️ WATCH OUT"));
      deep.pitfalls.forEach(function (pit) {
        parts.push(isFr ? "Piège : " + pit : "Trap: " + pit);
      });
    }

    return parts.join("\n");
  }

  function rule(test, key) { return { test: test, key: key }; }

  const FR_RULES = {
    nom: [
      rule(function (p) { return p.indexOf("defini") >= 0 && p.indexOf("indefini") < 0; }, "nom_definite"),
      rule(function (p) { return p.indexOf("indefini") >= 0; }, "nom_indefinite"),
      rule(function (p) { return p.indexOf("partitif") >= 0; }, "nom_partitive"),
      rule(function (p) { return p.indexOf("contract") >= 0 || p.indexOf("au/du") >= 0; }, "nom_contractes"),
      rule(function (p) { return p.indexOf("zero") >= 0 || p.indexOf("absence") >= 0 || (p.indexOf("locution") >= 0 && p.indexOf("compos") < 0); }, "nom_zero"),
      rule(function (p) { return p.indexOf("genre") >= 0; }, "nom_definite"),
      rule(function (p) { return p.indexOf("1990") >= 0 || p.indexOf("rectification") >= 0; }, "orthographe_1990"),
      rule(function (p) { return p.indexOf("pluriel") >= 0 && p.indexOf("regulier") >= 0; }, "pluriel_regulier"),
      rule(function (p) { return p.indexOf("compos") >= 0; }, "nom_composes"),
      rule(function (p) { return p.indexOf("pluriel") >= 0; }, "orthographe_pluriel"),
      rule(function (p) { return p.indexOf("nominalisation") >= 0 || p.indexOf("suffixe") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("c'est un") >= 0 || p.indexOf("il est") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("liaison") >= 0; }, "liaison_co"),
      rule(function (p) { return p.indexOf("gn ") >= 0 || p.indexOf("expansion") >= 0; }, "nom_definite"),
      rule(function (p) { return p.indexOf("substantivation") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("feminisation") >= 0 || p.indexOf("epicene") >= 0; }, "nom_definite"),
      rule(function (p) { return p.indexOf("orthographe") >= 0; }, "orthographe_pluriel")
    ],
    verb: [
      rule(function (p) { return p.indexOf("etre") >= 0 && p.indexOf("avoir") >= 0; }, "verb_etre_avoir"),
      rule(function (p) { return p.indexOf("-er") >= 0 || p.indexOf("groupe 1") >= 0; }, "verb_present_er"),
      rule(function (p) { return p.indexOf("aller") >= 0 || p.indexOf("venir") >= 0; }, "verb_aller"),
      rule(function (p) { return p.indexOf("futur proche") >= 0; }, "futur_proche"),
      rule(function (p) { return p.indexOf("passe compose") >= 0 || p.indexOf("passé compose") >= 0; }, "pc_avoir"),
      rule(function (p) { return p.indexOf("imperatif") >= 0; }, "imperatif_present"),
      rule(function (p) { return p.indexOf("imparfait") >= 0 && p.indexOf("opposition") >= 0; }, "imparfait_vs_pc"),
      rule(function (p) { return p.indexOf("imparfait") >= 0; }, "imparfait_endings"),
      rule(function (p) { return p.indexOf("vouloir") >= 0 || p.indexOf("pouvoir") >= 0 || p.indexOf("devoir") >= 0; }, "verb_pouvoir_vouloir"),
      rule(function (p) { return p.indexOf("conditionnel") >= 0 && p.indexOf("passe") >= 0; }, "conditionnel_passe"),
      rule(function (p) { return p.indexOf("conditionnel") >= 0; }, "conditionnel_present"),
      rule(function (p) { return p.indexOf("pronominal") >= 0; }, "verbe_pronominal"),
      rule(function (p) { return p.indexOf("savoir") >= 0 || p.indexOf("connaitre") >= 0; }, "verb_savoir_connaitre"),
      rule(function (p) { return p.indexOf("subjonctif") >= 0 && p.indexOf("imparfait") >= 0; }, "subjonctif_passe"),
      rule(function (p) { return p.indexOf("subjonctif") >= 0 && p.indexOf("passe") >= 0; }, "subjonctif_passe"),
      rule(function (p) { return p.indexOf("subjonctif") >= 0; }, "subjonctif_present"),
      rule(function (p) { return p.indexOf("futur anterieur") >= 0 || p.indexOf("futur ant") >= 0; }, "futur_anterieur"),
      rule(function (p) { return p.indexOf("futur simple") >= 0 || (p.indexOf("futur") >= 0 && p.indexOf("proche") < 0); }, "futur_simple"),
      rule(function (p) { return p.indexOf("gerondif") >= 0; }, "gerondif"),
      rule(function (p) { return p.indexOf("passif") >= 0 || p.indexOf("passive") >= 0; }, "passive_voix"),
      rule(function (p) { return p.indexOf("discours") >= 0 || p.indexOf("rapporte") >= 0; }, "discours_rapporte"),
      rule(function (p) { return p.indexOf("plus-que-parfait") >= 0 || p.indexOf("plus que parfait") >= 0; }, "plus_que_parfait"),
      rule(function (p) { return p.indexOf("infinitif passe") >= 0 || p.indexOf("infinitif pass") >= 0; }, "infinitif_passe"),
      rule(function (p) { return p.indexOf("passe simple") >= 0 || p.indexOf("passé simple") >= 0; }, "passe_simple_etre"),
      rule(function (p) { return p.indexOf("inventaire") >= 0 || p.indexOf("modes/temps") >= 0; }, "temps_grammatical"),
      rule(function (p) { return p.indexOf("aktionsart") >= 0; }, "temps_grammatical"),
      rule(function (p) { return p.indexOf("concordance") >= 0; }, "concordance_temps"),
      rule(function (p) { return p.indexOf("passe anterieur") >= 0; }, "futur_anterieur"),
      rule(function (p) { return p.indexOf("journalistique") >= 0; }, "conditionnel_present"),
      rule(function (p) { return p.indexOf("modalite") >= 0; }, "verb_pouvoir_vouloir")
    ],
    adj: [
      rule(function (p) { return p.indexOf("genre") >= 0 || p.indexOf("feminin") >= 0; }, "adj_feminine"),
      rule(function (p) { return p.indexOf("nombre") >= 0 || p.indexOf("-s") >= 0; }, "adj_plural"),
      rule(function (p) { return p.indexOf("place") >= 0; }, "adj_place"),
      rule(function (p) { return p.indexOf("possessif") >= 0; }, "adj_possessifs"),
      rule(function (p) { return p.indexOf("demonstratif") >= 0; }, "adj_demonstratifs"),
      rule(function (p) { return p.indexOf("comparatif") >= 0 && p.indexOf("superlatif") < 0; }, "adj_comparatif"),
      rule(function (p) { return p.indexOf("superlatif") >= 0; }, "adj_superlatif"),
      rule(function (p) { return p.indexOf("meilleur") >= 0 || p.indexOf("irregulier") >= 0; }, "adj_irreguliers"),
      rule(function (p) { return p.indexOf("indefini") >= 0; }, "adj_demonstratifs"),
      rule(function (p) { return p.indexOf("participe passe") >= 0 || p.indexOf("p.p.") >= 0 || p.indexOf("accord p.p") >= 0; }, "accord_past_participle_avoir"),
      rule(function (p) { return p.indexOf("participe present") >= 0 || p.indexOf("particip") >= 0; }, "participe_present"),
      rule(function (p) { return p.indexOf("couleur") >= 0; }, "adj_feminine"),
      rule(function (p) { return p.indexOf("tout") >= 0; }, "adj_demonstratifs"),
      rule(function (p) { return p.indexOf("demi") >= 0 || p.indexOf("nu") >= 0; }, "adj_place"),
      rule(function (p) { return p.indexOf("collectif") >= 0; }, "adj_plural"),
      rule(function (p) { return p.indexOf("verbal") >= 0; }, "participe_present")
    ],
    pron: [
      rule(function (p) { return p.indexOf("cod") >= 0 || (p.indexOf("le, la, les") >= 0); }, "pron_cod"),
      rule(function (p) { return p.indexOf("coi") >= 0 || p.indexOf("lui, leur") >= 0; }, "pron_coi"),
      rule(function (p) { return p.indexOf(" y") >= 0 || p === "pron y" || p.indexOf("pronom y") >= 0; }, "pron_y"),
      rule(function (p) { return p.indexOf(" en") >= 0 && p.indexOf("order") < 0; }, "pron_en"),
      rule(function (p) { return p.indexOf("ordre") >= 0 || p.indexOf("doubles") >= 0; }, "pron_order"),
      rule(function (p) { return p.indexOf("sujet") >= 0; }, "pron_sujet"),
      rule(function (p) { return p.indexOf(" on") >= 0 || p.indexOf("tonique") >= 0; }, "emploi_on"),
      rule(function (p) { return p.indexOf("dont") >= 0; }, "pron_relatif_dont"),
      rule(function (p) { return p.indexOf("ou") >= 0 && p.indexOf("lequel") >= 0; }, "pron_relatif_ou"),
      rule(function (p) { return p.indexOf("lequel") >= 0; }, "pron_relatif_ou"),
      rule(function (p) { return p.indexOf("demonstratif") >= 0; }, "adj_demonstratifs"),
      rule(function (p) { return p.indexOf("auquel") >= 0 || p.indexOf("duquel") >= 0 || p.indexOf("compose") >= 0; }, "pron_relatif_ou"),
      rule(function (p) { return p.indexOf("quiconque") >= 0 || p.indexOf("indefini") >= 0; }, "pron_indefini"),
      rule(function (p) { return p.indexOf("coreference") >= 0 || p.indexOf("cohesion") >= 0; }, "cohesion_textuelle"),
      rule(function (p) { return p.indexOf("passive") >= 0 || p.indexOf("passive") >= 0; }, "verbe_pronominal"),
      rule(function (p) { return p.indexOf("neutre") >= 0 && p.indexOf("le") >= 0; }, "pron_cod"),
      rule(function (p) { return p.indexOf("soi") >= 0; }, "pron_reflechis"),
      rule(function (p) { return p.indexOf("interrogatif") >= 0; }, "pron_interrogatif"),
      rule(function (p) { return p.indexOf("place") >= 0; }, "pron_order")
    ],
    adv: [
      rule(function (p) { return p.indexOf("ne…pas") >= 0 || p.indexOf("ne...pas") >= 0 || p.indexOf("negation") >= 0 && p.indexOf("compose") < 0; }, "neg_ne_pas"),
      rule(function (p) { return p.indexOf("plus") >= 0 || p.indexOf("jamais") >= 0 || p.indexOf("rien") >= 0; }, "neg_plus_jamais"),
      rule(function (p) { return p.indexOf("ne…que") >= 0 || p.indexOf("restriction") >= 0; }, "neg_que"),
      rule(function (p) { return p.indexOf("frequence") >= 0; }, "adv_place"),
      rule(function (p) { return p.indexOf("lieu") >= 0 || p.indexOf("temps") >= 0; }, "adv_place"),
      rule(function (p) { return p.indexOf("intensite") >= 0 || p.indexOf("tres") >= 0; }, "adv_irreguliers"),
      rule(function (p) { return p.indexOf("-ment") >= 0 || p.indexOf("formation") >= 0; }, "adv_ment"),
      rule(function (p) { return p.indexOf("connecteur") >= 0; }, "subordonnees_causal"),
      rule(function (p) { return p.indexOf("litteraire") >= 0 || p.indexOf("guere") >= 0; }, "neg_plus_jamais"),
      rule(function (p) { return p.indexOf("modalite") >= 0; }, "adv_irreguliers"),
      rule(function (p) { return p.indexOf("epistemique") >= 0; }, "adv_irreguliers"),
      rule(function (p) { return p.indexOf("litote") >= 0 || p.indexOf("ironie") >= 0; }, "neg_plus_jamais"),
      rule(function (p) { return p.indexOf("hyperbate") >= 0 || p.indexOf("zeugme") >= 0; }, "inversion_stylistique")
    ],
    disc: [
      rule(function (p) { return p.indexOf("declarative") >= 0 || p.indexOf("svo") >= 0; }, "pron_sujet"),
      rule(function (p) { return p.indexOf("interrogative") >= 0 || p.indexOf("question") >= 0; }, "pron_interrogatif"),
      rule(function (p) { return p.indexOf("il y a") >= 0 || p.indexOf("c'est") >= 0; }, "verbe_impersonnel"),
      rule(function (p) { return p.indexOf("preposition") >= 0; }, "prepositions_lieu"),
      rule(function (p) { return p.indexOf("connecteur") >= 0 && p.indexOf("temporel") >= 0; }, "prepositions_temps"),
      rule(function (p) { return p.indexOf("connecteur") >= 0; }, "subordonnees_causal"),
      rule(function (p) { return p.indexOf("relative") >= 0 || p.indexOf("qui/que") >= 0; }, "rel_qui"),
      rule(function (p) { return p.indexOf("cause") >= 0; }, "subordonnees_causal"),
      rule(function (p) { return p.indexOf("but") >= 0; }, "subordonnees_causal"),
      rule(function (p) { return p.indexOf("temporel") >= 0; }, "subordonnee_temps"),
      rule(function (p) { return p.indexOf("hypothese") >= 0 || p.indexOf("hypoth") >= 0; }, "hypothese_si"),
      rule(function (p) { return p.indexOf("concession") >= 0; }, "subordonnees_concessive"),
      rule(function (p) { return p.indexOf("clivage") >= 0 || p.indexOf("mise en relief") >= 0; }, "mise_en_relief"),
      rule(function (p) { return p.indexOf("inversion") >= 0; }, "inversion_stylistique"),
      rule(function (p) { return p.indexOf("participial") >= 0; }, "participe_present"),
      rule(function (p) { return p.indexOf("clivee") >= 0 || p.indexOf("pseudo") >= 0; }, "dislocation"),
      rule(function (p) { return p.indexOf("detache") >= 0; }, "dislocation"),
      rule(function (p) { return p.indexOf("ellipse") >= 0; }, "cohesion_textuelle"),
      rule(function (p) { return p.indexOf("registre") >= 0; }, "style_register"),
      rule(function (p) { return p.indexOf("academique") >= 0 || p.indexOf("metalangue") >= 0; }, "lexique_terminologie"),
      rule(function (p) { return p.indexOf("variation") >= 0 || p.indexOf("sociolinguistique") >= 0; }, "style_register"),
      rule(function (p) { return p.indexOf("ambigu") >= 0; }, "cohesion_textuelle"),
      rule(function (p) { return p.indexOf("rhetorique") >= 0; }, "style_register")
    ],
    num: [
      rule(function (p) { return p.indexOf("cardinal") >= 0 || p.indexOf("0-100") >= 0 || p.indexOf("0–100") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("ordinal") >= 0; }, "adj_num_ord"),
      rule(function (p) { return p.indexOf("partitif") >= 0; }, "nom_partitive"),
      rule(function (p) { return p.indexOf("quantite") >= 0 || p.indexOf("beaucoup") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("fraction") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("plupart") >= 0 || p.indexOf("collectif") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("mesure") >= 0 || p.indexOf("approximation") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("moitie") >= 0 || p.indexOf("tiers") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("maints") >= 0 || p.indexOf("force") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("trait d'union") >= 0 || p.indexOf("compose") >= 0; }, "numeraux"),
      rule(function (p) { return p.indexOf("proportion") >= 0; }, "numeraux")
    ]
  };

  const EN_RULES = {
    nom: [
      rule(function (p) { return p.indexOf("a / an") >= 0 || p.indexOf("indefinite") >= 0; }, "nom_indefinite_an"),
      rule(function (p) { return p.indexOf("definite") >= 0 || p === "the"; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("zero") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("plural") >= 0 || p.indexOf("-s") >= 0; }, "nom_countable"),
      rule(function (p) { return p.indexOf("countable") >= 0 || p.indexOf("uncountable") >= 0; }, "nom_countable"),
      rule(function (p) { return p.indexOf("some / any") >= 0 || p.indexOf("some/any") >= 0; }, "nom_countable"),
      rule(function (p) { return p.indexOf("compound") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("nominalization") >= 0; }, "nom_zero"),
      rule(function (p) { return p.indexOf("abstract") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("genitive") >= 0 || p.indexOf("'s") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("substantiv") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("light verb") >= 0; }, "verb_present_simple"),
      rule(function (p) { return p.indexOf("apposition") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("dense") >= 0 || p.indexOf("academic") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("pluralia") >= 0 || p.indexOf("singularia") >= 0; }, "nom_countable"),
      rule(function (p) { return p.indexOf("eponym") >= 0; }, "nom_definite_the"),
      rule(function (p) { return p.indexOf("generic") >= 0; }, "nom_definite_the")
    ],
    verb: [
      rule(function (p) { return p.indexOf("present simple") >= 0; }, "verb_present_simple"),
      rule(function (p) { return p.indexOf("to be") >= 0; }, "verb_to_be"),
      rule(function (p) { return p.indexOf("continuous") >= 0 && p.indexOf("past") < 0 && p.indexOf("future") < 0; }, "verb_present_continuous"),
      rule(function (p) { return p.indexOf("imperative") >= 0; }, "verb_imperative"),
      rule(function (p) { return p.indexOf("going to") >= 0; }, "verb_going_to"),
      rule(function (p) { return p.indexOf("present perfect") >= 0 && p.indexOf("past") >= 0; }, "verb_present_perfect"),
      rule(function (p) { return p.indexOf("past simple") >= 0; }, "verb_past_simple_ed"),
      rule(function (p) { return p.indexOf("present perfect") >= 0; }, "verb_present_perfect"),
      rule(function (p) { return p.indexOf("used to") >= 0; }, "verb_past_simple_irregular"),
      rule(function (p) { return p.indexOf("modal") >= 0; }, "verb_modals"),
      rule(function (p) { return p.indexOf("for / since") >= 0 || p.indexOf("for/since") >= 0; }, "verb_present_perfect_forsince"),
      rule(function (p) { return p.indexOf("past continuous") >= 0; }, "verb_past_continuous"),
      rule(function (p) { return p.indexOf("past perfect") >= 0; }, "verb_past_perfect"),
      rule(function (p) { return p.indexOf("passive") >= 0; }, "verb_passive"),
      rule(function (p) { return p.indexOf("reported") >= 0; }, "verb_reported_speech"),
      rule(function (p) { return p.indexOf("future") >= 0 && p.indexOf("perfect") >= 0; }, "verb_future_perfect"),
      rule(function (p) { return p.indexOf("future") >= 0; }, "verb_will_future"),
      rule(function (p) { return p.indexOf("second conditional") >= 0; }, "conditional_second"),
      rule(function (p) { return p.indexOf("third conditional") >= 0; }, "conditional_third"),
      rule(function (p) { return p.indexOf("mixed conditional") >= 0; }, "conditional_mixed"),
      rule(function (p) { return p.indexOf("causative") >= 0 || p.indexOf("subjunctive") >= 0; }, "verb_passive"),
      rule(function (p) { return p.indexOf("aspect") >= 0 || p.indexOf("aktionsart") >= 0; }, "verb_present_simple"),
      rule(function (p) { return p.indexOf("narrative") >= 0; }, "verb_past_simple_ed"),
      rule(function (p) { return p.indexOf("epistemic") >= 0 || p.indexOf("deontic") >= 0; }, "verb_modals"),
      rule(function (p) { return p.indexOf("infinitive") >= 0 || p.indexOf("gerund") >= 0; }, "verb_present_perfect"),
      rule(function (p) { return p.indexOf("inventory") >= 0 || p.indexOf("sequence") >= 0; }, "verb_present_simple"),
      rule(function (p) { return p.indexOf("archaic") >= 0; }, "verb_past_simple_irregular"),
      rule(function (p) { return p.indexOf("get-passive") >= 0; }, "verb_passive")
    ],
    adj: [
      rule(function (p) { return p.indexOf("position") >= 0; }, "adj_order"),
      rule(function (p) { return p.indexOf("predicative") >= 0; }, "adj_predicative"),
      rule(function (p) { return p.indexOf("possessive") >= 0; }, "adj_possessive"),
      rule(function (p) { return p.indexOf("demonstrative") >= 0; }, "adj_demonstrative"),
      rule(function (p) { return p.indexOf("agreement") >= 0 || p.indexOf("gender") >= 0; }, "adj_no_agreement"),
      rule(function (p) { return p.indexOf("comparative") >= 0; }, "adj_comparative"),
      rule(function (p) { return p.indexOf("superlative") >= 0; }, "adj_superlative"),
      rule(function (p) { return p.indexOf("as…as") >= 0 || p.indexOf("as...as") >= 0; }, "adj_comparative"),
      rule(function (p) { return p.indexOf("enough") >= 0 || p.indexOf("too") >= 0; }, "adj_comparative"),
      rule(function (p) { return p.indexOf("order") >= 0; }, "adj_order"),
      rule(function (p) { return p.indexOf("-ed / -ing") >= 0 || p.indexOf("-ed/-ing") >= 0; }, "adj_ed_ing"),
      rule(function (p) { return p.indexOf("preposition") >= 0; }, "adj_predicative"),
      rule(function (p) { return p.indexOf("gradable") >= 0; }, "adj_comparative"),
      rule(function (p) { return p.indexOf("compound") >= 0; }, "adj_order"),
      rule(function (p) { return p.indexOf("linking") >= 0; }, "adj_predicative"),
      rule(function (p) { return p.indexOf("the…the") >= 0; }, "adj_comparative"),
      rule(function (p) { return p.indexOf("colour") >= 0 || p.indexOf("color") >= 0; }, "adj_ed_ing"),
      rule(function (p) { return p.indexOf("postpositive") >= 0; }, "adj_order"),
      rule(function (p) { return p.indexOf("good/well") >= 0 || p.indexOf("hard/hardly") >= 0; }, "adv_good_well"),
      rule(function (p) { return p.indexOf("flat adverb") >= 0; }, "adv_manner_ly")
    ],
    pron: [
      rule(function (p) { return p.indexOf("subject") >= 0; }, "pron_subject"),
      rule(function (p) { return p.indexOf("object") >= 0; }, "pron_object"),
      rule(function (p) { return p.indexOf("possessive") >= 0; }, "pron_possessive"),
      rule(function (p) { return p.indexOf("reflexive") >= 0; }, "pron_reflexive"),
      rule(function (p) { return p.indexOf("singular they") >= 0; }, "pron_singular_they"),
      rule(function (p) { return p.indexOf("they") >= 0; }, "pron_indefinite"),
      rule(function (p) { return p.indexOf("one / ones") >= 0 || p.indexOf("one/ones") >= 0; }, "pron_one"),
      rule(function (p) { return p.indexOf("something") >= 0; }, "pron_indefinite"),
      rule(function (p) { return p.indexOf("relative") >= 0 || p.indexOf("who") >= 0; }, "rel_who"),
      rule(function (p) { return p.indexOf("whose") >= 0 || p.indexOf("where") >= 0; }, "rel_whose"),
      rule(function (p) { return p.indexOf("each") >= 0 || p.indexOf("neither") >= 0; }, "pron_indefinite"),
      rule(function (p) { return p.indexOf("reciprocal") >= 0; }, "pron_reflexive"),
      rule(function (p) { return p.indexOf("emphatic") >= 0; }, "pron_reflexive"),
      rule(function (p) { return p.indexOf("impersonal one") >= 0; }, "pron_one"),
      rule(function (p) { return p.indexOf("whom") >= 0 || p.indexOf("preposition") >= 0; }, "rel_whom"),
      rule(function (p) { return p.indexOf("what as relative") >= 0; }, "rel_what"),
      rule(function (p) { return p.indexOf("-ever") >= 0; }, "pron_indefinite"),
      rule(function (p) { return p.indexOf("preparatory it") >= 0 || p.indexOf("anticipatory") >= 0; }, "cleft_it"),
      rule(function (p) { return p.indexOf("coreference") >= 0; }, "pron_coreference"),
      rule(function (p) { return p.indexOf("middle voice") >= 0; }, "verb_passive"),
      rule(function (p) { return p.indexOf("cleft pronoun") >= 0; }, "cleft_it"),
      rule(function (p) { return p.indexOf("same / such") >= 0; }, "pron_indefinite"),
      rule(function (p) { return p.indexOf("anaphora") >= 0; }, "pron_coreference")
    ],
    adv: [
      rule(function (p) { return p.indexOf("be + not") >= 0; }, "neg_be_not"),
      rule(function (p) { return p.indexOf("do/does") >= 0 || p.indexOf("did") >= 0; }, "neg_do_does"),
      rule(function (p) { return p.indexOf("short answer") >= 0; }, "neg_be_not"),
      rule(function (p) { return p.indexOf("frequency") >= 0; }, "adv_frequency"),
      rule(function (p) { return p.indexOf("place") >= 0 || p.indexOf("time") >= 0; }, "adv_place_time"),
      rule(function (p) { return p.indexOf("already") >= 0 || p.indexOf("yet") >= 0; }, "adv_already_yet"),
      rule(function (p) { return p.indexOf("-ly") >= 0 || p.indexOf("manner") >= 0; }, "adv_manner_ly"),
      rule(function (p) { return p.indexOf("degree") >= 0 || p.indexOf("very") >= 0; }, "adv_degree"),
      rule(function (p) { return p.indexOf("only") >= 0; }, "adv_only"),
      rule(function (p) { return p.indexOf("however") >= 0 || p.indexOf("moreover") >= 0; }, "adv_formal_connectors"),
      rule(function (p) { return p.indexOf("so / such") >= 0; }, "adv_so_such"),
      rule(function (p) { return p.indexOf("hardly") >= 0; }, "adv_inversion"),
      rule(function (p) { return p.indexOf("inversion") >= 0; }, "adv_inversion"),
      rule(function (p) { return p.indexOf("epistemic") >= 0; }, "adv_epistemic"),
      rule(function (p) { return p.indexOf("litotes") >= 0 || p.indexOf("euphemism") >= 0; }, "adv_litotes"),
      rule(function (p) { return p.indexOf("irony") >= 0 || p.indexOf("implicature") >= 0; }, "adv_epistemic"),
      rule(function (p) { return p.indexOf("hedge") >= 0; }, "adv_epistemic"),
      rule(function (p) { return p.indexOf("hyperbaton") >= 0; }, "adv_inversion"),
      rule(function (p) { return p.indexOf("scope") >= 0 || p.indexOf("double negation") >= 0; }, "neg_do_does"),
      rule(function (p) { return p.indexOf("pragmatic") >= 0; }, "adv_epistemic")
    ],
    disc: [
      rule(function (p) { return p.indexOf("declarative") >= 0 || p.indexOf("svo") >= 0; }, "disc_svo"),
      rule(function (p) { return p.indexOf("question") >= 0 || p.indexOf("wh-") >= 0; }, "disc_questions"),
      rule(function (p) { return p.indexOf("there is") >= 0; }, "disc_there"),
      rule(function (p) { return p.indexOf("it is") >= 0; }, "disc_there"),
      rule(function (p) { return p.indexOf("preposition") >= 0; }, "disc_prepositions"),
      rule(function (p) { return p.indexOf("sequencing") >= 0; }, "disc_connectors"),
      rule(function (p) { return p.indexOf("logical") >= 0 || p.indexOf("because") >= 0; }, "disc_connectors"),
      rule(function (p) { return p.indexOf("relative") >= 0; }, "rel_who"),
      rule(function (p) { return p.indexOf("tag") >= 0; }, "disc_questions"),
      rule(function (p) { return p.indexOf("cause") >= 0; }, "disc_cause"),
      rule(function (p) { return p.indexOf("purpose") >= 0; }, "disc_purpose"),
      rule(function (p) { return p.indexOf("time clause") >= 0 || p.indexOf("when /") >= 0; }, "disc_time_clauses"),
      rule(function (p) { return p.indexOf("first conditional") >= 0 || p.indexOf("conditional") >= 0 && p.indexOf("1") >= 0; }, "conditional_first"),
      rule(function (p) { return p.indexOf("concession") >= 0 || p.indexOf("although") >= 0; }, "disc_concession"),
      rule(function (p) { return p.indexOf("cleft") >= 0; }, "cleft_it"),
      rule(function (p) { return p.indexOf("inversion") >= 0; }, "disc_inversion"),
      rule(function (p) { return p.indexOf("participle clause") >= 0; }, "disc_participle_clauses"),
      rule(function (p) { return p.indexOf("conditional system") >= 0; }, "conditional_zero"),
      rule(function (p) { return p.indexOf("register") >= 0; }, "disc_register"),
      rule(function (p) { return p.indexOf("academic") >= 0 || p.indexOf("metalanguage") >= 0; }, "disc_academic"),
      rule(function (p) { return p.indexOf("sociolinguistic") >= 0; }, "disc_register"),
      rule(function (p) { return p.indexOf("ambigu") >= 0; }, "disc_academic"),
      rule(function (p) { return p.indexOf("information structure") >= 0; }, "cleft_it")
    ],
    num: [
      rule(function (p) { return p.indexOf("cardinal") >= 0 || p.indexOf("0–100") >= 0; }, "num_cardinals"),
      rule(function (p) { return p.indexOf("some / any") >= 0; }, "num_some_any"),
      rule(function (p) { return p.indexOf("much / many") >= 0 || p.indexOf("a lot") >= 0; }, "num_many_much"),
      rule(function (p) { return p.indexOf("few / a few") >= 0 || p.indexOf("little") >= 0; }, "num_few_little"),
      rule(function (p) { return p.indexOf("teen") >= 0 || p.indexOf("tens") >= 0; }, "num_cardinals"),
      rule(function (p) { return p.indexOf("ordinal") >= 0; }, "num_ordinals"),
      rule(function (p) { return p.indexOf("both / either") >= 0; }, "num_quantifiers"),
      rule(function (p) { return p.indexOf("fraction") >= 0; }, "num_fractions"),
      rule(function (p) { return p.indexOf("majority") >= 0 || p.indexOf("most of") >= 0; }, "num_majority"),
      rule(function (p) { return p.indexOf("collective") >= 0; }, "num_collective"),
      rule(function (p) { return p.indexOf("every / each") >= 0; }, "num_quantifiers"),
      rule(function (p) { return p.indexOf("approximation") >= 0; }, "num_approximation"),
      rule(function (p) { return p.indexOf("proportion") >= 0 || p.indexOf("percent") >= 0; }, "num_fractions"),
      rule(function (p) { return p.indexOf("formal quantifier") >= 0 || p.indexOf("myriad") >= 0; }, "num_formal"),
      rule(function (p) { return p.indexOf("number of vs") >= 0; }, "num_collective")
    ]
  };

  const FALLBACK = {
    fr: { nom: "nom_definite", verb: "verb_present_er", adj: "adj_feminine", pron: "pron_sujet", adv: "adv_place", disc: "pron_sujet", num: "numeraux" },
    en: { nom: "nom_countable", verb: "verb_present_simple", adj: "adj_order", pron: "pron_subject", adv: "adverb_position", disc: "linking_words", num: "quant_some_any" }
  };

  global.GrammarDeepContent = {
    resolveDeepContent: resolveDeepContent,
    formatDeepDetail: formatDeepDetail,
    resolveLibKey: resolveLibKey
  };
})(typeof window !== "undefined" ? window : global);
