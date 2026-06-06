# LINGUAPHIX Website

Marketing site for LINGUAPHIX — languages, translation, and creative design services.

## Project structure

```
LinguaphixSITE/
├── index.html      # Main page
├── policy.html     # Privacy & general policy (standalone)
├── portfolio.html  # Video & graphic design portfolio
├── assets/branding/   # Logo files (PNG master + SVG for UI)
├── assets/portfolio/  # Images and videos for portfolio.html
├── css/style.css   # Styles
├── js/app.js           # i18n, forms, Supabase hooks
├── js/locale-pricing.js # bilingual selects + geo currency
└── scripts/        # Build helper (split-html.mjs)
```

## Local preview

From this folder:

```bash
npx --yes serve .
```

Then open `http://localhost:3000` (or the port shown).

Or with Python:

```bash
python -m http.server 8080
```

## Portfolio

Open `portfolio.html` to manage video and graphic work. Copy the HTML blocks in that file for each new project, or follow `assets/portfolio/README.md` for file paths and embed URLs.

## Contact questions (email)

The **Posez votre question** form posts to `contact@linguaphix.com` via [FormSubmit](https://formsubmit.co) (works on mobile and desktop). On first real submission, FormSubmit sends a confirmation link to that inbox — click it to activate delivery.

## Configuration (Supabase, GA, GitHub Pages)

Full setup: **[docs/CONFIG-SETUP.md](docs/CONFIG-SETUP.md)**

Quick start:

1. Run `docs/supabase-rls.sql` in your Supabase SQL editor.
2. Copy `js/site-config.local.example.js` → `js/site-config.local.js` and add your **Project URL** + **anon** key (or use `.env.local` + `node scripts/write-site-config-local.mjs`).
3. Push to GitHub `main` with Actions secrets `SUPABASE_URL` and `SUPABASE_ANON_KEY` for production deploy (see `.github/workflows/deploy-pages.yml`).
4. Add **Cloudflare Turnstile** for form captcha: **[docs/TURNSTILE.md](docs/TURNSTILE.md)** (`TURNSTILE_SITE_KEY` GitHub secret).

Testimonials show only **approved** Supabase rows; no sample reviews in HTML.

## Google Analytics & SEO

Full setup steps: **[docs/GOOGLE-ANALYTICS-SEO.md](docs/GOOGLE-ANALYTICS-SEO.md)**

Quick start:

1. GA4 is configured (`G-T9WKL4ZSS6` in `js/site-config.js`); override locally in `js/site-config.local.js` if needed.
2. `robots.txt` and `sitemap.xml` are at the site root (live on `https://www.linguaphix.com/`).
3. Verify in [Google Search Console](https://search.google.com/search-console) and submit `https://www.linguaphix.com/sitemap.xml`.

## Before going live

1. Complete the checklist in `docs/GOOGLE-ANALYTICS-SEO.md`.
2. Set Supabase keys in `js/site-config.local.js` (see `docs/CONFIG-SETUP.md`).
3. Brand assets: `assets/branding/` (`logo-full.png` on portfolio/policy pages).
4. Point DNS to this static folder (Netlify, Vercel, GitHub Pages, etc.).

## Regenerate from single HTML

If you update `linguaphix-website.html` in Downloads:

```bash
node scripts/split-html.mjs "path/to/linguaphix-website.html"
```
