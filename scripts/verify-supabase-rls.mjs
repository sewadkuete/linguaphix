#!/usr/bin/env node
/**
 * Verifies Supabase RLS for public.testimonials using the anon key.
 * Usage: node scripts/verify-supabase-rls.mjs
 * Reads SUPABASE_URL + SUPABASE_ANON_KEY from env, .env.local, or js/runtime-config.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

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

function loadConfig() {
  const envFile = path.join(root, '.env.local');
  const env = fs.existsSync(envFile) ? parseEnvFile(fs.readFileSync(envFile, 'utf8')) : {};
  for (const key of ['SUPABASE_URL', 'SUPABASE_ANON_KEY']) {
    if (process.env[key]) env[key] = process.env[key];
  }

  let url = (env.SUPABASE_URL || '').trim().replace(/\/$/, '');
  let key = (env.SUPABASE_ANON_KEY || '').trim();

  if (!url || !key) {
    for (const rel of ['js/runtime-config.json', 'js/site-config.local.json']) {
      const file = path.join(root, rel);
      if (!fs.existsSync(file)) continue;
      try {
        const json = JSON.parse(fs.readFileSync(file, 'utf8'));
        url = url || String(json.supabaseUrl || '').trim().replace(/\/$/, '');
        key = key || String(json.supabaseAnonKey || '').trim();
      } catch {
        /* ignore */
      }
      if (url && key) break;
    }
  }

  if (!url || !key || /YOUR-PROJECT|YOUR_ANON_KEY/i.test(url + key)) {
    console.error('Missing Supabase config. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local or run write-site-config-local.mjs');
    process.exit(1);
  }

  return { url, key };
}

async function request(url, key, method, pathSuffix, body) {
  const res = await fetch(`${url}${pathSuffix}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json', Prefer: 'return=minimal' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text().catch(() => '');
  return { status: res.status, text };
}

function ok(label, pass, detail) {
  const icon = pass ? 'PASS' : 'FAIL';
  console.log(`${icon}  ${label}${detail ? ` — ${detail}` : ''}`);
  return pass;
}

const { url, key } = loadConfig();
console.log(`Checking RLS at ${url}\n`);

let allPass = true;

// SELECT approved only
const selectRes = await request(
  url,
  key,
  'GET',
  '/rest/v1/testimonials?select=id,approved&limit=50'
);
const selectPass = selectRes.status === 200;
allPass = ok('SELECT approved testimonials', selectPass, `HTTP ${selectRes.status}`) && allPass;
if (selectPass) {
  let rows = [];
  try {
    rows = JSON.parse(selectRes.text);
  } catch {
    rows = [];
  }
  const leaked = Array.isArray(rows) && rows.some((r) => r.approved !== true);
  allPass = ok('SELECT returns only approved rows', !leaked, leaked ? 'unapproved row visible' : `${rows.length} row(s)`) && allPass;
}

// INSERT pending (should succeed)
const pendingPayload = {
  name: 'RLS Verify Bot',
  role: 'automated check',
  service: 'tcf',
  rating: 5,
  message: 'RLS verification row — safe to delete in Supabase dashboard.',
  location: 'Test',
  approved: false,
};
const insertPending = await request(url, key, 'POST', '/rest/v1/testimonials', pendingPayload);
const insertPendingPass = insertPending.status === 201 || insertPending.status === 204;
allPass = ok('INSERT pending testimonial (approved=false)', insertPendingPass, `HTTP ${insertPending.status}`) && allPass;

// INSERT with approved=true (must fail)
const insertApproved = await request(url, key, 'POST', '/rest/v1/testimonials', {
  ...pendingPayload,
  name: 'RLS Verify Bot (blocked)',
  approved: true,
});
const blockApprovedPass = insertApproved.status === 401 || insertApproved.status === 403;
allPass = ok('INSERT blocked when approved=true', blockApprovedPass, `HTTP ${insertApproved.status}`) && allPass;

// UPDATE (must fail)
const patchRes = await request(
  url,
  key,
  'PATCH',
  '/rest/v1/testimonials?name=eq.RLS%20Verify%20Bot',
  { approved: true }
);
const patchPass = patchRes.status === 401 || patchRes.status === 403;
allPass = ok('UPDATE blocked for anon', patchPass, `HTTP ${patchRes.status}`) && allPass;

// DELETE (must fail)
const deleteRes = await request(
  url,
  key,
  'DELETE',
  '/rest/v1/testimonials?name=eq.RLS%20Verify%20Bot'
);
const deletePass = deleteRes.status === 401 || deleteRes.status === 403;
allPass = ok('DELETE blocked for anon', deletePass, `HTTP ${deleteRes.status}`) && allPass;

console.log('');
if (allPass) {
  console.log('All RLS checks passed. Delete test rows named "RLS Verify Bot" in Supabase if desired.');
  process.exit(0);
}

console.error('One or more RLS checks failed. Re-run docs/supabase-rls.sql in the Supabase SQL Editor.');
process.exit(1);
