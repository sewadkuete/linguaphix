# Cloudflare Turnstile (form captcha)

All public forms use **Cloudflare Turnstile**: testimonials, contact (email + WhatsApp), and service booking (Calendly + WhatsApp).

## 1. Create a widget (production)

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Open **Turnstile** in the left menu (or search “Turnstile”).
3. Click **Add widget**.
4. **Widget name:** e.g. `LINGUAPHIX forms`
5. **Domains:** add `linguaphix.com` and `www.linguaphix.com` (and `localhost` for local testing if you want).
6. **Widget mode:** Managed (recommended).
7. Create the widget and copy:
   - **Site key** → public, goes in site config
   - **Secret key** → private, for future server-side verification (optional phase 2)

## 2. Configure the site key

### Local development

Add to `.env.local`:

```env
TURNSTILE_SITE_KEY=your-site-key-here
```

Then run:

```bash
node scripts/write-site-config-local.mjs
```

### Production (GitHub Actions)

1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret:** `TURNSTILE_SITE_KEY` = your site key
3. Push to `main` — the deploy workflow injects it into `js/supabase-config.json`

Until a real key is set, the site uses Cloudflare’s **test site key** (`1x00000000000000000000AA`), which always passes and is only suitable for development.

## 3. Cloudflare CSP (required)

Turnstile needs `challenges.cloudflare.com` in your Content-Security-Policy.

After pulling captcha changes, re-apply headers:

```bash
node scripts/apply-cloudflare-security.mjs
```

Or update the CSP manually in the Cloudflare dashboard (see `docs/CLOUDFLARE-SECURITY-HEADERS.md`).

## 4. Verify

1. Open the homepage → Contact → complete the Turnstile widget → submit.
2. Open a service page → Book now → complete widget → Calendly / WhatsApp.
3. Submit a testimonial with the widget completed.

If the widget does not appear, check the browser console and CSP errors for blocked `challenges.cloudflare.com` scripts.
