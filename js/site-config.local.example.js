/**
 * Copy this file to site-config.local.js (gitignored) and fill in your values.
 * Do not commit site-config.local.js or paste service_role keys here.
 *
 *   copy js\site-config.local.example.js js\site-config.local.js
 *
 * Or use .env.local + node scripts/write-site-config-local.mjs
 */
(function applyLocalSiteConfig() {
  if (!window.LINGUAPHIX_CONFIG) window.LINGUAPHIX_CONFIG = {};

  Object.assign(window.LINGUAPHIX_CONFIG, {
    // Google Analytics — https://analytics.google.com → Admin → Data streams
    gaMeasurementId: 'G-XXXXXXXXXX',

    // Supabase — Project Settings → API (anon / public key only)
    supabaseUrl: 'https://YOUR-PROJECT-REF.supabase.co',
    supabaseAnonKey: 'YOUR_ANON_KEY_HERE',

    // Cloudflare Turnstile — dash.cloudflare.com → Turnstile (see docs/TURNSTILE.md)
    // turnstileSiteKey: 'your-site-key',

    // Optional overrides
    // contactEmail: 'contact@linguaphix.com',
    // siteUrl: 'https://www.linguaphix.com',
    // onlinePlatformFr: 'Zoom / Google Meet (à confirmer)',
    // onlinePlatformEn: 'Zoom / Google Meet (TBD)',
    // inPersonAddressFr: 'Lomé, Togo (adresse à confirmer)',
    // inPersonAddressEn: 'Lomé, Togo (address to be confirmed)',
  });
})();
