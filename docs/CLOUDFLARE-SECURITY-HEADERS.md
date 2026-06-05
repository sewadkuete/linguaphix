# Cloudflare security headers (linguaphix.com)

GitHub Pages does **not** apply the repo `_headers` file. Your site is proxied through **Cloudflare**, so headers must be set in the Cloudflare dashboard.

## 1. Open Cloudflare

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select the **linguaphix.com** zone
3. Go to **Rules** → **Transform Rules** → **Modify Response Header**

## 2. Create one rule — “LINGUAPHIX security headers”

| Field | Value |
|-------|--------|
| **Rule name** | `LINGUAPHIX security headers` |
| **When** | `Hostname equals linguaphix.com` **OR** `Hostname equals www.linguaphix.com` |
| **Then** | Set static response headers (add each row below) |

### Headers to set

| Header name | Value |
|-------------|--------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |

### Content-Security-Policy (permissive starter)

Copy as **one line** (no line breaks):

```
default-src 'self'; base-uri 'self'; form-action 'self' https://formsubmit.co; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' blob:; connect-src 'self' https://formsubmit.co https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://calendly.com; object-src 'none'; upgrade-insecure-requests
```

`'unsafe-inline'` is required today because the site uses inline scripts and `onclick` handlers. Tighten later by moving handlers into external JS.

## 3. Cache rules (fixes stale HTML after deploy)

Go to **Caching** → **Cache Rules** → **Create rule**

| Field | Value |
|-------|--------|
| **Rule name** | `Bypass cache for HTML` |
| **When** | URI Path contains `.html` **OR** URI Path equals `/` |
| **Then** | Cache eligibility → **Bypass cache** |

Optional second rule for `build-version.json`:

| When | URI Path contains `build-version.json` |
| Then | Bypass cache |

## 4. Verify

After saving (allow ~2 minutes), run in PowerShell:

```powershell
curl.exe -sI "https://www.linguaphix.com/" | findstr /i "content-security x-frame strict-transport"
```

You should see `content-security-policy`, `x-frame-options`, and `strict-transport-security`.

## 5. Checklist

- [ ] Transform Rule created with headers above
- [ ] Cache bypass rule for HTML (and optionally `build-version.json`)
- [ ] `curl` shows security headers on live site
- [ ] Site still loads (Calendly, Supabase testimonials, FormSubmit, GA)
