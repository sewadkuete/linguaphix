/**
 * Append ?v=… to local js/css asset URLs in all HTML files.
 * Run before deploy (CI uses the git SHA) so browsers fetch fresh assets on refresh.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const rawVersion = (process.argv[2] || process.env.ASSET_VERSION || '').trim();
const version = rawVersion
  ? rawVersion.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 12)
  : new Date().toISOString().slice(0, 10).replace(/-/g, '');

const CACHE_META = [
  '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">',
  '<meta http-equiv="Pragma" content="no-cache">',
  '<meta http-equiv="Expires" content="0">',
].join('\n');

const ASSET_REF =
  /(\s(?:href|src)=["'])((?:\.\.\/)?(?:js|css)\/[^"']+?)(?:\?v=[^"']*)?(["'])/g;

function walkHtmlFiles(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === '.git' || name === 'node_modules') continue;
      walkHtmlFiles(full, list);
    } else if (name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function stampFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const stamped = html.replace(ASSET_REF, (match, prefix, assetPath, suffix) => {
    const next = `${prefix}${assetPath}?v=${version}${suffix}`;
    if (next !== match) changed = true;
    return next;
  });
  html = stamped;

  if (!html.includes('http-equiv="Cache-Control"')) {
    const withMeta = html.replace(/<meta charset="UTF-8">/i, `<meta charset="UTF-8">\n${CACHE_META}`);
    if (withMeta !== html) {
      html = withMeta;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

const files = walkHtmlFiles(root);
let count = 0;
for (const file of files) {
  if (stampFile(file)) {
    count += 1;
    console.log(`stamped ${path.relative(root, file)}`);
  }
}

console.log(`Asset version: ${version} (${count} HTML file(s) updated)`);
