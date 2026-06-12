#!/usr/bin/env node
/**
 * Normalize robots / googlebot meta tags on all public HTML pages.
 * - Indexable pages: early index,follow + googlebot
 * - Utility pages: noindex,follow (not meant for search results)
 *
 * Run: node scripts/ensure-seo-tags.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'redesign', 'docs', 'scripts']);

const INDEX_ROBOTS =
  '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">';
const INDEX_GOOGLEBOT = '<meta name="googlebot" content="index, follow">';
const NOINDEX_ROBOTS = '<meta name="robots" content="noindex, follow">';
const NOINDEX_GOOGLEBOT = '<meta name="googlebot" content="noindex, follow">';

/** Internal / duplicate URLs — keep out of Google results */
const NOINDEX_REL = new Set(['site-index.html', 'share-experience.html']);

function walkHtmlFiles(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkHtmlFiles(full, list);
    else if (name.endsWith('.html')) list.push(full);
  }
  return list;
}

function relFromRoot(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function stripSeoMeta(html) {
  return html
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']googlebot["'][^>]*>\s*/gi, '');
}

function injectSeoAfterCharset(html, robots, googlebot) {
  const block = `${robots}\n${googlebot}\n`;
  if (/<meta\s+charset/i.test(html)) {
    return html.replace(/(<meta\s+charset[^>]*>\s*)/i, `$1${block}`);
  }
  return html.replace(/(<head[^>]*>\s*)/i, `$1${block}`);
}

function fixShareExperienceCanonical(html) {
  return html
    .replace(
      /<link\s+rel=["']canonical["']\s+href=["']https:\/\/www\.linguaphix\.com\/#add-testimonial["']\s*>/i,
      '<link rel="canonical" href="https://www.linguaphix.com/">'
    )
    .replace(
      /<meta\s+property=["']og:url["']\s+content=["']https:\/\/www\.linguaphix\.com\/#add-testimonial["']\s*>/i,
      '<meta property="og:url" content="https://www.linguaphix.com/">'
    );
}

let updated = 0;
for (const file of walkHtmlFiles(root)) {
  const rel = relFromRoot(file);
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  html = stripSeoMeta(html);

  if (rel === 'share-experience.html') {
    html = fixShareExperienceCanonical(html);
  }

  const noindex = NOINDEX_REL.has(rel);
  html = injectSeoAfterCharset(
    html,
    noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS,
    noindex ? NOINDEX_GOOGLEBOT : INDEX_GOOGLEBOT
  );

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    updated += 1;
    console.log(`seo: ${rel}${noindex ? ' (noindex)' : ''}`);
  }
}

console.log(`SEO tags updated on ${updated} file(s).`);
