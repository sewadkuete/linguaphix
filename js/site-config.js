/**
 * Site-wide public config (safe to commit).
 * Supabase + GA: injected at deploy into js/supabase-config.json (CI secrets).
 * Never commit real keys here — copy js/runtime-config.example.json for local shape.
 * Local dev: .env.local + node scripts/write-site-config-local.mjs
 * See docs/CONFIG-SETUP.md
 */
(function initSiteConfig() {
  const defaults = {
    gaMeasurementId: 'G-T9WKL4ZSS6',
    siteUrl: 'https://linguaphix.com',
    phone: {
      display: '+228 92 53 99 53',
      tel: '+22892539953',
      waMe: '22892539953',
    },
    contactEmail: 'contact@linguaphix.com',
    calendlyUrl: 'https://calendly.com/linguaphix/call',
    onlinePlatform: 'Zoom / Google Meet (à confirmer)',
    inPersonAddress: 'Lomé, Togo (adresse à confirmer)',
  };

  window.LINGUAPHIX_CONFIG = Object.assign({}, defaults, window.LINGUAPHIX_CONFIG || {});

  ['supabaseUrl', 'supabaseAnonKey', 'gaMeasurementId', 'turnstileSiteKey'].forEach((key) => {
    const v = window.LINGUAPHIX_CONFIG[key];
    if (typeof v === 'string' && !v.trim()) delete window.LINGUAPHIX_CONFIG[key];
  });

  function configBaseUrl() {
    const cur = document.currentScript;
    if (cur?.src) return new URL('./', cur.src).href;
    const path = (window.location.pathname || '').replace(/\\/g, '/');
    if (/\/services\/[^/]+\.html$/i.test(path)) {
      return new URL('../js/', window.location.href).href;
    }
    return new URL('js/', window.location.href).href;
  }

  function applyLocalConfigPatch(patch) {
    if (patch && typeof patch === 'object') {
      Object.assign(window.LINGUAPHIX_CONFIG, patch);
      ['supabaseUrl', 'supabaseAnonKey', 'gaMeasurementId', 'turnstileSiteKey'].forEach((key) => {
        const v = window.LINGUAPHIX_CONFIG[key];
        if (typeof v === 'string' && !v.trim()) delete window.LINGUAPHIX_CONFIG[key];
      });
    }
    if (isSupabaseConfiguredNow()) window.LINGUAPHIX_CONFIG_READY = true;
    return isSupabaseConfiguredNow();
  }

  function isSupabaseConfiguredNow() {
    const url = String(window.LINGUAPHIX_CONFIG.supabaseUrl || '').trim().replace(/\/$/, '');
    const key = String(window.LINGUAPHIX_CONFIG.supabaseAnonKey || '').trim();
    if (!url || !key) return false;
    if (/YOUR-PROJECT|YOUR_ANON_KEY/i.test(url + key)) return false;
    return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key.length > 20;
  }

  if (isSupabaseConfiguredNow()) {
    window.LINGUAPHIX_CONFIG_READY = true;
  }

  window.LINGUAPHIX_CONFIG_READY_PROMISE = (async function loadRuntimeConfig() {
    const base = configBaseUrl();
    const bust = Date.now();
    const sources = [
      `${base}supabase-config.json?cb=${bust}`,
      `${base}runtime-config.json?cb=${bust}`,
      `${base}site-config.local.json?cb=${bust}`,
    ];

    for (const url of sources) {
      try {
        const res = await fetch(url, {
          cache: 'no-store',
          credentials: 'same-origin',
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) continue;
        const patch = await res.json();
        applyLocalConfigPatch(patch);
      } catch (err) {
        console.warn('[LINGUAPHIX] runtime config fetch failed:', url, err);
      }
    }
    if (isSupabaseConfiguredNow()) window.LINGUAPHIX_CONFIG_READY = true;
    return isSupabaseConfiguredNow();
  })();
})();
