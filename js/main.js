/* ═══════════════════════════════════════════════════
   LINGUAPHIX · main.js  v2
   Bilingual FR/EN · Supabase · Admin auth · Floats
═══════════════════════════════════════════════════ */

// ── SUPABASE — remplace par tes vraies clés
const SB_URL  = 'VOTRE_SUPABASE_URL';
const SB_ANON = 'VOTRE_ANON_KEY';

async function sbFetch(path, o = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { 'apikey': SB_ANON, 'Authorization': `Bearer ${SB_ANON}`, 'Content-Type': 'application/json', 'Prefer': o.prefer || '' },
    method: o.method || 'GET',
    body: o.body ? JSON.stringify(o.body) : undefined
  });
  if (!res.ok) throw new Error(await res.text());
  return o.method === 'POST' ? res : res.json();
}

// ═══════════════════════════════════════════
// LANGUAGE
// ═══════════════════════════════════════════
let lang = 'fr';

const ticker = {
  fr: ['Préparation TCF','Coaching IELTS','Coaching TOEFL','Cambridge','TOEIC','Cours FLE & ESL','Cours de Français','Cours d\'Anglais','Traduction Officielle','Montage Vidéo','Design Graphique','Animation de Logo','Production Audiovisuelle','Live Streaming','Soutien Scolaire','Coaching Entretien','Formation Corporate','Cours Individuels','Cours en Groupe'],
  en: ['TCF Preparation','IELTS Coaching','TOEFL Coaching','Cambridge','TOEIC','FLE & ESL Courses','French Courses','English Courses','Official Translation','Video Editing','Graphic Design','Logo Animation','Audiovisual Production','Live Streaming Setup','Academic Support','Interview Coaching','Corporate Training','Individual Classes','Group Classes']
};

function setLang(l) {
  lang = l;
  // Toggle buttons
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
  // Translate all data-fr/data-en elements
  document.querySelectorAll('[data-fr]').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + l) || el.innerHTML;
  });
  // Options
  document.querySelectorAll('select option[data-fr]').forEach(opt => {
    const v = opt.getAttribute('data-' + l); if (v) opt.textContent = v;
  });
  // Placeholders
  document.querySelectorAll('[data-ph-fr]').forEach(el => {
    el.placeholder = el.getAttribute('data-ph-' + l) || '';
  });
  buildTicker(l);
  try { localStorage.setItem('lpx_lang', l); } catch(e) {}
}

function buildTicker(l) {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const items = ticker[l] || ticker.fr;
  track.innerHTML = [...items, ...items].map(i =>
    `<span class="ticker-item"><span class="ticker-dot"></span>${i}</span>`
  ).join('');
}

// ═══════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mob = document.getElementById('mob-menu');

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

  if (burger && mob) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      mob.style.display = open ? 'flex' : 'none';
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mob.style.display = 'none';
    }));
  }
}

// ═══════════════════════════════════════════
// SERVICE TABS
// ═══════════════════════════════════════════
function showSTab(id, btn) {
  document.querySelectorAll('.s-pane').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('on'));
  const pane = document.getElementById('pane-' + id);
  if (pane) pane.style.display = 'grid';
  btn.classList.add('on');
}

// ═══════════════════════════════════════════
// REVEAL ON SCROLL
// ═══════════════════════════════════════════
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ═══════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════
async function loadTestis() {
  try {
    const data = await sbFetch('testimonials?approved=eq.true&order=created_at.desc&select=*');
    const grid  = document.getElementById('t-grid');
    const empty = document.getElementById('t-empty');
    if (!grid) return;
    if (data && data.length > 0) {
      if (empty) empty.style.display = 'none';
      grid.style.display = 'grid';
      grid.innerHTML = data.map(t => {
        const ini = t.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const stars = '★'.repeat(t.rating) + '<span style="color:#ddd">★</span>'.repeat(5 - t.rating);
        return `<div class="t-card reveal">
          <div class="t-stars">${stars}</div>
          ${t.service ? `<span class="t-badge">${t.service}</span>` : ''}
          <div class="t-text">"${t.message}"</div>
          <div class="t-author"><div class="t-av">${ini}</div><div>
            <div class="t-name">${t.name}</div>
            ${t.role ? `<div class="t-role">${t.role}</div>` : ''}
          </div></div>
        </div>`;
      }).join('');
      grid.querySelectorAll('.reveal').forEach(el => {
        new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('in'); }), { threshold: .1 }).observe(el);
      });
    } else {
      if (empty) empty.style.display = 'block';
    }
  } catch (e) {
    console.warn('Supabase not configured:', e.message);
    const empty = document.getElementById('t-empty');
    if (empty) empty.style.display = 'block';
  }
}

// Star picker
let selRating = 0;
function initStars() {
  document.querySelectorAll('.sp').forEach(s => {
    s.addEventListener('mouseover', () => paintStars(+s.dataset.v));
    s.addEventListener('mouseout',  () => paintStars(selRating));
    s.addEventListener('click', () => {
      selRating = +s.dataset.v;
      const ri = document.getElementById('ti-rating');
      if (ri) ri.value = selRating;
      paintStars(selRating);
    });
  });
}
function paintStars(n) {
  document.querySelectorAll('.sp').forEach(s => s.style.color = +s.dataset.v <= n ? '#f5a623' : '#ddd');
}

function toggleTestiForm() {
  const f = document.getElementById('testi-form');
  const btn = document.getElementById('testi-toggle-btn');
  if (!f) return;
  const open = f.style.display !== 'none';
  f.style.display = open ? 'none' : 'block';
  if (btn) btn.textContent = open
    ? (lang === 'fr' ? '✍️ Laisser un témoignage' : '✍️ Leave a review')
    : (lang === 'fr' ? '✕ Fermer' : '✕ Close');
}

async function submitTesti() {
  const name    = document.getElementById('ti-name')?.value.trim();
  const role    = document.getElementById('ti-role')?.value.trim();
  const service = document.getElementById('ti-service')?.value;
  const rating  = +document.getElementById('ti-rating')?.value;
  const msg     = document.getElementById('ti-text')?.value.trim();
  const err     = document.getElementById('ti-err');
  const ok      = document.getElementById('ti-ok');
  const btn     = document.getElementById('ti-btn');
  if (err) err.style.display = 'none';
  if (!name)   { showErr(err, lang === 'fr' ? 'Veuillez entrer votre nom.' : 'Please enter your name.'); return; }
  if (!rating) { showErr(err, lang === 'fr' ? 'Sélectionnez une note.' : 'Please select a rating.'); return; }
  if (!msg)    { showErr(err, lang === 'fr' ? 'Écrivez votre témoignage.' : 'Please write your review.'); return; }
  if (btn) { btn.disabled = true; btn.textContent = lang === 'fr' ? 'Envoi…' : 'Sending…'; }
  try {
    await sbFetch('testimonials', { method: 'POST', prefer: 'return=minimal', body: { name, role, service, rating, message: msg, approved: false } });
    if (ok) ok.style.display = 'block';
    ['ti-name','ti-role','ti-text'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const sv = document.getElementById('ti-service'); if (sv) sv.value = '';
    const rv = document.getElementById('ti-rating'); if (rv) rv.value = '0';
    selRating = 0; paintStars(0);
  } catch(e) {
    showErr(err, lang === 'fr' ? 'Erreur d\'envoi. Contactez-moi via WhatsApp.' : 'Error. Please contact me via WhatsApp.');
  }
  if (btn) { btn.disabled = false; btn.textContent = lang === 'fr' ? 'Publier mon témoignage' : 'Publish my review'; }
}

function showErr(el, msg) { if (!el) return; el.textContent = msg; el.style.display = 'block'; }

// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════
function handleContact(e) {
  e.preventDefault();
  const btn = document.getElementById('cf-btn');
  if (btn) {
    btn.textContent = lang === 'fr' ? '✅ Message envoyé !' : '✅ Message sent!';
    btn.style.background = '#2d9e56';
    setTimeout(() => { btn.textContent = lang === 'fr' ? 'Envoyer ✈️' : 'Send ✈️'; btn.style.background = ''; }, 3200);
  }
}

// ═══════════════════════════════════════════
// PAYMENT — ADMIN ONLY
// ═══════════════════════════════════════════
let adminSess = null;

function showAdminLogin() {
  if (adminSess) { doSignOut(); return; }
  if (document.getElementById('admin-modal')) { document.getElementById('admin-modal').remove(); return; }
  const m = document.createElement('div');
  m.id = 'admin-modal';
  m.className = 'admin-modal-bg';
  m.innerHTML = `<div class="admin-modal-box">
    <button class="admin-modal-close" onclick="document.getElementById('admin-modal').remove()">✕</button>
    <h3>🔐 Espace admin</h3>
    <p>Connexion Supabase — paiements</p>
    <input id="am-email" type="email" placeholder="Email admin">
    <input id="am-pw"    type="password" placeholder="Mot de passe">
    <div id="am-err" style="display:none;font-size:12px;color:#c0392b;margin-bottom:10px;"></div>
    <button class="btn btn-g" onclick="doAdminLogin()" style="width:100%;justify-content:center;" data-fr="Se connecter" data-en="Log in">Se connecter</button>
  </div>`;
  document.body.appendChild(m);
  m.addEventListener('click', ev => { if (ev.target === m) m.remove(); });
  setTimeout(() => document.getElementById('am-email')?.focus(), 80);
}

async function doAdminLogin() {
  const email = document.getElementById('am-email')?.value.trim();
  const pw    = document.getElementById('am-pw')?.value;
  const errEl = document.getElementById('am-err');
  const btn   = document.querySelector('#admin-modal .btn');
  if (!email || !pw) { showErr(errEl, 'Remplissez tous les champs.'); return; }
  if (btn) { btn.textContent = 'Connexion…'; btn.disabled = true; }
  try {
    const res = await fetch(SB_URL + '/auth/v1/token?grant_type=password', {
      method: 'POST', headers: { 'apikey': SB_ANON, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pw })
    });
    const data = await res.json();
    if (data.access_token) {
      adminSess = data;
      document.getElementById('admin-modal')?.remove();
      const eb = document.getElementById('pay-edit-btn');
      if (eb) eb.style.display = 'flex';
      const kb = document.getElementById('admin-key');
      if (kb) { kb.textContent = '🔓'; kb.title = lang === 'fr' ? 'Admin connecté' : 'Admin connected'; }
    } else {
      showErr(errEl, data.error_description || 'Identifiants incorrects.');
      if (btn) { btn.textContent = lang === 'fr' ? 'Se connecter' : 'Log in'; btn.disabled = false; }
    }
  } catch(e) {
    showErr(errEl, 'Erreur réseau.');
    if (btn) { btn.textContent = lang === 'fr' ? 'Se connecter' : 'Log in'; btn.disabled = false; }
  }
}

async function doSignOut() {
  if (!adminSess) return;
  try { await fetch(SB_URL + '/auth/v1/logout', { method: 'POST', headers: { 'apikey': SB_ANON, 'Authorization': 'Bearer ' + adminSess.access_token } }); } catch(e) {}
  adminSess = null;
  const eb = document.getElementById('pay-edit-btn');
  if (eb) eb.style.display = 'none';
  const pb = document.getElementById('pay-edit-panel');
  if (pb) pb.style.display = 'none';
  const kb = document.getElementById('admin-key');
  if (kb) { kb.textContent = '🔑'; kb.title = 'Admin'; }
}

function togglePayEdit() {
  const p = document.getElementById('pay-edit-panel');
  const b = document.getElementById('pay-edit-btn');
  if (!p) return;
  const open = p.style.display !== 'none';
  p.style.display = open ? 'none' : 'block';
  if (b) b.textContent = open ? '✏️ Modifier' : '✕ Fermer';
}

function updatePayDetails() {
  const mn = document.getElementById('pay-mixx')?.value || '92 53 99 53';
  ['pay-mixx-1','pay-mixx-2'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = mn; });
  const pp = document.getElementById('pay-pp')?.value.trim();
  const ppR = document.getElementById('paypal-row');
  const ppD = document.getElementById('paypal-display');
  if (ppR) { ppR.style.display = pp ? 'flex' : 'none'; if (ppD && pp) ppD.innerHTML = `<a href="https://paypal.me/${pp}" target="_blank" style="color:#003087">${pp}</a>`; }
  const bn = document.getElementById('pay-bank')?.value.trim();
  const ib = document.getElementById('pay-iban')?.value.trim();
  const bR = document.getElementById('bank-row');
  const bN = document.getElementById('bank-name-display');
  const iD = document.getElementById('iban-display');
  if (bR) { bR.style.display = (bn || ib) ? 'flex' : 'none'; if (bN && bn) bN.textContent = bn; if (iD && ib) iD.textContent = ib; }
}

// ═══════════════════════════════════════════
// FLOATING LOGOS
// ═══════════════════════════════════════════
function injectFloats() {
  const configs = [
    { id: 'hero',         size: 360, top: '8%',  right: '3%',  op: .07, dur: '11s', delay: '0s',   r0: '-5deg', r1: '4deg',  r2: '-3deg', flt: 'brightness(1.6)' },
    { id: 'services',     size: 130, bottom: '6%', left: '1.5%', op: .10, dur: '7s',  delay: '1.5s', r0: '3deg',  r1: '-6deg', r2: '4deg',  flt: 'none' },
    { id: 'about',        size: 210, top: '6%',  right: '2%',  op: .09, dur: '9s',  delay: '3s',   r0: '6deg',  r1: '-3deg', r2: '5deg',  flt: 'none' },
  ];
  configs.forEach(cfg => {
    const sec = document.getElementById(cfg.id);
    if (!sec) return;
    const el = document.createElement('div');
    el.className = 'float-logo';
    el.style.cssText = [
      `width:${cfg.size}px`, `height:${cfg.size}px`,
      cfg.top    ? `top:${cfg.top}`       : `bottom:${cfg.bottom}`,
      cfg.right  ? `right:${cfg.right}`   : `left:${cfg.left}`,
      `--op:${cfg.op}`, `--dur:${cfg.dur}`, `--delay:${cfg.delay}`,
      `--r0:${cfg.r0}`, `--r1:${cfg.r1}`, `--r2:${cfg.r2}`, `--flt:${cfg.flt}`,
    ].join(';');
    const img = document.createElement('img');
    img.src = 'images/logo-round.png';
    img.alt = '';
    img.style.cssText = `width:100%;height:100%;border-radius:50%;opacity:${cfg.op};filter:${cfg.flt}`;
    el.appendChild(img);
    if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
    sec.appendChild(el);
  });
}

// ═══════════════════════════════════════════
// GALAXY VERSION MODAL
// ═══════════════════════════════════════════
function openGalaxy() {
  const modal = document.getElementById('galaxy-modal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGalaxy() {
  const modal = document.getElementById('galaxy-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Restore language
  try { const s = localStorage.getItem('lpx_lang'); setLang(s === 'en' ? 'en' : 'fr'); }
  catch(e) { setLang('fr'); }

  initNav();
  initReveal();
  initStars();
  loadTestis();
  injectFloats();

  // Admin pay button hidden by default
  const eb = document.getElementById('pay-edit-btn');
  if (eb) eb.style.display = 'none';

  // Galaxy modal keyboard close
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGalaxy(); });
});
