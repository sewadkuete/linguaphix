/**
 * BARRIÈRE D'ENTRÉE — linguaphix est en sommeil derrière cette page verte.
 *
 * Chaque page affiche uniquement le logo en bouton « Press here to enter »,
 * qui redirige vers https://www.akuetesd.com/. Aucune page n'est accessible.
 *
 * ── POUR ROUVRIR LE SITE UN JOUR ─────────────────────────────────────────
 *   Mettre ENABLED à false ci-dessous, commit + push. C'est tout.
 *   (Ou supprimer les balises <script src=".../js/entry-barrier.js"> des pages.)
 * ─────────────────────────────────────────────────────────────────────────
 */
(function () {
  var ENABLED = true; // ← false pour lever la barrière et rouvrir linguaphix
  // Redirection profonde : asd est un clone de linguaphix, la même page existe
  // là-bas — on conserve le chemin, les paramètres et l'ancre.
  var TARGET = 'https://www.akuetesd.com' + location.pathname + location.search + location.hash;
  if (!ENABLED) return;

  // Racine du site déduite de l'URL de ce script (fonctionne à toute profondeur).
  var root = './';
  try {
    var src = document.currentScript && document.currentScript.src;
    if (src) root = src.replace(/js\/entry-barrier\.js.*$/, '');
  } catch (e) {}

  // Style appliqué immédiatement : le contenu du site n'apparaît jamais.
  var css = [
    'html,body{overflow:hidden!important;height:100%!important}',
    'body>*:not(#lx-entry-barrier){display:none!important}',
    '#lx-entry-barrier{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;',
    'background:radial-gradient(120% 120% at 50% 35%,#1a7a3c 0%,#0f4a24 55%,#082b15 100%);',
    "font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;text-align:center;padding:24px}",
    '#lx-entry-btn{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(160px,34vw,240px);height:clamp(160px,34vw,240px);',
    'background:#fff;border:none;border-radius:50%;cursor:pointer;padding:0;overflow:hidden;',
    /* biseau façon rondelle : anneau clair + creux interne + ombre portée */
    'box-shadow:inset 0 0 0 6px #ffffff,inset 0 0 0 10px rgba(0,0,0,.10),inset 0 8px 18px rgba(255,255,255,.9),inset 0 -10px 22px rgba(0,0,0,.18),0 12px 0 rgba(0,0,0,.26),0 26px 60px rgba(0,0,0,.38);',
    'transition:transform .12s ease,box-shadow .12s ease;animation:lxPress 2.8s ease-in-out infinite}',
    '@keyframes lxPress{0%,14%,100%{transform:translateY(0)}7%{transform:translateY(10px)}}',
    '@media (prefers-reduced-motion: reduce){#lx-entry-btn{animation:none}#lx-entry-btn img{animation:none}}',
    '#lx-entry-btn:hover,#lx-entry-btn:active{animation:none}',
    '#lx-entry-btn:hover{transform:translateY(3px)}',
    '#lx-entry-btn:active{transform:translateY(10px)}',
    /* le logo tourne lentement à l'intérieur de la rondelle */
    '#lx-entry-btn img{width:88%;height:88%;object-fit:contain;pointer-events:none;animation:lxSpin 18s linear infinite}',
    '@keyframes lxSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}',
    '#lx-entry-text{color:#fff;font-weight:800;font-size:clamp(1.15rem,3.4vw,1.7rem);letter-spacing:.04em;margin:0}',
    '#lx-entry-sub{color:rgba(255,255,255,.75);font-weight:600;font-size:clamp(.85rem,2.2vw,1rem);margin:0}'
  ].join('');
  var style = document.createElement('style');
  style.id = 'lx-entry-style';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  function go() { window.location.href = TARGET; }

  function build() {
    if (document.getElementById('lx-entry-barrier')) return;
    var wrap = document.createElement('div');
    wrap.id = 'lx-entry-barrier';
    wrap.innerHTML =
      '<button type="button" id="lx-entry-btn" aria-label="Press here to enter">' +
      '<img src="' + root + 'assets/branding/logo-mark-original.png" alt="LINGUAPHIX"></button>' +
      '<p id="lx-entry-text">Press here to enter</p>' +
      '<p id="lx-entry-sub">Appuyez ici pour entrer</p>';
    document.body.appendChild(wrap);
    var btn = document.getElementById('lx-entry-btn');
    btn.addEventListener('click', go);
    btn.focus();
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') go();
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
