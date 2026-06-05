# Cloudflare security headers (linguaphix.com)

GitHub Pages does **not** apply the repo `_headers` file. Your site uses **Cloudflare** in front of GitHub Pages, so headers and HTML caching must be configured in Cloudflare.

**Current live status:** security headers are usually **missing** until you complete one of the options below.

---

## Option A — Automated (recommended, ~2 minutes)

### Step 1 — Create a Cloudflare API token

1. Open [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Create Custom Token** with:

| Permission | Access |
|------------|--------|
| Zone → **Transform Rules** → Edit | linguaphix.com |
| Zone → **Cache Rules** → Edit | linguaphix.com |
| Zone → **Zone** → Read | linguaphix.com |

4. Click **Continue to summary** → **Create Token**
5. **Copy the token** (shown once)

### Step 2 — Add token to `.env.local`

Open [.env.local](../.env.local) and add:

```env
CLOUDFLARE_API_TOKEN=paste-your-token-here
# optional if lookup fails:
# CLOUDFLARE_ZONE_ID=your-zone-id
```

Zone ID (optional): Cloudflare → **linguaphix.com** → right column **Zone ID**.

### Step 3 — Run the script

```powershell
cd "c:\Users\ADMIN\OneDrive\Documents\LinguaphixSITE"
node scripts/apply-cloudflare-security.mjs
```

Expected output:

```text
Zone: linguaphix.com (xxxxxxxx)
Updated response headers ruleset …
Updated cache rules ruleset …
Cloudflare rules applied.

Live header check (www.linguaphix.com):
  OK  content-security-policy
  OK  x-frame-options
  OK  strict-transport-security
```

### Step 4 — Verify in PowerShell

```powershell
curl.exe -sI "https://www.linguaphix.com/" | findstr /i "content-security x-frame strict-transport cache-control"
```

---

## Option B — Manual dashboard (if you prefer no API token)

### Part 1 — Security headers (Transform Rule)

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **linguaphix.com**
3. Left menu: **Rules** → **Transform Rules**
4. Tab: **Modify Response Header**
5. Click **+ Create rule**

**Rule name:** `LINGUAPHIX security headers`

**When incoming requests match…** (click **Edit expression**):

```
(http.host eq "linguaphix.com" or http.host eq "www.linguaphix.com")
```

**Then…** → **Set static** — add **six** header rows:

| Header name | Value |
|-------------|--------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Content-Security-Policy` | *(paste the one-line CSP below)* |

**Content-Security-Policy** (copy as one line):

```
default-src 'self'; base-uri 'self'; form-action 'self' https://formsubmit.co; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' blob:; connect-src 'self' https://formsubmit.co https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://calendly.com; object-src 'none'; upgrade-insecure-requests
```

6. Click **Deploy**

---

### Part 2 — Bypass HTML cache (Cache Rule)

Fixes stale pages after deploy.

1. Left menu: **Caching** → **Cache Rules**
2. Click **+ Create rule**

**Rule name:** `LINGUAPHIX bypass cache for HTML`

**When incoming requests match…**:

```
(http.host eq "linguaphix.com" or http.host eq "www.linguaphix.com") and (http.request.uri.path.extension eq "html" or http.request.uri.path eq "/")
```

**Then…** → **Cache eligibility** → **Bypass cache**

3. Click **Deploy**

---

### Part 3 — Bypass cache for `build-version.json` (optional)

1. **Caching** → **Cache Rules** → **+ Create rule**
2. **Rule name:** `LINGUAPHIX bypass build-version.json`
3. **Expression:**

```
(http.host eq "linguaphix.com" or http.host eq "www.linguaphix.com") and ends_with(http.request.uri.path, "build-version.json")
```

4. **Then** → **Bypass cache** → **Deploy**

---

### Part 4 — Verify

Wait 1–2 minutes, then:

```powershell
curl.exe -sI "https://www.linguaphix.com/" | findstr /i "content-security x-frame strict-transport"
```

Open the site in a browser — check Calendly booking, testimonials, contact form, and language toggle still work.

---

## Checklist

- [ ] Security headers rule active (Transform Rules)
- [ ] HTML cache bypass rule active (Cache Rules)
- [ ] `curl` shows `content-security-policy`, `x-frame-options`, `strict-transport-security`
- [ ] Site functions: Calendly, Supabase testimonials, FormSubmit, GA

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Headers still missing after 5 min | Purge cache: **Caching** → **Configuration** → **Purge Everything** |
| Site broken (blocked scripts) | CSP too strict — use the permissive CSP above (`unsafe-inline`) |
| API script “permission denied” | Recreate token with Transform Rules **Edit** + Cache Rules **Edit** |
| HTML still cached 10 min | Confirm cache bypass rule expression matches `.html` and `/` |

---

## Notes

- `'unsafe-inline'` in CSP is required while the site uses inline `onclick` handlers.
- Free Cloudflare plan supports Transform Rules and Cache Rules (limited count).
- Re-run `node scripts/apply-cloudflare-security.mjs` safely — it merges rules by name without deleting your other rules.
