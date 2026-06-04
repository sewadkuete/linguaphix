import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPath = process.argv[2] || 'c:/Users/ADMIN/Downloads/linguaphix-website.html';

const src = fs.readFileSync(srcPath, 'utf8');
const styleMatch = src.match(/<style>([\s\S]*?)<\/style>/);
const mainScriptMarker = '// ── CONFIG: Replace with your Supabase credentials ──';
const scriptStart = src.indexOf('<script>\n' + mainScriptMarker);
if (!styleMatch || scriptStart === -1) {
  console.error('Failed to parse HTML');
  process.exit(1);
}
const scriptOpen = scriptStart + '<script>'.length;
const scriptClose = src.indexOf('</script>', scriptOpen);
const mainJs = src.slice(scriptOpen, scriptClose).trim();

let html = src.slice(0, styleMatch.index);
html += '<link rel="stylesheet" href="css/style.css">\n';
html += src.slice(styleMatch.index + styleMatch[0].length, scriptStart);
html += '<script src="js/app.js"></script>\n';
html += src.slice(scriptClose + '</script>'.length);

fs.mkdirSync(path.join(root, 'css'), { recursive: true });
fs.mkdirSync(path.join(root, 'js'), { recursive: true });
fs.writeFileSync(path.join(root, 'css', 'style.css'), styleMatch[1].trim());
fs.writeFileSync(path.join(root, 'js', 'app.js'), mainJs);
fs.writeFileSync(path.join(root, 'index.html'), html);

console.log('Created index.html, css/style.css, js/app.js');
