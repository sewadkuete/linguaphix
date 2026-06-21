/**
 * Scroll persistence for grammar map pages (FLE / ESL).
 * - Refresh / back-forward: restore saved scroll position.
 * - CEFR level tab change: keep current scroll position.
 * - Topic chip click: page scrolls to the opened panel (handled by toggleSeq).
 */
(function (global) {
  "use strict";

  var KEY = "grammar_scroll::" + location.pathname;

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
    return false;
  }

  function clamp(y) {
    var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(y, max));
  }

  function save() {
    try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (e) {}
  }

  function restore() {
    var raw;
    try { raw = sessionStorage.getItem(KEY); } catch (e) { return; }
    if (raw === null) return;
    var y = parseInt(raw, 10);
    if (isNaN(y) || y <= 0) return;
    y = clamp(y);
    var reduced = false;
    try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    window.scrollTo({ top: y, behavior: reduced || y > 1000 ? "auto" : "smooth" });
  }

  function waitRestore() {
    var start = Date.now();
    var saved = 0;
    try { saved = parseInt(sessionStorage.getItem(KEY) || "0", 10); } catch (e) {}
    if (isNaN(saved) || saved <= 0) return;
    function attempt() {
      if (document.documentElement.scrollHeight >= saved + 80 || Date.now() - start > 3000) {
        restore();
        return;
      }
      requestAnimationFrame(attempt);
    }
    requestAnimationFrame(attempt);
  }

  try { history.scrollRestoration = "manual"; } catch (e) {}
  global.addEventListener("scroll", save, { passive: true });

  global.GrammarScroll = {
    wrapSelectLevel: function (fn) {
      return function (id) {
        var y = global.scrollY;
        fn(id);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            global.scrollTo({ top: y, behavior: "auto" });
            save();
          });
        });
      };
    },
    finishInit: function () {
      if (isRefreshOrBack()) waitRestore();
    }
  };
})(typeof window !== "undefined" ? window : global);
