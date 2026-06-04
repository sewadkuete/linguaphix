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

    // Optional overrides
    // contactEmail: 'contact@linguaphix.com',
    // siteUrl: 'https://linguaphix.com',
  });
})();
