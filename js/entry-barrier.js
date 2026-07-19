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
    '#lx-entry-btn{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(170px,42vw,260px);height:clamp(170px,42vw,260px);',
    'background:transparent;border:none;outline:none;cursor:pointer;padding:0;',
    'transition:transform .12s ease;animation:lxPress 2.8s ease-in-out infinite}',
    '#lx-entry-btn:focus,#lx-entry-btn:focus-visible{outline:none}',
    '@keyframes lxPress{0%,14%,100%{transform:translateY(0)}7%{transform:translateY(12px)}}',
    '@media (prefers-reduced-motion: reduce){#lx-entry-btn{animation:none}#lx-entry-btn img{animation:none}}',
    '#lx-entry-btn:hover,#lx-entry-btn:active{animation:none}',
    '#lx-entry-btn:hover{transform:translateY(4px)}',
    '#lx-entry-btn:active{transform:translateY(12px)}',
    /* ombre au sol (fixe) ; le logo garde sa forme normale et tourne a plat */
    '#lx-entry-btn::after{content:"";position:absolute;left:50%;bottom:-7%;transform:translateX(-50%);width:70%;height:15%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0));z-index:0}',
    '#lx-entry-btn img{position:relative;z-index:1;width:100%;height:100%;object-fit:contain;pointer-events:none;',
    'animation:lxSpin 14s linear infinite;filter:drop-shadow(0 8px 12px rgba(0,0,0,.3))}',
    '@keyframes lxSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}',
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
