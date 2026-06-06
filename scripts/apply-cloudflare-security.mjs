#!/usr/bin/env node
/**
 * Apply LINGUAPHIX security headers + HTML cache bypass on Cloudflare.
 *
 * Prerequisites in .env.local:
 *   CLOUDFLARE_API_TOKEN=...   (Transform Rules Write + Cache Rules Edit)
 *   CLOUDFLARE_ZONE_ID=...     (optional — looked up from linguaphix.com)
 *
 * Usage: node scripts/apply-cloudflare-security.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://formsubmit.co",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  "media-src 'self' blob:",
  "connect-src 'self' https://formsubmit.co https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com",
  'frame-src https://calendly.com https://challenges.cloudflare.com',
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const HOST_EXPR = '(http.host eq "linguaphix.com" or http.host eq "www.linguaphix.com")';

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
  const envFile = path.join(root, '.env.local');
  const env = fs.existsSync(envFile) ? parseEnvFile(fs.readFileSync(envFile, 'utf8')) : {};
  for (const key of ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ZONE_ID']) {
    if (process.env[key]) env[key] = process.env[key];
  }
  return env;
}

async function cfApi(token, method, apiPath, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!json.success) {
    const msg = json.errors?.map((e) => e.message).join('; ') || res.statusText;
    throw new Error(`${method} ${apiPath} failed: ${msg}`);
  }
  return json.result;
}

async function resolveZoneId(token, zoneId) {
  if (zoneId) return zoneId;
  const zones = await cfApi(token, 'GET', '/zones?name=linguaphix.com&status=active');
  const match = zones?.find?.((z) => z.name === 'linguaphix.com') || zones?.[0];
  if (!match?.id) {
    throw new Error('Could not find zone linguaphix.com. Set CLOUDFLARE_ZONE_ID in .env.local');
  }
  console.log(`Zone: linguaphix.com (${match.id})`);
  return match.id;
}

async function getPhaseEntrypoint(token, zoneId, phase) {
  try {
    return await cfApi(token, 'GET', `/zones/${zoneId}/rulesets/phases/${phase}/entrypoint`);
  } catch {
    return null;
  }
}

function headerRule() {
  return {
    ref: 'linguaphix-security-headers',
    description: 'LINGUAPHIX security headers',
    expression: HOST_EXPR,
    action: 'rewrite',
    enabled: true,
    action_parameters: {
      headers: {
        'X-Content-Type-Options': { operation: 'set', value: 'nosniff' },
        'X-Frame-Options': { operation: 'set', value: 'SAMEORIGIN' },
        'Referrer-Policy': { operation: 'set', value: 'strict-origin-when-cross-origin' },
        'Permissions-Policy': {
          operation: 'set',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        'Strict-Transport-Security': {
          operation: 'set',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        'Content-Security-Policy': { operation: 'set', value: CSP },
      },
    },
  };
}

function cacheBypassHtmlRule() {
  return {
    ref: 'linguaphix-cache-bypass-html',
    description: 'LINGUAPHIX bypass cache for HTML and homepage',
    expression: `${HOST_EXPR} and (http.request.uri.path.extension eq "html" or http.request.uri.path eq "/")`,
    action: 'set_cache_settings',
    enabled: true,
    action_parameters: { cache: false },
  };
}

function cacheBypassBuildRule() {
  return {
    ref: 'linguaphix-cache-bypass-build',
    description: 'LINGUAPHIX bypass cache for build-version.json',
    expression: `${HOST_EXPR} and ends_with(http.request.uri.path, "build-version.json")`,
    action: 'set_cache_settings',
    enabled: true,
    action_parameters: { cache: false },
  };
}

function cacheBypassSupabaseConfigRule() {
  return {
    ref: 'linguaphix-cache-bypass-supabase-config',
    description: 'LINGUAPHIX bypass cache for supabase-config.json',
    expression: `${HOST_EXPR} and ends_with(http.request.uri.path, "supabase-config.json")`,
    action: 'set_cache_settings',
    enabled: true,
    action_parameters: { cache: false },
  };
}

function cacheBypassAssetsRule() {
  return {
    ref: 'linguaphix-cache-bypass-assets',
    description: 'LINGUAPHIX bypass cache for JS and CSS',
    expression: `${HOST_EXPR} and (http.request.uri.path.extension in {"js" "css"})`,
    action: 'set_cache_settings',
    enabled: true,
    action_parameters: { cache: false },
  };
}

function mergeRules(existingRules, ours) {
  const keep = (existingRules || []).filter(
    (r) => !ours.some((o) => o.ref && o.ref === r.ref)
  );
  return [...keep, ...ours];
}

async function upsertPhaseRules(token, zoneId, phase, newRules, label) {
  const ours = newRules;
  let entry = await getPhaseEntrypoint(token, zoneId, phase);

  if (!entry) {
    console.log(`Creating ${label} ruleset…`);
    entry = await cfApi(token, 'POST', `/zones/${zoneId}/rulesets`, {
      name: `LINGUAPHIX ${label}`,
      description: `LINGUAPHIX ${label} (auto)`,
      kind: 'zone',
      phase,
      rules: ours,
    });
    console.log(`Created ${label} ruleset (${entry.id}) with ${ours.length} rule(s)`);
    return;
  }

  const rules = mergeRules(entry.rules, ours);
  await cfApi(token, 'PUT', `/zones/${zoneId}/rulesets/${entry.id}`, { rules });
  console.log(`Updated ${label} ruleset (${entry.id}) — ${rules.length} rule(s) total`);
}

async function verifyLiveHeaders() {
  try {
    const res = await fetch('https://www.linguaphix.com/', { method: 'HEAD' });
    const checks = [
      ['content-security-policy', res.headers.get('content-security-policy')],
      ['x-frame-options', res.headers.get('x-frame-options')],
      ['strict-transport-security', res.headers.get('strict-transport-security')],
    ];
    console.log('\nLive header check (www.linguaphix.com):');
    for (const [name, value] of checks) {
      console.log(value ? `  OK  ${name}` : `  --  ${name} (not present yet — wait 1–2 min)`);
    }
  } catch (err) {
    console.warn('Could not verify live headers:', err.message);
  }
}

async function main() {
  const env = loadEnv();
  const token = (env.CLOUDFLARE_API_TOKEN || '').trim();
  if (!token || token === 'YOUR_CLOUDFLARE_API_TOKEN') {
    console.error(`
Missing CLOUDFLARE_API_TOKEN in .env.local

Create a token:
  1. https://dash.cloudflare.com/profile/api-tokens
  2. Create Token → Edit zone DNS (template) OR Custom token
  3. Permissions:
     - Zone → Transform Rules → Edit
     - Zone → Cache Rules → Edit
     - Zone → Zone → Read
  4. Zone Resources → Include → linguaphix.com
  5. Add to .env.local:
     CLOUDFLARE_API_TOKEN=your-token-here

Then run: node scripts/apply-cloudflare-security.mjs

Or follow the manual steps in docs/CLOUDFLARE-SECURITY-HEADERS.md
`);
    process.exit(1);
  }

  const zoneId = await resolveZoneId(token, (env.CLOUDFLARE_ZONE_ID || '').trim());

  await upsertPhaseRules(
    token,
    zoneId,
    'http_response_headers_transform',
    [headerRule()],
    'response headers'
  );

  await upsertPhaseRules(
    token,
    zoneId,
    'http_request_cache_settings',
    [
      cacheBypassHtmlRule(),
      cacheBypassBuildRule(),
      cacheBypassSupabaseConfigRule(),
      cacheBypassAssetsRule(),
    ],
    'cache rules'
  );

  console.log('\nCloudflare rules applied.');
  await verifyLiveHeaders();
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
