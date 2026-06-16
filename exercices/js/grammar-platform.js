/**
 * LINGUAPHIX — Interactive grammar platform (vanilla JS)
 * Usage: initGrammarPlatform({ lang, title, subtitle, ui })
 */
(function (global) {
  const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const CATEGORIES = [
    { id: "nom", labelFr: "Nominal / articles", labelEn: "Nouns & articles", color: "teal" },
    { id: "verb", labelFr: "Verbal / temps", labelEn: "Verbs & tenses", color: "blue" },
    { id: "adj", labelFr: "Adjectival / accord", labelEn: "Adjectives & agreement", color: "amber" },
    { id: "pron", labelFr: "Pronominal", labelEn: "Pronouns", color: "purple" },
    { id: "adv", labelFr: "Adverbial", labelEn: "Adverbs & negation", color: "pink" },
    { id: "disc", labelFr: "Discours / syntaxe", labelEn: "Discourse & syntax", color: "coral" },
    { id: "num", labelFr: "Nombre / quantif.", labelEn: "Number & quantifiers", color: "gray" }
  ];
  const EXERCISE_TYPES = [
    { id: "all", icon: "📋" },
    { id: "gap", icon: "✏️" },
    { id: "mcq", icon: "🔘" },
    { id: "matching", icon: "🔗" },
    { id: "flashcard", icon: "🃏" },
    { id: "transform", icon: "🔄" }
  ];

  const DEFAULT_UI = {
    fr: {
      levelLabel: "Niveau CECR",
      catLabel: "Catégorie grammaticale",
      precisTab: "Précis de cours",
      exTab: "Exercices (40)",
      pointsLabel: "Points couverts",
      exTypeLabel: "Filtrer par type",
      allTypes: "Tous (40 questions)",
      gap: "Texte à trous",
      mcq: "QCM",
      matching: "Appariement",
      flashcard: "Flashcards",
      transform: "Transformation",
      showAnswers: "Voir les corrections",
      hideAnswers: "Masquer les corrections",
      submit: "Corriger tout",
      reset: "Recommencer",
      score: "Score",
      correct: "Correct !",
      expected: "Réponse attendue",
      answer: "Réponse",
      reveal: "Voir la réponse",
      matchingHint: "Cliquez à gauche puis à droite pour associer.",
      flashHint: "Choisissez une réponse ci-dessous.",
      flashChoose: "Choisissez la bonne réponse :",
      flashExplain: "Explication",
      flashNext: "Carte suivante",
      know: "Je sais",
      review: "À revoir",
      done: "Terminé !",
      mastered: "maîtrisées",
      toReview: "carte(s) à revoir",
      perfect: "Parfait !",
      good: "Bien joué !",
      revise: "À réviser.",
      allMatched: "Bravo ! Toutes les paires trouvées.",
      noPrecis: "Précis non disponible pour cette combinaison.",
      pointsHint: "Cliquez sur un point pour y accéder directement.",
      searchLabel: "Recherche thématique",
      searchPlaceholder: "Ex. passé composé, subjonctif, COD, négation…",
      searchHint: "Trouvez toutes les sections du précis, tous niveaux confondus.",
      searchNoResults: "Aucune section trouvée pour cette thématique.",
      searchResults: "sections trouvées",
      searchClear: "Effacer",
      footer: "6 niveaux × 7 catégories × 40 exercices",
      progress: "Progression",
      question: "Question"
    },
    en: {
      levelLabel: "CEFR level",
      catLabel: "Grammar category",
      precisTab: "Course notes",
      exTab: "Exercises (40)",
      pointsLabel: "Topics covered",
      exTypeLabel: "Filter by type",
      allTypes: "All (40 questions)",
      gap: "Fill in the gap",
      mcq: "Multiple choice",
      matching: "Matching",
      flashcard: "Flashcards",
      transform: "Transformation",
      showAnswers: "Show corrections",
      hideAnswers: "Hide corrections",
      submit: "Check all",
      reset: "Start over",
      score: "Score",
      correct: "Correct!",
      expected: "Expected answer",
      answer: "Answer",
      reveal: "Show answer",
      matchingHint: "Click left then right to match pairs.",
      flashHint: "Select an answer below.",
      flashChoose: "Choose the correct answer:",
      flashExplain: "Explanation",
      flashNext: "Next card",
      know: "I know it",
      review: "Review again",
      done: "Done!",
      mastered: "mastered",
      toReview: "card(s) to review",
      perfect: "Perfect!",
      good: "Well done!",
      revise: "Needs review.",
      allMatched: "Great! All pairs matched.",
      noPrecis: "Course notes not available for this combination.",
      pointsHint: "Click a topic to jump to its explanation.",
      searchLabel: "Thematic search",
      searchPlaceholder: "e.g. present perfect, passive, modals, negation…",
      searchHint: "Find all course-note sections across every CEFR level.",
      searchNoResults: "No sections found for this topic.",
      searchResults: "sections found",
      searchClear: "Clear",
      footer: "6 levels × 7 categories × 40 exercises",
      progress: "Progress",
      question: "Question"
    }
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function catTone(catId) {
    const c = CATEGORIES.find(function (x) { return x.id === catId; });
    return (c && c.color) ? c.color : "gray";
  }

  function badge(label, color) {
    const tone = color || "gray";
    return `<span class="lp-badge lp-cat-tone-${tone}">${esc(label)}</span>`;
  }

  function normalizeAnswer(s) {
    return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function checkGapAnswer(user, ex) {
    const u = normalizeAnswer(user);
    const a = normalizeAnswer(ex.answer);
    if (u === a) return true;
    if (ex.answerAlt && ex.answerAlt.some(function (alt) { return normalizeAnswer(alt) === u; })) return true;
    if (a.includes(" / ")) {
      const parts = a.split(" / ").map(normalizeAnswer);
      const userParts = u.split(/[/,]/).map(function (p) { return normalizeAnswer(p); }).filter(Boolean);
      if (userParts.length === parts.length && parts.every(function (p, i) { return userParts[i] === p; })) return true;
    }
    return false;
  }

  /* ── Renderers ── */
  function renderGapBlock(ex, i, ui, state, readonly) {
    const attempted = state.submitted || state.revealed[i];
    const userAns = state.answers[i] || "";
    const correct = checkGapAnswer(userAns, ex);
    const cls = attempted ? (correct ? "lp-ok" : "lp-ko") : "";
    const parts = ex.sentence.split("___");
    let inputs = "";
    parts.forEach(function (part, j, arr) {
      inputs += esc(part);
      if (j < arr.length - 1) {
        inputs += `<input type="text" class="lp-input lp-gap-input ${cls}" data-idx="${i}" value="${esc(userAns)}" placeholder="___" ${readonly || attempted ? "disabled" : ""} />`;
      }
    });
    let feedback = "";
    if (attempted) {
      feedback = `<div class="lp-feedback">${correct ? "✓ " + esc(ui.correct) : "✓ " + esc(ui.answer) + " : <strong>" + esc(ex.answer) + "</strong>"}${ex.explanation ? '<div class="lp-expl">' + esc(ex.explanation) + "</div>" : ""}</div>`;
    } else if (!readonly && !state.submitted) {
      feedback = `<button type="button" class="lp-btn lp-btn-sm lp-reveal-one" data-idx="${i}">${esc(ui.reveal)}</button>`;
    }
    return `<div class="lp-ex-block ${cls}" data-type="gap" data-idx="${i}">
      <div class="lp-ex-num">${i + 1}. ${ex.hint ? '<span class="lp-hint">(' + esc(ex.hint) + ")</span>" : ""}</div>
      <div class="lp-ex-body">${inputs}</div>${feedback}</div>`;
  }

  function renderMcqBlock(ex, i, ui, state, readonly) {
    const sel = state.answers[i];
    const rev = readonly || state.submitted || sel !== undefined;
    let opts = ex.options.map(function (opt, j) {
      const isSel = sel === j;
      const isCor = j === ex.correct;
      let cls = "lp-mcq-opt";
      if (rev) {
        if (isCor) cls += " lp-ok";
        else if (isSel && !isCor) cls += " lp-ko";
      } else if (isSel) cls += " lp-selected";
      return `<div class="${cls}" data-idx="${i}" data-opt="${j}" role="button" tabindex="0">${["A", "B", "C", "D"][j]}. ${esc(opt)}${rev && isCor ? " ✓" : ""}${rev && isSel && !isCor ? " ✗" : ""}</div>`;
    }).join("");
    const expl = rev && ex.explanation ? `<div class="lp-expl-box">${esc(ex.explanation)}</div>` : "";
    return `<div class="lp-ex-block" data-type="mcq" data-idx="${i}">
      <div class="lp-ex-num">${i + 1}. ${esc(ex.question)}</div>
      <div class="lp-mcq-list">${opts}</div>${expl}</div>`;
  }

  function renderMatchingGroup(items, startIdx, ui, state) {
    const pairs = items;
    const key = "m" + startIdx;
    if (!state.matching[key]) {
      state.matching[key] = {
        matched: [],
        selected: { left: null, right: null },
        order: pairs.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; })
      };
    }
    const m = state.matching[key];
    const leftHtml = pairs.map(function (ex, i) {
      const done = m.matched.some(function (x) { return x.left === i; });
      const sel = m.selected.left === i;
      return `<div class="lp-match-item ${done ? "lp-ok" : sel ? "lp-selected" : ""}" data-mkey="${key}" data-side="left" data-i="${i}" data-answer="${esc(ex.right)}">${esc(ex.left)}</div>`;
    }).join("");
    const rightHtml = m.order.map(function (ri, pos) {
      const ex = pairs[ri];
      const done = m.matched.some(function (x) { return x.right === pos; });
      const sel = m.selected.right === pos;
      return `<div class="lp-match-item ${done ? "lp-ok" : sel ? "lp-selected" : ""}" data-mkey="${key}" data-side="right" data-i="${pos}" data-answer="${esc(ex.right)}">${esc(ex.right)}</div>`;
    }).join("");
    const complete = m.matched.length === pairs.length;
    return `<div class="lp-ex-block lp-match-wrap" data-type="matching">
      <div class="lp-ex-num">${startIdx + 1}–${startIdx + pairs.length}. ${esc(ui.matchingHint)}</div>
      <div class="lp-match-grid"><div class="lp-match-col">${leftHtml}</div><div class="lp-match-col">${rightHtml}</div></div>
      ${complete ? '<div class="lp-feedback lp-ok-text">✓ ' + esc(ui.allMatched) + "</div>" : ""}</div>`;
  }

  function renderFlashcardBlock(ex, ui, fcState) {
    if (fcState.index === undefined) fcState.index = 0;
    if (!fcState.known) fcState.known = [];
    if (!fcState.review) fcState.review = [];
    if (!fcState.answered) fcState.answered = {};
    const total = fcState.total || 1;
    const idx = fcState.index;
    const done = fcState.known.length + fcState.review.length >= total;

    if (done) {
      const fcScore = fcState.known.length;
      return `<div class="lp-ex-block lp-fc-done">
        <div class="lp-fc-result">${fcScore === total ? "🎉" : "📚"} ${esc(ui.done)} ${fcScore}/${total} ${esc(ui.mastered)}.</div>
        ${fcState.review.length ? "<div class=\"lp-hint\">" + fcState.review.length + " " + esc(ui.toReview) + "</div>" : ""}
        <button type="button" class="lp-btn lp-fc-reset">${esc(ui.reset)}</button></div>`;
    }

    const cur = ex;
    const ans = fcState.answered[idx];
    const hasOptions = cur.options && cur.options.length >= 2;
    const opts = hasOptions ? cur.options : [cur.back.split("—")[0].trim(), "?"];
    const correctIdx = typeof cur.correct === "number" ? cur.correct : 0;
    const locked = ans !== undefined;

    let optsHtml = opts.map(function (opt, j) {
      let cls = "lp-fc-opt";
      if (locked) {
        cls += " lp-fc-opt-locked";
        if (j === correctIdx) cls += " lp-ok";
        else if (j === ans && j !== correctIdx) cls += " lp-ko";
      } else if (ans === j) cls += " lp-selected";
      return `<button type="button" class="${cls}" data-fc-opt="${j}" ${locked ? "disabled" : ""}>${["A", "B", "C", "D"][j] || j + 1}. ${esc(opt)}</button>`;
    }).join("");

    let feedback = "";
    if (locked) {
      const ok = ans === correctIdx;
      feedback = `<div class="lp-fc-back">
        <strong>${ok ? "✓ " + esc(ui.correct) : "✗ " + esc(ui.answer)}</strong><br>
        ${esc(cur.back)}
        ${cur.explanation ? "<br><em>" + esc(cur.explanation) + "</em>" : ""}
      </div>
      <div class="lp-fc-actions">
        <button type="button" class="lp-btn lp-fc-review">${esc(ui.review)}</button>
        <button type="button" class="lp-btn lp-fc-know lp-btn-primary">${esc(ui.flashNext)}</button>
      </div>`;
    }

    return `<div class="lp-ex-block lp-fc-wrap" data-type="flashcard">
      <div class="lp-fc-meta">${esc(ui.question)} ${idx + 1}/${total} · ✓ ${fcState.known.length} · ↺ ${fcState.review.length}</div>
      ${cur.category ? badge(cur.category, "teal") : ""}
      <div class="lp-fc-question">${esc(cur.front)}</div>
      <div class="lp-label">${esc(ui.flashChoose)}</div>
      <div class="lp-fc-options">${optsHtml}</div>
      ${feedback}
    </div>`;
  }

  function renderTransformBlock(ex, i, ui, state, readonly) {
    const attempted = state.submitted || state.revealed[i];
    const userAns = state.answers[i] || "";
    const correct = normalizeAnswer(userAns) === normalizeAnswer(ex.answer);
    const cls = attempted ? (correct ? "lp-ok" : "lp-ko") : "";
    let feedback = "";
    if (attempted) {
      feedback = `<div class="lp-feedback">${correct ? "✓ " + esc(ui.correct) : esc(ui.expected) + " : <strong>" + esc(ex.answer) + "</strong>"}${ex.explanation ? '<div class="lp-expl">' + esc(ex.explanation) + "</div>" : ""}</div>`;
    } else if (!readonly && !state.submitted) {
      feedback = `<button type="button" class="lp-btn lp-btn-sm lp-reveal-one" data-idx="${i}">${esc(ui.reveal)}</button>`;
    }
    return `<div class="lp-ex-block ${cls}" data-type="transform" data-idx="${i}">
      <div class="lp-ex-num">${i + 1}. ${esc(ex.instruction)}</div>
      <div class="lp-original">${esc(ex.original)}</div>
      <textarea class="lp-textarea lp-transform-input ${cls}" data-idx="${i}" rows="2" placeholder="…" ${readonly || attempted ? "disabled" : ""}>${esc(userAns)}</textarea>${feedback}</div>`;
  }

  function computeScore(exercises, state) {
    let score = 0;
    let gradable = 0;
    exercises.forEach(function (ex, i) {
      if (ex.type === "matching") return;
      if (ex.type === "flashcard") return;
      gradable++;
      const a = state.answers[i];
      if (ex.type === "gap" && checkGapAnswer(a, ex)) score++;
      else if (ex.type === "mcq" && a === ex.correct) score++;
      else if (ex.type === "transform" && normalizeAnswer(a) === normalizeAnswer(ex.answer)) score++;
    });
    return { score: score, total: gradable };
  }

  function renderExercises(root, exercises, ui, state, filter, showCorrections) {
    const filtered = filter === "all" ? exercises : exercises.filter(function (e) { return e.type === filter; });
    let html = "";
    let i = 0;
    while (i < filtered.length) {
      const ex = filtered[i];
      const readonly = showCorrections;
      if (ex.type === "matching") {
        const group = [];
        while (i < filtered.length && filtered[i].type === "matching") { group.push(filtered[i]); i++; }
        html += renderMatchingGroup(group, group[0].number - 1, ui, state);
      } else if (ex.type === "flashcard") {
        const group = [];
        while (i < filtered.length && filtered[i].type === "flashcard") { group.push(filtered[i]); i++; }
        if (!state.flash) state.flash = { index: 0, known: [], review: [], answered: {}, total: group.length, items: group };
        const cur = state.flash.items[state.flash.index] || state.flash.items[0];
        html += renderFlashcardBlock(cur, ui, state.flash);
      } else {
        const idx = ex.number - 1;
        if (ex.type === "gap") html += renderGapBlock(ex, idx, ui, state, readonly);
        else if (ex.type === "mcq") html += renderMcqBlock(ex, idx, ui, state, readonly);
        else if (ex.type === "transform") html += renderTransformBlock(ex, idx, ui, state, readonly);
        i++;
      }
    }

    const sc = computeScore(exercises, state);
    const toolbar = `<div class="lp-ex-toolbar">
      <button type="button" class="lp-btn lp-btn-primary lp-submit" ${state.submitted ? "disabled" : ""}>${esc(ui.submit)}</button>
      <button type="button" class="lp-btn lp-toggle-corrections">${showCorrections ? esc(ui.hideAnswers) : esc(ui.showAnswers)}</button>
      <button type="button" class="lp-btn lp-reset-ex">${esc(ui.reset)}</button>
      ${state.submitted ? `<span class="lp-score">${esc(ui.score)} : ${sc.score} / ${sc.total}</span>` : `<span class="lp-progress">${esc(ui.progress)} : ${Object.keys(state.answers).length}/${sc.total}</span>`}
    </div>`;

    root.querySelector(".lp-ex-content").innerHTML = toolbar + html;

    bindExerciseEvents(root, exercises, ui, state, filter, showCorrections);
  }

  function bindExerciseEvents(root, exercises, ui, state, filter, showCorrections) {
    root.querySelector(".lp-submit").addEventListener("click", function () {
      state.submitted = true;
      renderExercises(root, exercises, ui, state, filter, showCorrections);
    });
    root.querySelector(".lp-reset-ex").addEventListener("click", function () {
      state.answers = {};
      state.revealed = {};
      state.submitted = false;
      state.matching = {};
      state.flash = null;
      renderExercises(root, exercises, ui, state, filter, showCorrections);
    });
    root.querySelector(".lp-toggle-corrections").addEventListener("click", function () {
      root.dataset.showCorrections = showCorrections ? "0" : "1";
      renderExercises(root, exercises, ui, state, filter, !showCorrections);
    });

    root.querySelectorAll(".lp-gap-input, .lp-transform-input").forEach(function (el) {
      el.addEventListener("input", function () {
        state.answers[parseInt(el.dataset.idx, 10)] = el.value;
      });
    });
    root.querySelectorAll(".lp-reveal-one").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.revealed[parseInt(btn.dataset.idx, 10)] = true;
        renderExercises(root, exercises, ui, state, filter, showCorrections);
      });
    });
    root.querySelectorAll(".lp-mcq-opt").forEach(function (el) {
      if (state.submitted) return;
      el.addEventListener("click", function () {
        state.answers[parseInt(el.dataset.idx, 10)] = parseInt(el.dataset.opt, 10);
        renderExercises(root, exercises, ui, state, filter, showCorrections);
      });
    });
    root.querySelectorAll(".lp-match-item").forEach(function (el) {
      el.addEventListener("click", function () {
        const key = el.dataset.mkey;
        const side = el.dataset.side;
        const pos = parseInt(el.dataset.i, 10);
        const m = state.matching[key];
        if (!m) return;
        if (side === "left" && m.matched.some(function (x) { return x.left === pos; })) return;
        if (side === "right" && m.matched.some(function (x) { return x.right === pos; })) return;
        m.selected[side] = m.selected[side] === pos ? null : pos;
        if (m.selected.left !== null && m.selected.right !== null) {
          const leftEl = root.querySelector('.lp-match-item[data-mkey="' + key + '"][data-side="left"][data-i="' + m.selected.left + '"]');
          const rightEl = root.querySelector('.lp-match-item[data-mkey="' + key + '"][data-side="right"][data-i="' + m.selected.right + '"]');
          if (leftEl && rightEl && leftEl.dataset.answer === rightEl.dataset.answer) {
            m.matched.push({ left: m.selected.left, right: m.selected.right });
          }
          m.selected = { left: null, right: null };
        }
        renderExercises(root, exercises, ui, state, filter, showCorrections);
      });
    });

    const fc = root.querySelector(".lp-fc-wrap");
    if (fc) {
      fc.querySelectorAll(".lp-fc-opt:not(.lp-fc-opt-locked)").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const opt = parseInt(btn.dataset.fcOpt, 10);
          if (state.flash.answered[state.flash.index] !== undefined) return;
          state.flash.answered[state.flash.index] = opt;
          renderExercises(root, exercises, ui, state, filter, showCorrections);
        });
      });
    }
    const know = root.querySelector(".lp-fc-know");
    if (know) {
      know.addEventListener("click", function () {
        const idx = state.flash.index;
        const ans = state.flash.answered[idx];
        const cur = state.flash.items[idx];
        const correct = cur && typeof cur.correct === "number" ? cur.correct : 0;
        if (ans === correct) state.flash.known.push(idx);
        else state.flash.review.push(idx);
        state.flash.index = idx + 1;
        if (state.flash.known.length + state.flash.review.length >= state.flash.total) {
          state.flash.index = state.flash.total;
        }
        renderExercises(root, exercises, ui, state, filter, showCorrections);
      });
    }
    const rev = root.querySelector(".lp-fc-review");
    if (rev) {
      rev.addEventListener("click", function () {
        state.flash.review.push(state.flash.index);
        state.flash.index = state.flash.index + 1;
        if (state.flash.known.length + state.flash.review.length >= state.flash.total) {
          state.flash.index = state.flash.total;
        }
        renderExercises(root, exercises, ui, state, filter, showCorrections);
      });
    }
    root.querySelector(".lp-fc-reset")?.addEventListener("click", function () {
      state.flash = null;
      renderExercises(root, exercises, ui, state, filter, showCorrections);
    });
  }

  function initGrammarPlatform(opts) {
    const lang = opts.lang || "fr";
    const ui = Object.assign({}, DEFAULT_UI[lang], opts.ui || {});
    const data = global.GRAMMAR_DATA || {};
    const root = document.getElementById(opts.mountId || "grammar-app");
    if (!root) return;

    const uiStateApi = global.GrammarUIState;
    const initial = uiStateApi ? uiStateApi.read() : null;
    const persistence = uiStateApi ? uiStateApi.initPersistence({
      onPopState: function (state) {
        level = state.level;
        catId = state.category;
        view = state.view;
        exFilter = state.exerciseType || "all";
        if (state.openPanel != null && state.openPanel !== "") {
          pendingPointScroll = parseInt(state.openPanel, 10);
        }
        exercises = null;
        render();
      }
    }) : null;

    let level = initial ? initial.level : "A1";
    let catId = initial ? initial.category : "nom";
    let view = initial ? initial.view : "precis";
    let exFilter = initial ? (initial.exerciseType || "all") : "all";
    let exercises = null;
    let exState = { answers: {}, revealed: {}, submitted: false, matching: {}, flash: null };
    let precisSearch = "";
    let pendingPointScroll = initial && initial.openPanel != null && initial.openPanel !== ""
      ? parseInt(initial.openPanel, 10) : null;
    if (pendingPointScroll != null && isNaN(pendingPointScroll)) pendingPointScroll = null;
    const precisIndex = global.PrecisSearch
      ? global.PrecisSearch.buildIndex(data, lang, CATEGORIES)
      : null;

    function persistUI(extra) {
      if (!uiStateApi) return;
      uiStateApi.write(Object.assign({
        level: level,
        category: catId,
        view: view,
        exerciseType: exFilter,
        openPanel: pendingPointScroll != null ? String(pendingPointScroll) : null
      }, extra || {}));
    }

    function navigateForward(updates) {
      if (persistence) persistence.markForwardNavigation();
      if (updates.level) level = updates.level;
      if (updates.category) catId = updates.category;
      if (updates.view) view = updates.view;
      if (updates.exerciseType) exFilter = updates.exerciseType;
      exercises = null;
      persistUI(updates);
      render();
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    function catLabel(c) { return lang === "fr" ? c.labelFr : c.labelEn; }
    function typeLabel(t) { return t === "all" ? ui.allTypes : ui[t] || t; }

    function loadExercises() {
      const catData = (data[level] || {})[catId] || {};
      exercises = global.ExerciseGenerator.generateExerciseSet(lang, level, catId, catData);
      exState = { answers: {}, revealed: {}, submitted: false, matching: {}, flash: null };
    }

    function formatPointDetailHtml(text) {
      if (!text) return "";
      return text.split("\n").map(function (line) {
        const t = line.trim();
        if (!t) return "";
        if (/^[📌📖📝💡⚠️📐]/.test(t)) {
          return `<div class="lp-point-subhead">${esc(t)}</div>`;
        }
        if (/^(je |tu |il |elle |nous |vous |ils |elles |j'|JE |PARLER|ÊTRE|AVOIR|I |You |He |She |We |They |Radical|Masculin|Féminin|Singular|Plural|Present |Past |Future )/i.test(t) && t.length < 120) {
          return `<div class="lp-point-formation-line">${esc(t)}</div>`;
        }
        if (t.indexOf("•") === 0) {
          return `<div class="lp-point-bullet">${esc(t.replace(/^•\s*/, ""))}</div>`;
        }
        if (/^Ex\.?\s*:/i.test(t) || /^e\.g\.?\s*:/i.test(t)) {
          return `<div class="lp-point-example">${esc(t)}</div>`;
        }
        return `<p class="lp-point-p">${esc(t)}</p>`;
      }).filter(Boolean).join("");
    }

    function renderPrecisSearchHtml() {
      if (!precisIndex) return "";
      var html = `<div class="lp-precis-search">
        <div class="lp-label">${esc(ui.searchLabel)}</div>
        <p class="lp-points-hint">${esc(ui.searchHint)}</p>
        <div class="lp-precis-search-row">
          <input type="search" class="lp-precis-search-input" value="${esc(precisSearch)}" placeholder="${esc(ui.searchPlaceholder)}" autocomplete="off" spellcheck="false">
          ${precisSearch ? `<button type="button" class="lp-precis-search-clear" aria-label="${esc(ui.searchClear)}">${esc(ui.searchClear)}</button>` : ""}
        </div>`;

      if (precisSearch.trim().length >= 2) {
        var res = global.PrecisSearch.search(precisIndex, precisSearch);
        html += `<div class="lp-precis-search-meta">${res.total} ${esc(ui.searchResults)}</div>`;
        if (!res.results.length) {
          html += `<p class="lp-precis-search-empty">${esc(ui.searchNoResults)}</p>`;
        } else {
          html += `<div class="lp-precis-search-results">`;
          res.results.forEach(function (r, ri) {
            html += `<button type="button" class="lp-precis-search-hit lp-cat-tone-${r.catColor}" data-search-hit="${ri}"
              data-level="${r.level}" data-cat="${r.catId}" data-point="${r.pointIndex}">
              <span class="lp-precis-search-hit-top">
                <span class="lp-precis-search-lv lp-lv-${r.level}">${esc(r.level)}</span>
                <span class="lp-precis-search-cat lp-cat-tone-${r.catColor}">${esc(r.catLabel)}</span>
              </span>
              <span class="lp-precis-search-hit-title">${esc(r.label)}</span>
              <span class="lp-precis-search-hit-snippet">${esc(r.snippet)}</span>
            </button>`;
          });
          html += `</div>`;
        }
      }
      html += `</div>`;
      return html;
    }

    function scrollToPoint(idx) {
      var el = root.querySelector("#lp-point-" + idx);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("lp-point-highlight");
        setTimeout(function () { el.classList.remove("lp-point-highlight"); }, 2200);
      }
    }

  function render(afterRender) {
      const catData = (data[level] || {})[catId] || {};
      const cat = CATEGORIES.find(function (c) { return c.id === catId; });

      let html = `<div class="lp-platform${opts.siteMode ? " lp-site-mode" : ""}">`;
      if (!opts.siteMode) {
        html += `<header class="lp-header">
          <h1 class="lp-title">${esc(opts.title)}</h1>
          <p class="lp-subtitle">${esc(opts.subtitle)}</p>
        </header>`;
      } else {
        html += `<div class="page-intro"><h1>${esc(opts.title)}</h1><p>${esc(opts.subtitle)}</p></div>`;
      }
      html += `
        <section class="lp-section">
          <div class="lp-label">${esc(ui.levelLabel)}</div>
          <div class="lp-level-tabs">${LEVELS.map(function (lv) {
        return `<button type="button" class="lp-tab lp-lv-${lv} ${level === lv ? "active" : ""}" data-level="${lv}">${lv}</button>`;
      }).join("")}</div>
        </section>
        <section class="lp-section">
          <div class="lp-label">${esc(ui.catLabel)}</div>
          <div class="lp-cat-tabs">${CATEGORIES.map(function (c) {
        const active = catId === c.id;
        return `<button type="button" class="lp-cat lp-cat-tone-${c.color} ${active ? "active" : ""}" data-cat="${c.id}">${esc(catLabel(c))}</button>`;
      }).join("")}</div>
        </section>
        <div class="lp-card">
          <div class="lp-card-head">
            <div>${badge(level, catTone(catId))} <strong>${esc(catData.title || catLabel(cat))}</strong>
              ${catData.points ? `<div class="lp-meta">${catData.points.length} ${lang === "fr" ? "points" : "topics"}</div>` : ""}</div>
            <div class="lp-view-toggle">
              <button type="button" class="lp-view-btn ${view === "precis" ? "active" : ""}" data-view="precis">${esc(ui.precisTab)}</button>
              <button type="button" class="lp-view-btn ${view === "exercises" ? "active" : ""}" data-view="exercises">${esc(ui.exTab)}</button>
            </div>
          </div>
          <div class="lp-card-body">`;

      if (view === "precis") {
        html += renderPrecisSearchHtml();
        if (catData.précis || catData.sections) {
          if (catData.cefrNote) {
            html += `<div class="lp-cefr-box"><strong>CECR ${level}</strong> — ${esc(catData.cefrNote)}</div>`;
          }
          html += `<div class="lp-label">${esc(ui.pointsLabel)}</div>
            <p class="lp-points-hint">${esc(ui.pointsHint)}</p>
            <div class="lp-points">${(catData.points || []).map(function (p, pi) {
              return `<button type="button" class="lp-point-chip lp-cat-tone-${catTone(catId)}" data-point-idx="${pi}">${esc(p)}</button>`;
            }).join("")}</div>`;
          if (catData.pointsDetail && catData.pointsDetail.length) {
            html += `<div class="lp-points-detail">`;
            catData.pointsDetail.forEach(function (pd, pi) {
              html += `<div class="lp-point-block" id="lp-point-${pi}">
                <div class="lp-point-block-title">${esc(pd.label)}</div>
                <div class="lp-point-block-body">${formatPointDetailHtml(pd.detail)}</div>
              </div>`;
            });
            html += `</div>`;
          }
        } else {
          html += `<p class="lp-empty">${esc(ui.noPrecis)}</p>`;
        }
      } else {
        if (!exercises) loadExercises();
        html += `<div class="lp-label">${esc(ui.exTypeLabel)}</div>
          <div class="lp-ex-types">${EXERCISE_TYPES.map(function (et) {
          return `<button type="button" class="lp-ex-type ${exFilter === et.id ? "active" : ""}" data-filter="${et.id}">${et.icon} ${esc(typeLabel(et.id))}</button>`;
        }).join("")}</div>
          <div class="lp-ex-content" data-show-corrections="0"></div>`;
      }

      html += `</div></div><footer class="lp-footer">${esc(ui.footer)}</footer></div>`;
      root.innerHTML = html;

      root.querySelectorAll("[data-level]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          navigateForward({ level: btn.dataset.level });
        });
      });
      root.querySelectorAll("[data-cat]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          navigateForward({ category: btn.dataset.cat });
        });
      });
      root.querySelectorAll("[data-view]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          navigateForward({ view: btn.dataset.view });
        });
      });
      root.querySelectorAll("[data-filter]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          exFilter = btn.dataset.filter;
          persistUI({ exerciseType: exFilter });
          render();
        });
      });

      root.querySelectorAll(".lp-point-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var idx = btn.dataset.pointIdx;
          pendingPointScroll = parseInt(idx, 10);
          persistUI({ openPanel: idx });
          scrollToPoint(idx);
        });
      });

      var searchInput = root.querySelector(".lp-precis-search-input");
      if (searchInput) {
        var searchTimer = null;
        searchInput.addEventListener("input", function () {
          clearTimeout(searchTimer);
          searchTimer = setTimeout(function () {
            precisSearch = searchInput.value;
            render();
          }, 220);
        });
        searchInput.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            precisSearch = "";
            render();
          }
        });
        if (document.activeElement !== searchInput && precisSearch) {
          searchInput.focus();
          var len = searchInput.value.length;
          searchInput.setSelectionRange(len, len);
        }
      }

      root.querySelector(".lp-precis-search-clear")?.addEventListener("click", function () {
        precisSearch = "";
        render();
      });

      root.querySelectorAll(".lp-precis-search-hit").forEach(function (btn) {
        btn.addEventListener("click", function () {
          pendingPointScroll = parseInt(btn.dataset.point, 10);
          if (persistence) persistence.markForwardNavigation();
          level = btn.dataset.level;
          catId = btn.dataset.cat;
          exercises = null;
          persistUI({ level: level, category: catId, openPanel: String(pendingPointScroll) });
          render();
          window.scrollTo({ top: 0, behavior: "auto" });
        });
      });

      if (pendingPointScroll != null && view === "precis") {
        var scrollIdx = pendingPointScroll;
        requestAnimationFrame(function () {
          scrollToPoint(scrollIdx);
        });
      }

      if (view === "exercises" && exercises) {
        const showCorr = root.querySelector(".lp-ex-content").dataset.showCorrections === "1";
        renderExercises(root, exercises, ui, exState, exFilter, showCorr);
      }

      if (persistence && persistence.shouldRestoreScroll) {
        persistence.restoreScroll(root);
      }
      if (typeof afterRender === "function") afterRender();
    }

    persistUI();
    render();
  }

  global.initGrammarPlatform = initGrammarPlatform;
  global.GrammarPlatform = { LEVELS: LEVELS, CATEGORIES: CATEGORIES, EXERCISE_TYPES: EXERCISE_TYPES };
})(typeof window !== "undefined" ? window : global);
