# GitHub + Supabase configuration

This guide wires **testimonials** (Supabase), optional **Google Analytics**, and **GitHub Pages** deployment without committing secrets.

## Overview

| File | Committed? | Purpose |
|------|------------|---------|
| `js/site-config.js` | Yes | Public defaults (phone, Calendly, placeholder GA id) |
| `js/site-config.local.example.js` | Yes | Template to copy |
| `js/site-config.local.js` | **No** (gitignored) | Your Supabase URL, anon key, real GA id |
| `.env.local` | **No** | Optional source for the write script |
| `docs/supabase-rls.sql` | Yes | Row-level security for `testimonials` |

All pages load `site-config.js` then `site-config.local.js`. If the local file is missing, the site still runs; testimonials stay disabled until Supabase is configured.

---

## 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste and run **`docs/supabase-rls.sql`**.
3. Open **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`  
   Never use the `service_role` key in the browser.

### Table check

Table `public.testimonials` columns: `name`, `service`, `rating`, `message`, `location`, `approved` (default `false`).

New submissions stay hidden until you set `approved = true` in the Supabase dashboard.

---

## 2. Local secrets (choose one method)

### Method A — copy the example file

```powershell
copy js\site-config.local.example.js js\site-config.local.js
```

Edit `js/site-config.local.js` with your real `supabaseUrl`, `supabaseAnonKey`, and `gaMeasurementId`.

### Method B — `.env.local` + script

```powershell
copy .env.example .env.local
# Edit .env.local with your values
node scripts/write-site-config-local.mjs
```

Preview the site (`npx serve .` or `python -m http.server 8080`), submit a test testimonial, then approve it in Supabase.

---

## 3. GitHub repository

1. Create a repo (e.g. `linguaphix-site`) and push this folder.
2. On GitHub: **Settings → Secrets and variables → Actions → New repository secret**:

| Secret name | Value |
|-------------|--------|
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | anon key (long JWT) |
| `GA_MEASUREMENT_ID` | optional, e.g. `G-ABC123XYZ` |

3. Enable **Pages**: **Settings → Pages → Build and deployment → GitHub Actions**.

4. Push to `main`. Workflow **Deploy GitHub Pages** runs `write-site-config-local.mjs` with secrets, then publishes the site.

Custom domain: set in Pages settings and point DNS; update `siteUrl` in `site-config.js` if needed.

---

## 4. FormSubmit (contact form)

Contact email defaults to `contact@linguaphix.com` in `site-config.js`. First real submission triggers FormSubmit’s activation email to that inbox.

Override via `contactEmail` in `site-config.local.js` or `CONTACT_EMAIL` in `.env.local`.

---

## 5. Checklist before go-live

- [ ] `docs/supabase-rls.sql` executed in Supabase
- [ ] `js/site-config.local.js` works locally OR GitHub secrets set for deploy
- [ ] Test testimonial submits and appears only after `approved = true`
- [ ] `gaMeasurementId` set (or left placeholder to disable tracking)
- [ ] `robots.txt` / `sitemap.xml` at site root (see `docs/GOOGLE-ANALYTICS-SEO.md`)
- [ ] FormSubmit activation link clicked for `contact@linguaphix.com`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| “Online submission will be enabled soon” | `supabaseUrl` / `supabaseAnonKey` missing or still placeholders |
| Testimonials never load | No rows with `approved = true` |
| Submit returns connection error | Wrong URL/key, RLS policies not applied, or ad-blocker blocking `*.supabase.co` |
| `site-config.local.js` 404 in console | Normal until you create the file; copy from example or run the write script |
| GA not tracking | Set a real `G-…` id; placeholder `G-XXXXXXXXXX` is ignored by `analytics.js` |
