#!/usr/bin/env node
/**
 * Generate sitemap.xml for https://www.linguaphix.com
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const site = 'https://www.linguaphix.com';
const lastmod = new Date().toISOString().slice(0, 10);

const entries = [
  { loc: `${site}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${site}/about.html`, changefreq: 'monthly', priority: '0.85' },
  { loc: `${site}/design.html`, changefreq: 'monthly', priority: '0.85' },
  { loc: `${site}/pricing.html`, changefreq: 'monthly', priority: '0.85' },
  { loc: `${site}/catalogue.html`, changefreq: 'monthly', priority: '0.75' },
  { loc: `${site}/portfolio.html`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${site}/policy.html`, changefreq: 'yearly', priority: '0.4' },
  { loc: `${site}/exercices/index.html`, changefreq: 'monthly', priority: '0.75' },
  { loc: `${site}/exercices/fle/index.html`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${site}/exercices/esl/index.html`, changefreq: 'monthly', priority: '0.7' },
  ...[
    'tcf', 'ielts', 'toeic', 'cours', 'interview', 'soutien', 'formation',
    'logo', 'montage', 'graphic', 'livestream', 'materiel',
  ].map((slug) => ({
    loc: `${site}/services/${slug}.html`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  {
    loc: `${site}/services/traduction.html?audience=particuliers`,
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    loc: `${site}/services/traduction.html?audience=entreprises`,
    changefreq: 'monthly',
    priority: '0.8',
  },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const out = path.join(root, 'sitemap.xml');
fs.writeFileSync(out, `${xml}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, out)} (${entries.length} URLs, lastmod ${lastmod})`);
