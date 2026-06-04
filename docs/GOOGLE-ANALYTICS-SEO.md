# Google Analytics & Google Search — integration guide

This site is static HTML. Follow these steps once your domain (e.g. `https://linguaphix.com`) is live.

---

## 1. Google Analytics 4 (GA4)

### Create a property

1. Go to [Google Analytics](https://analytics.google.com/).
2. **Admin** → **Create property** → name it `LINGUAPHIX`.
3. Choose **Web** → enter your site URL and timezone.
4. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).

### Connect the website

1. Open `js/site-config.js` in this project.
2. Replace the placeholder:

   ```javascript
   gaMeasurementId: 'G-XXXXXXXXXX',
   ```

   with your real ID, for example:

   ```javascript
   gaMeasurementId: 'G-ABC123XYZ9',
   ```

3. Deploy the updated files. Analytics loads on every page that includes:

   ```html
   <script src="js/site-config.js"></script>
   <script src="js/analytics.js"></script>
   ```

   (Already added to `index.html`, `portfolio.html`, and `policy.html`.)

4. Visit your live site, then in GA4 open **Reports → Realtime** to confirm a visit appears (allow 1–2 minutes).

### Notes

- While the ID is still `G-XXXXXXXXXX`, tracking is **disabled** (no errors in the console).
- IP anonymization is enabled in `js/analytics.js`.
- Cookie consent: if you need a GDPR banner in the EU, add a consent tool and only call `gtag('config', …)` after acceptance.

---

## 2. Google Search (Search Console + SEO)

### Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **URL prefix** → `https://linguaphix.com`.
3. Verify ownership (common options):
   - **HTML file upload** — upload the file Google gives you to the site root, or  
   - **DNS TXT record** at your domain registrar (recommended).
4. After verification, open **Sitemaps** → submit:

   ```
   https://linguaphix.com/sitemap.xml
   ```

   The file `sitemap.xml` is already in the project root.

5. Request indexing for important URLs:
   - `https://linguaphix.com/`
   - `https://linguaphix.com/portfolio.html`
   - `https://linguaphix.com/policy.html`

### What is already optimized in the code

| Item | Location |
|------|----------|
| Page titles & meta descriptions | `<title>`, `<meta name="description">` on each HTML page |
| Canonical URLs | `<link rel="canonical">` |
| Open Graph (social previews) | `og:title`, `og:description`, `og:image`, `og:url` |
| `robots.txt` | Allows crawlers + points to sitemap |
| `sitemap.xml` | Lists all public pages |
| Structured data (Organization) | JSON-LD on `index.html` |
| Mobile viewport & readable fonts | `viewport` + responsive CSS |
| Semantic headings | One `<h1>` per page, logical sections |

### What you should do manually

1. **Social preview image**  
   - Add a 1200×630 image at the site root, e.g. `og-image.jpg`, or use `assets/branding/logo-full.png` and update `og:image` URLs in each page if you prefer that asset.  
   - Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or LinkedIn Post Inspector.

2. **Update `siteUrl` in `js/site-config.js`** if your domain differs from `https://linguaphix.com`.

3. **Google Business Profile** (optional) — if you serve clients in Lomé/Togo, create a profile and link to the site.

4. **Content** — keep service pages rich with real text (already on the home page); add alt text when you replace portfolio placeholders with real project images.

5. **HTTPS** — host must serve the site over HTTPS (Netlify, Vercel, GitHub Pages, etc. do this automatically).

6. **Performance** — compress large images in `assets/portfolio/`; keep logo PNGs reasonable size.

### Bing (optional)

Submit the same sitemap at [Bing Webmaster Tools](https://www.bing.com/webmasters).

---

## 3. Checklist before launch

- [ ] `gaMeasurementId` set in `js/site-config.js`
- [ ] Search Console verified and `sitemap.xml` submitted
- [ ] `og-image.jpg` (or updated `og:image` URLs) live
- [ ] All pages open over HTTPS
- [ ] Test contact form email (FormSubmit activation)
- [ ] Replace portfolio placeholders with real work
- [ ] Hard-refresh after logo or CSS changes (Ctrl+F5)

---

## 4. Files reference

| File | Purpose |
|------|---------|
| `js/site-config.js` | GA Measurement ID + site URL |
| `js/analytics.js` | Loads gtag when ID is valid |
| `robots.txt` | Crawler rules |
| `sitemap.xml` | URL list for Google |
| `assets/branding/logo-full.png` | Horizontal logo (portfolio & policy nav) |
| `assets/branding/logo-mark-original.png` | Icon mark (home nav, hero, favicon) |
