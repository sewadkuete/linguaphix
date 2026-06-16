/**
 * Grammar UI state + scroll persistence (vanilla JS).
 * sessionStorage: scroll, openPanel, exerciseType (session)
 * localStorage: level, category, view (durable)
 * URL search params: primary source (U6)
 */
(function (global) {
  "use strict";

  var SCROLL_KEY = "grammar_scroll";
  var UI_KEY = "grammar_ui";
  var DEFAULTS = {
    level: "A1",
    category: "nom",
    view: "precis",
    exerciseType: "all",
    openPanel: null
  };

  var LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var CATEGORIES = ["nom", "verb", "adj", "pron", "adv", "disc", "num"];
  var VIEWS = ["precis", "exercises"];
  var EX_TYPES = ["all", "gap", "mcq", "matching", "flashcard", "transform"];

  function tryGet(storage, key) {
    try { return storage.getItem(key); } catch (e) { return null; }
  }

  function trySet(storage, key, value) {
    try { storage.setItem(key, value); } catch (e) {
      if (e && e.name === "QuotaExceededError" && storage === sessionStorage) {
        try {
          Object.keys(sessionStorage).forEach(function (k) {
            if (k.indexOf(SCROLL_KEY) === 0) sessionStorage.removeItem(k);
          });
          storage.setItem(key, value);
        } catch (e2) {}
      }
    }
  }

  function pageScrollKey(pathname, search) {
    return SCROLL_KEY + "::" + pathname + "::" + search;
  }

  function clampScroll(y) {
    var doc = document.documentElement;
    var max = Math.max(0, doc.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(y, max));
  }

  function isRefreshOrBack() {
    try {
      var nav = performance.getEntriesByType("navigation");
      if (nav && nav[0]) {
        return nav[0].type === "reload" || nav[0].type === "back_forward";
      }
    } catch (e) {}
    try {
      var t = performance.navigation && performance.navigation.type;
      return t === 1 || t === 2;
    } catch (e2) {}
    return true;
  }

  function sanitize(val, allowed, fallback) {
    return allowed.indexOf(val) >= 0 ? val : fallback;
  }

  function readUIState() {
    var params = new URLSearchParams(location.search);
    var fromStorage = {};
    try {
      var raw = localStorage.getItem(UI_KEY);
      if (raw) fromStorage = JSON.parse(raw);
    } catch (e) {}

    var sessionRaw = {};
    try {
      var sraw = sessionStorage.getItem(UI_KEY + "_session");
      if (sraw) sessionRaw = JSON.parse(sraw);
    } catch (e2) {}

    var merged = Object.assign({}, DEFAULTS, fromStorage, sessionRaw, {
      level: params.get("level") || undefined,
      category: params.get("category") || undefined,
      view: params.get("view") || undefined,
      exerciseType: params.get("exerciseType") || undefined,
      openPanel: params.has("openPanel") ? params.get("openPanel") : undefined
    });

    merged.level = sanitize(merged.level, LEVELS, DEFAULTS.level);
    merged.category = sanitize(merged.category, CATEGORIES, DEFAULTS.category);
    merged.view = sanitize(merged.view, VIEWS, DEFAULTS.view);
    merged.exerciseType = sanitize(merged.exerciseType, EX_TYPES, DEFAULTS.exerciseType);
    if (merged.openPanel === "null" || merged.openPanel === "") merged.openPanel = null;

    return merged;
  }

  function writeUIState(updates, opts) {
    opts = opts || {};
    var current = readUIState();
    var next = Object.assign({}, current, updates);

    var durable = {
      level: next.level,
      category: next.category,
      view: next.view
    };
    try { localStorage.setItem(UI_KEY, JSON.stringify(durable)); } catch (e) {}

    var session = {
      exerciseType: next.exerciseType,
      openPanel: next.openPanel
    };
    trySet(sessionStorage, UI_KEY + "_session", JSON.stringify(session));

    if (!opts.skipUrl) {
      var params = new URLSearchParams(location.search);
      params.set("level", next.level);
      params.set("category", next.category);
      params.set("view", next.view);
      if (next.exerciseType && next.exerciseType !== "all") {
        params.set("exerciseType", next.exerciseType);
      } else {
        params.delete("exerciseType");
      }
      if (next.openPanel != null && next.openPanel !== "") {
        params.set("openPanel", String(next.openPanel));
      } else {
        params.delete("openPanel");
      }
      var qs = params.toString();
      var url = location.pathname + (qs ? "?" + qs : "");
      history.replaceState(null, "", url);
    }

    return next;
  }

  function saveScrollPosition() {
    var y = window.scrollY;
    trySet(sessionStorage, pageScrollKey(location.pathname, location.search), String(y));
  }

  function restoreScrollPosition(onDone) {
    var saved = tryGet(sessionStorage, pageScrollKey(location.pathname, location.search));
    if (saved === null) { if (onDone) onDone(); return; }
    var y = parseInt(saved, 10);
    if (isNaN(y) || y === 0) { if (onDone) onDone(); return; }

    y = clampScroll(y);
    var prefersReduced = false;
    try {
      prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}
    var behavior = prefersReduced || y > 1000 ? "auto" : "smooth";

    function doScroll() {
      window.scrollTo({ top: y, behavior: behavior });
      if (onDone) onDone();
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(doScroll);
    });
  }

  function waitForContentThenRestore(container, savedY, onDone) {
    var start = Date.now();
    var timeout = 3000;
    savedY = clampScroll(savedY);

    function attempt() {
      var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (document.documentElement.scrollHeight >= savedY + 100 || Date.now() - start > timeout) {
        var y = Math.min(savedY, max);
        var prefersReduced = false;
        try {
          prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        } catch (e) {}
        var behavior = prefersReduced || y > 1000 ? "auto" : "smooth";
        window.scrollTo({ top: y, behavior: behavior });
        if (onDone) onDone();
        return;
      }
      requestAnimationFrame(attempt);
    }

    if (container && typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () { attempt(); });
      ro.observe(container);
      setTimeout(function () { ro.disconnect(); attempt(); }, timeout);
    } else {
      requestAnimationFrame(attempt);
    }
  }

  var scrollBound = false;
  var allowRestore = true;

  function initPersistence(opts) {
    opts = opts || {};
    try { history.scrollRestoration = "manual"; } catch (e) {}

    allowRestore = opts.forwardNavigation ? false : isRefreshOrBack();

    if (!scrollBound) {
      window.addEventListener("scroll", saveScrollPosition, { passive: true });
      window.addEventListener("popstate", function () {
        allowRestore = true;
        var state = readUIState();
        if (opts.onPopState) opts.onPopState(state);
      });
      scrollBound = true;
    }

    return {
      shouldRestoreScroll: allowRestore,
      restoreScroll: function (container) {
        if (!allowRestore) return;
        var saved = tryGet(sessionStorage, pageScrollKey(location.pathname, location.search));
        if (saved === null) return;
        var y = parseInt(saved, 10);
        if (isNaN(y) || y === 0) return;
        waitForContentThenRestore(container, y);
      },
      markForwardNavigation: function () {
        allowRestore = false;
        trySet(sessionStorage, pageScrollKey(location.pathname, location.search), "0");
      }
    };
  }

  global.GrammarUIState = {
    DEFAULTS: DEFAULTS,
    read: readUIState,
    write: writeUIState,
    saveScroll: saveScrollPosition,
    restoreScroll: restoreScrollPosition,
    initPersistence: initPersistence,
    isRefreshOrBack: isRefreshOrBack
  };
})(typeof window !== "undefined" ? window : global);
