/**
 * Scans assets/portfolio/playlists/{id}/ and writes:
 *   - assets/portfolio/portfolio-playlists.json
 *   - js/portfolio-playlists-data.js (inline fallback for local preview)
 *
 * Run after adding files: node scripts/build-portfolio-playlists.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const playlistsRoot = path.join(root, 'assets', 'portfolio', 'playlists');
const outJson = path.join(root, 'assets', 'portfolio', 'portfolio-playlists.json');
const outJs = path.join(root, 'js', 'portfolio-playlists-data.js');

const PLAYLIST_IDS = [
  'video-1', 'video-2',
  'graphic-1', 'graphic-2', 'graphic-3',
];

const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v', '.ogv']);
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
const COVER_BASENAME = 'cover';
const SKIP_NAMES = new Set([
  '.gitkeep', 'readme.md', 'readme.txt', 'labels.json', 'meta.json',
  'cover.url', 'cover.txt', 'tiktok.url',
  'thumbs.db', 'desktop.ini',
]);

const URL_COVER_FILES = ['cover.url', 'tiktok.url', 'cover.txt'];

function loadLabelOverrides(playlistId) {
  const file = path.join(playlistsRoot, playlistId, 'labels.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

function isVideoPlaylist(id) {
  return id.startsWith('video-');
}

function isCoverFile(name) {
  const base = path.basename(name, path.extname(name)).toLowerCase();
  return base === COVER_BASENAME;
}

function parseYoutubeId(content) {
  const s = content.trim();
  if (!s) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function parseVimeoId(content) {
  const s = content.trim();
  if (/^\d+$/.test(s)) return s;
  const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function labelFromFilename(name, overrides) {
  if (overrides[name]) return overrides[name];
  const base = path.basename(name, path.extname(name));
  return base
    .replace(/^youtube[-_]/i, '')
    .replace(/^vimeo[-_]/i, '')
    .replace(/^\d+[-_.\s]+/, '')
    .replace(/[-_]+/g, ' ')
    .trim() || name;
}

function sortKey(name) {
  const m = name.match(/^(\d+)/);
  return m ? [0, Number(m[1]), name] : [1, 0, name.toLowerCase()];
}

function isHttpsTikTokUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && /^(www\.)?tiktok\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function parseTikTokCover(url) {
  if (!isHttpsTikTokUrl(url)) return null;
  const handleMatch = url.match(/@([\w.]+)/i);
  const handle = handleMatch ? `@${handleMatch[1]}` : '';
  const label = handle
    ? handle.replace(/^@/, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ')
    : 'TikTok';
  return {
    kind: 'tiktok',
    url,
    handle,
    label: label.charAt(0).toUpperCase() + label.slice(1),
  };
}

function loadUrlCover(playlistId) {
  const dir = path.join(playlistsRoot, playlistId);
  for (const name of URL_COVER_FILES) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) continue;
    const line = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/)[0].trim();
    if (!line) continue;
    if (/tiktok\.com/i.test(line)) return parseTikTokCover(line);
  }
  return null;
}

function buildItem(playlistId, name, labelOverrides) {
  const ext = path.extname(name).toLowerCase();
  const relBase = `assets/portfolio/playlists/${playlistId}`;
  const label = labelFromFilename(name, labelOverrides);

  if (ext === '.txt' || ext === '.url') {
    const content = fs.readFileSync(path.join(playlistsRoot, playlistId, name), 'utf8');
    const yt = parseYoutubeId(content);
    if (yt) return { kind: 'youtube', id: yt, label };
    const vimeo = parseVimeoId(content);
    if (vimeo) return { kind: 'vimeo', id: vimeo, label };
  }

  if (name.toLowerCase().startsWith('youtube-') && (ext === '.txt' || ext === '.url' || ext === '')) {
    const id = name.replace(/^youtube-/i, '').replace(/\.(txt|url)$/i, '');
    const yt = parseYoutubeId(id);
    if (yt) return { kind: 'youtube', id: yt, label };
  }

  if (VIDEO_EXT.has(ext) && isVideoPlaylist(playlistId)) {
    return {
      kind: 'file',
      src: `${relBase}/${name}`.replace(/\\/g, '/'),
      mime: ext === '.webm' ? 'video/webm' : ext === '.mov' ? 'video/quicktime' : 'video/mp4',
      label,
    };
  }

  if (IMAGE_EXT.has(ext) && !isVideoPlaylist(playlistId)) {
    return {
      kind: 'image',
      src: `${relBase}/${name}`.replace(/\\/g, '/'),
      label,
    };
  }

  return null;
}

function scanFolder(playlistId) {
  const dir = path.join(playlistsRoot, playlistId);
  if (!fs.existsSync(dir)) return { cover: null, items: [] };

  const labelOverrides = loadLabelOverrides(playlistId);
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => !name.startsWith('.') && !SKIP_NAMES.has(name.toLowerCase()))
    .sort((a, b) => {
      const ka = sortKey(a);
      const kb = sortKey(b);
      return ka[0] - kb[0] || ka[1] - kb[1] || ka[2].localeCompare(kb[2]);
    });

  let cover = loadUrlCover(playlistId);
  const items = [];

  for (const name of entries) {
    const item = buildItem(playlistId, name, labelOverrides);
    if (!item) continue;

    if (isCoverFile(name)) {
      if (!cover) cover = item;
      continue;
    }
    items.push(item);
  }

  if (!cover && items.length > 0) {
    cover = items[0];
  }

  return { cover, items };
}

const playlists = {};
for (const id of PLAYLIST_IDS) {
  playlists[id] = scanFolder(id);
}

const manifest = {
  version: 2,
  generatedAt: new Date().toISOString(),
  playlists,
};

fs.mkdirSync(playlistsRoot, { recursive: true });
for (const id of PLAYLIST_IDS) {
  fs.mkdirSync(path.join(playlistsRoot, id), { recursive: true });
}

fs.writeFileSync(outJson, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
fs.writeFileSync(
  outJs,
  `/* Auto-generated — run: node scripts/build-portfolio-playlists.mjs */\nwindow.__PORTFOLIO_PLAYLISTS__ = ${JSON.stringify(manifest)};\n`,
  'utf8'
);

console.log(`Wrote ${outJson}`);
console.log(`Wrote ${outJs}`);
for (const id of PLAYLIST_IDS) {
  const p = playlists[id];
  const n = p.items.length;
  const c = p.cover ? 'yes' : 'no';
  console.log(`  ${id}: ${n} item(s), cover=${c}`);
}
