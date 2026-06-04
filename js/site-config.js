/**
 * Site-wide public config (safe to commit).
 * Secrets / live keys: copy js/site-config.local.example.js → js/site-config.local.js
 * or run: node scripts/write-site-config-local.mjs (reads .env.local)
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

  /** Strip empty strings so app.js fallbacks detect “not configured”. */
  ['supabaseUrl', 'supabaseAnonKey', 'gaMeasurementId'].forEach((key) => {
    const v = window.LINGUAPHIX_CONFIG[key];
    if (typeof v === 'string' && !v.trim()) delete window.LINGUAPHIX_CONFIG[key];
  });
})();
