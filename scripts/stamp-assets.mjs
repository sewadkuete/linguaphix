/**
 * Deploy cache busting:
 * - ?v= on local js/css in all HTML
 * - js/build-version.json (fetched with no-store to detect new deploys)
 * - inline build-check (reloads when CDN serves stale HTML)
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

const BUILD_META_TAG = `<meta name="lx-build" content="${version}">`;

const BUILD_CHECK_SCRIPT = `<script data-lx-build-check="1">
(function(){var M="lx-build",R="lx-build-reload",m=document.querySelector('meta[name="'+M+'"]'),pageBuild=m&&m.getAttribute("content");if(!pageBuild)return;var p=(location.pathname||"").replace(/\\\\/g,"/"),segs=p.replace(/^\\/+/,"").split("/"),depth=segs.length-1,jsBase=depth>0?new Array(depth+1).join("../")+"js/":"js/";function go(b){var now=Date.now();try{var last=parseInt(sessionStorage.getItem(R)||"0",10);if(last&&now-last<8000)return;sessionStorage.setItem(R,String(now))}catch(e){}var u=new URL(location.href);u.searchParams.set("build",b);u.searchParams.delete("_");location.replace(u.pathname+u.search+u.hash)}fetch(jsBase+"build-version.json?_="+Date.now(),{cache:"no-store",credentials:"same-origin"}).then(function(r){return r.ok?r.json():null}).then(function(d){if(!d||!d.build||d.build===pageBuild)return;var done=function(){go(d.build)};if("caches"in window){caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x)}))}).finally(done)}else{done()}}).catch(function(){})})();
</script>`;

const ASSET_REF =
  /(\s(?:href|src)=["'])((?:\.\.\/)?(?:js|css)\/[^"']+?)(?:\?v=[^"']*)?(["'])/g;

const BUILD_META_REF = /<meta name="lx-build" content="[^"]*">/;
const BUILD_CHECK_REF = /<script data-lx-build-check="1">[\s\S]*?<\/script>/;

function walkHtmlFiles(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === '.git' || name === 'node_modules' || name === 'redesign') continue;
      walkHtmlFiles(full, list);
    } else if (name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function hasCacheMeta(html) {
  return html.includes('http-equiv="Cache-Control"');
}

function injectBuildBootstrap(html) {
  let next = html;
  let changed = false;

  if (BUILD_META_REF.test(next)) {
    const updated = next.replace(BUILD_META_REF, BUILD_META_TAG);
    if (updated !== next) {
      next = updated;
      changed = true;
    }
  } else {
    // Match the existing charset meta regardless of case (e.g. UTF-8 vs utf-8)
    // and re-insert it verbatim so pages keep their original casing.
    const charsetRe = /<meta charset="[^"]*">/i;
    const m = next.match(charsetRe);
    if (m) {
      const cacheBlock = hasCacheMeta(next) ? '' : `${CACHE_META}\n`;
      const block = `${m[0]}\n${cacheBlock}${BUILD_META_TAG}`;
      const updated = next.replace(charsetRe, () => block);
      if (updated !== next) {
        next = updated;
        changed = true;
      }
    }
  }

  if (BUILD_CHECK_REF.test(next)) {
    const updated = next.replace(BUILD_CHECK_REF, BUILD_CHECK_SCRIPT);
    if (updated !== next) {
      next = updated;
      changed = true;
    }
  } else if (next.includes('name="lx-build"')) {
    const updated = next.replace(BUILD_META_REF, `${BUILD_META_TAG}\n${BUILD_CHECK_SCRIPT}`);
    if (updated !== next) {
      next = updated;
      changed = true;
    }
  }

  return { html: next, changed };
}

function dedupeCacheMeta(html) {
  let next = html;
  let changed = false;
  let first = next.indexOf(CACHE_META);
  if (first < 0) return { html: next, changed: false };

  let searchFrom = first + CACHE_META.length;
  let second = next.indexOf(CACHE_META, searchFrom);
  while (second >= 0) {
    let removeEnd = second + CACHE_META.length;
    if (next[removeEnd] === '\r' && next[removeEnd + 1] === '\n') removeEnd += 2;
    else if (next[removeEnd] === '\n') removeEnd += 1;
    next = next.slice(0, second) + next.slice(removeEnd);
    changed = true;
    searchFrom = first + CACHE_META.length;
    second = next.indexOf(CACHE_META, searchFrom);
  }
  return { html: next, changed };
}

function stampFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const deduped = dedupeCacheMeta(html);
  html = deduped.html;
  if (deduped.changed) changed = true;

  const stamped = html.replace(ASSET_REF, (match, prefix, assetPath, suffix) => {
    const next = `${prefix}${assetPath}?v=${version}${suffix}`;
    if (next !== match) changed = true;
    return next;
  });
  html = stamped;

  const boot = injectBuildBootstrap(html);
  html = boot.html;
  if (boot.changed) changed = true;

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

const buildVersionFile = path.join(root, 'js', 'build-version.json');
fs.writeFileSync(buildVersionFile, `${JSON.stringify({ build: version }, null, 2)}\n`, 'utf8');
console.log(`wrote ${path.relative(root, buildVersionFile)}`);

const files = walkHtmlFiles(root);
let count = 0;
for (const file of files) {
  if (stampFile(file)) {
    count += 1;
    console.log(`stamped ${path.relative(root, file)}`);
  }
}

console.log(`Asset version: ${version} (${count} HTML file(s) updated)`);
