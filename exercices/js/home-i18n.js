(function () {
  "use strict";

  var STORAGE_KEY = "linguaphix-lang";

  var I18N = {
    fr: {
      htmlLang: "fr",
      title: "LINGUAPHIX — Grammaire FLE & ESL interactive",
      metaDescription: "LINGUAPHIX — Plateforme de grammaire FLE et ESL : précis de cours exhaustifs et 40 exercices interactifs par niveau CECR (A1–C2).",
      navHome: "Accueil",
      navFle: "Français (FLE)",
      navEsl: "English (ESL)",
      logoSub: "Grammaire A1–C2",
      heroTitle: "Grammaire interactive<br>A1 → C2",
      heroLead: "Précis de cours détaillés, exercices variés (texte à trous, QCM, appariement, flashcards à choix multiples, transformations) et corrections intégrées — pour le français langue étrangère et l'anglais.",
      fleTitle: "Français langue étrangère",
      fleDesc: "Nominal, verbal, adjectival, pronominal, adverbial, discours, nombre — 6 niveaux CECR, 7 catégories, 40 exercices par thème.",
      fleMeta1: "A1–C2",
      fleMeta2: "42 thèmes",
      fleMeta3: "1 680 exercices",
      fleMeta4: "Aligné DELF/DALF",
      eslTitle: "Anglais langue seconde",
      eslDesc: "Noms, verbes, adjectifs, pronoms, adverbes, syntaxe, quantificateurs — précis structurés par niveau CECR.",
      eslMeta1: "A1–C2",
      eslMeta2: "42 thèmes",
      eslMeta3: "1 680 exercices",
      eslMeta4: "Aligné CECR",
      feat1Title: "Précis exhaustifs",
      feat1Desc: "Définitions, formation, emploi, exemples commentés et pièges fréquents — par niveau et par catégorie.",
      feat2Title: "Flashcards QCM",
      feat2Desc: "Choix de réponses avant la correction, puis explication détaillée.",
      feat3Title: "Corrections intégrées",
      feat3Desc: "Vérification question par question ou correction globale avec score.",
      footer: "LINGUAPHIX · Grammaire FLE & ESL · A1–C2",
      backMain: "← Retour au site LINGUAPHIX",
      scrollTop: "Retour en haut de la page",
      constructionBanner: "En cours de construction — cette bannière disparaîtra une fois le travail terminé."
    },
    en: {
      htmlLang: "en",
      title: "LINGUAPHIX — Interactive FLE & ESL Grammar",
      metaDescription: "LINGUAPHIX — FLE and ESL grammar platform: detailed course notes and 40 interactive exercises per CEFR level (A1–C2).",
      navHome: "Home",
      navFle: "Français (FLE)",
      navEsl: "English (ESL)",
      logoSub: "Grammar A1–C2",
      heroTitle: "Interactive Grammar<br>A1 → C2",
      heroLead: "Detailed course notes, varied exercises (gap-fill, MCQ, matching, multiple-choice flashcards, transformations) and built-in feedback — for French as a foreign language and English.",
      fleTitle: "French as a Foreign Language",
      fleDesc: "Nouns, verbs, adjectives, pronouns, adverbs, discourse, quantifiers — 6 CEFR levels, 7 categories, 40 exercises per topic.",
      fleMeta1: "A1–C2",
      fleMeta2: "42 topics",
      fleMeta3: "1,680 exercises",
      fleMeta4: "DELF/DALF aligned",
      eslTitle: "English as a Second Language",
      eslDesc: "Nouns, verbs, adjectives, pronouns, adverbs, syntax, quantifiers — structured course notes by CEFR level.",
      eslMeta1: "A1–C2",
      eslMeta2: "42 topics",
      eslMeta3: "1,680 exercises",
      eslMeta4: "CEFR aligned",
      feat1Title: "Comprehensive course notes",
      feat1Desc: "Definitions, formation, usage, commented examples and common pitfalls — by level and category.",
      feat2Title: "MCQ flashcards",
      feat2Desc: "Choose an answer before checking, then read a detailed explanation.",
      feat3Title: "Built-in feedback",
      feat3Desc: "Check each question or submit all answers with a score.",
      footer: "LINGUAPHIX · FLE & ESL Grammar · A1–C2",
      backMain: "← Back to LINGUAPHIX website",
      scrollTop: "Back to top",
      constructionBanner: "Still under construction — this banner will disappear when done."
    }
  };

  function resolveLang() {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("lang");
    if (fromUrl === "fr" || fromUrl === "en") {
      try { sessionStorage.setItem(STORAGE_KEY, fromUrl); } catch (e) {}
      return fromUrl;
    }
    try {
      var stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") return stored;
    } catch (e) {}
    return "fr";
  }

  function homeHref(lang) {
    return "index.html?lang=" + lang;
  }

  function applyLang(lang) {
    var t = I18N[lang] || I18N.fr;
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.metaDescription);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] != null) el.innerHTML = t[key];
    });

    var navHome = document.getElementById("nav-home");
    if (navHome) navHome.href = homeHref(lang);

    var logo = document.querySelector(".site-logo");
    if (logo) logo.href = homeHref(lang);

    document.body.setAttribute("data-lang", lang);

    var scrollBtn = document.querySelector(".scroll-top-btn");
    if (scrollBtn) {
      scrollBtn.setAttribute("aria-label", t.scrollTop);
      scrollBtn.setAttribute("title", t.scrollTop);
    }
  }

  applyLang(resolveLang());
})();
