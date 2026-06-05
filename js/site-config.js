/**
 * Site-wide public config (safe to commit).
 * Secrets: generated at deploy into site-config.local.json / .js (gitignored).
 * See docs/CONFIG-SETUP.md
 */
(function initSiteConfig() {
  const defaults = {
    gaMeasurementId: 'G-XXXXXXXXXX',
    siteUrl: 'https://linguaphix.com',
    phone: {
      display: '+228 92 53 99 53',
      tel: '+22892539953',
      waMe: '22892539953',
    },
    contactEmail: 'contact@linguaphix.com',
    supabaseUrl: '',
    supabaseAnonKey: '',
    calendlyUrl: 'https://calendly.com/linguaphix/call',
    onlinePlatform: 'Zoom / Google Meet (à confirmer)',
    inPersonAddress: 'Lomé, Togo (adresse à confirmer)',
  };

  window.LINGUAPHIX_CONFIG = Object.assign({}, defaults, window.LINGUAPHIX_CONFIG || {});

  ['supabaseUrl', 'supabaseAnonKey', 'gaMeasurementId'].forEach((key) => {
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

  async function applyLocalConfigPatch(patch) {
    if (!patch || typeof patch !== 'object') return false;
    Object.assign(window.LINGUAPHIX_CONFIG, patch);
    ['supabaseUrl', 'supabaseAnonKey', 'gaMeasurementId'].forEach((key) => {
      const v = window.LINGUAPHIX_CONFIG[key];
      if (typeof v === 'string' && !v.trim()) delete window.LINGUAPHIX_CONFIG[key];
    });
    window.LINGUAPHIX_CONFIG_READY = true;
    return isSupabaseConfiguredNow();
  }

  function isSupabaseConfiguredNow() {
    const url = String(window.LINGUAPHIX_CONFIG.supabaseUrl || '').trim().replace(/\/$/, '');
    const key = String(window.LINGUAPHIX_CONFIG.supabaseAnonKey || '').trim();
    if (!url || !key) return false;
    if (/YOUR-PROJECT|YOUR_ANON_KEY/i.test(url + key)) return false;
    return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key.length > 20;
  }

  window.LINGUAPHIX_CONFIG_READY_PROMISE = (async function loadLocalSiteConfig() {
    const base = configBaseUrl();
    const bust = Date.now();
    const sources = [
      { kind: 'json', url: `${base}site-config.local.json?cb=${bust}` },
      { kind: 'js', url: `${base}site-config.local.js?cb=${bust}` },
    ];

    for (const source of sources) {
      try {
        const res = await fetch(source.url, {
          cache: 'no-store',
          credentials: 'same-origin',
          headers: { Accept: source.kind === 'json' ? 'application/json' : 'text/javascript,*/*' },
        });
        if (!res.ok) continue;

        if (source.kind === 'json') {
          const patch = await res.json();
          if (await applyLocalConfigPatch(patch)) return true;
          continue;
        }

        const code = await res.text();
        if (!code.trim()) continue;
        // eslint-disable-next-line no-new-func
        new Function(code)();
        if (window.LINGUAPHIX_CONFIG_READY || isSupabaseConfiguredNow()) {
          window.LINGUAPHIX_CONFIG_READY = true;
          return true;
        }
      } catch (err) {
        console.warn('[LINGUAPHIX] local config fetch failed:', source.url, err);
      }
    }
    return false;
  })();
})();
