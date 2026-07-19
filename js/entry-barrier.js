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
    '#lx-entry-btn{position:relative;display:block;width:clamp(200px,46vw,320px);height:clamp(140px,32vw,220px);',
    'background:transparent;border:none;cursor:pointer;padding:0;perspective:900px;',
    'transition:transform .12s ease;animation:lxPress 2.8s ease-in-out infinite}',
    '@keyframes lxPress{0%,14%,100%{transform:translateY(0)}7%{transform:translateY(12px)}}',
    '@media (prefers-reduced-motion: reduce){#lx-entry-btn{animation:none}#lx-entry-btn img{animation:none}}',
    '#lx-entry-btn:hover,#lx-entry-btn:active{animation:none}',
    '#lx-entry-btn:hover{transform:translateY(4px)}',
    '#lx-entry-btn:active{transform:translateY(12px)}',
    /* le logo lui-meme, pose en perspective comme la rondelle, tourne sur lui-meme */
    '#lx-entry-btn img{width:100%;height:100%;object-fit:contain;pointer-events:none;',
    'transform:rotateX(55deg);animation:lxSpin 14s linear infinite;',
    'filter:drop-shadow(0 34px 26px rgba(0,0,0,.45))}',
    '@keyframes lxSpin{from{transform:rotateX(55deg) rotateZ(0)}to{transform:rotateX(55deg) rotateZ(360deg)}}',
    '#lx-entry-text{color:#fff;font-weight:800;font-size:clamp(1.3rem,4vw,2rem);letter-spacing:.03em;margin:0}',
    '#lx-entry-sub{color:rgba(255,255,255,.85);font-weight:600;font-size:clamp(.95rem,2.6vw,1.15rem);margin:0;max-width:34em}',
    '#lx-entry-sub-en{color:rgba(255,255,255,.55);font-weight:600;font-size:clamp(.8rem,2vw,.95rem);margin:0;max-width:40em}'
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
      '<button type="button" id="lx-entry-btn" aria-label="LINGUAPHIX est devenu ASD — continuer vers akuetesd.com">' +
      '<img src="' + root + 'assets/branding/logo-mark-original.png" alt="LINGUAPHIX"></button>' +
      '<p id="lx-entry-text">LINGUAPHIX est devenu ASD</p>' +
      '<p id="lx-entry-sub">Mêmes services, nouvelle adresse — appuyez sur le logo pour continuer</p>' +
      '<p id="lx-entry-sub-en">LINGUAPHIX is now ASD · Same services, new home — press the logo to continue</p>';
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
