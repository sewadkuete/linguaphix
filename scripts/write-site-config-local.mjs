#!/usr/bin/env node
/**
 * Writes js/site-config.local.js from environment variables or .env.local.
 * Used locally and in GitHub Actions (secrets → env → this script).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outFile = path.join(root, 'js', 'site-config.local.js');
const jsonFile = path.join(root, 'js', 'site-config.local.json');
const envFile = path.join(root, '.env.local');

function parseEnvFile(content) {
  const out = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"'))
      || (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function loadEnv() {
  const fromFile = fs.existsSync(envFile)
    ? parseEnvFile(fs.readFileSync(envFile, 'utf8'))
    : {};
  const keys = [
    'GA_MEASUREMENT_ID',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'CONTACT_EMAIL',
    'SITE_URL',
  ];
  const merged = { ...fromFile };
  for (const key of keys) {
    if (process.env[key]) merged[key] = process.env[key];
  }
  return merged;
}

function escJs(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

function pick(env, ...names) {
  for (const name of names) {
    const v = (env[name] || '').trim().replace(/\s+/g, '');
    if (v) return v;
  }
  return '';
}

const env = loadEnv();
const gaMeasurementId = pick(env, 'GA_MEASUREMENT_ID');
const supabaseUrl = pick(env, 'SUPABASE_URL');
const supabaseAnonKey = pick(env, 'SUPABASE_ANON_KEY');
const contactEmail = pick(env, 'CONTACT_EMAIL');
const siteUrl = pick(env, 'SITE_URL');

const fields = [];
if (gaMeasurementId) fields.push(`    gaMeasurementId: '${escJs(gaMeasurementId)}',`);
if (supabaseUrl) fields.push(`    supabaseUrl: '${escJs(supabaseUrl)}',`);
if (supabaseAnonKey) fields.push(`    supabaseAnonKey: '${escJs(supabaseAnonKey)}',`);
if (contactEmail) fields.push(`    contactEmail: '${escJs(contactEmail)}',`);
if (siteUrl) fields.push(`    siteUrl: '${escJs(siteUrl)}',`);

if (!fields.length) {
  console.log('No config values in .env.local or environment — site-config.local.js not written.');
  process.exit(0);
}

const body = `/** Auto-generated — do not commit. */
(function applyLocalSiteConfig() {
  if (!window.LINGUAPHIX_CONFIG) window.LINGUAPHIX_CONFIG = {};
  Object.assign(window.LINGUAPHIX_CONFIG, {
${fields.join('\n')}
  });
  window.LINGUAPHIX_CONFIG_READY = true;
})();
`;

const payload = {};
if (gaMeasurementId) payload.gaMeasurementId = gaMeasurementId;
if (supabaseUrl) payload.supabaseUrl = supabaseUrl;
if (supabaseAnonKey) payload.supabaseAnonKey = supabaseAnonKey;
if (contactEmail) payload.contactEmail = contactEmail;
if (siteUrl) payload.siteUrl = siteUrl;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, body, 'utf8');
fs.writeFileSync(jsonFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, outFile)} and ${path.relative(root, jsonFile)} (${fields.length} value(s)).`);
