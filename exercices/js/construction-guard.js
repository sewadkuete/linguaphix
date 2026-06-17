/**
 * Construction guard for the interactive grammar section.
 *
 * In PRODUCTION it intercepts the visitor with a full-screen "under
 * construction" barrier so the interactive grammar pages cannot be used yet.
 *
 * It is bypassed automatically when working LOCALLY (localhost, 127.0.0.1,
 * file://, *.local, private LAN ranges) so the section can still be developed
 * and corrected before the barrier is removed.
 *
 * Manual override (e.g. to preview on the live site):
 *   add ?grammardev=1 to the URL to unlock (persists via localStorage),
 *   add ?grammardev=0 to re-lock.
 *
 * To remove the barrier permanently once the section is ready, simply remove
 * the <script src=".../construction-guard.js"> tags from the grammar pages.
 */
(function () {
  "use strict";

  function isLocalHost() {
    if (location.protocol === "file:") return true;
    var h = (location.hostname || "").toLowerCase();
    if (!h) return true;
    if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0" || h === "::1") return true;
    if (/(^|\.)local$/.test(h)) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^10\./.test(h)) return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
    return false;
  }

  function devBypass() {
    try {
      var p = new URLSearchParams(location.search);
      var flag = p.get("grammardev");
      if (flag === "1") localStorage.setItem("lx_grammar_dev", "1");
      else if (flag === "0") localStorage.removeItem("lx_grammar_dev");
      return localStorage.getItem("lx_grammar_dev") === "1";
    } catch (e) {
      return false;
    }
  }

  if (isLocalHost() || devBypass()) return;

  function backHref() {
    return /\/exercices\/(fle|esl)\//.test(location.pathname) ? "../../index.html" : "../index.html";
  }

  function buildGate() {
    if (document.querySelector(".lx-construction-gate")) return;

    var lang = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
    var fr = lang !== "en";
    var T = {
      title: fr ? "Grammaire interactive en construction" : "Interactive grammar under construction",
      msg: fr
        ? "Cette section est en cours de finalisation et sera disponible très bientôt. Merci de votre patience !"
        : "This section is being finalised and will be available very soon. Thanks for your patience!",
      back: fr ? "← Retour au site LINGUAPHIX" : "← Back to LINGUAPHIX"
    };

    var gate = document.createElement("div");
    gate.className = "lx-construction-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.innerHTML =
      '<div class="lx-construction-gate-card">' +
        '<div class="lx-construction-gate-icon" aria-hidden="true">🚧</div>' +
        '<h1></h1>' +
        '<p></p>' +
        '<a class="lx-construction-gate-back"></a>' +
      '</div>';
    gate.querySelector("h1").textContent = T.title;
    gate.querySelector("p").textContent = T.msg;
    var back = gate.querySelector(".lx-construction-gate-back");
    back.textContent = T.back;
    back.href = backHref();

    document.documentElement.classList.add("lx-gated");
    document.body.appendChild(gate);
  }

  if (document.body) buildGate();
  else document.addEventListener("DOMContentLoaded", buildGate);
})();
