#!/usr/bin/env node
/**
 * SEO audit: scan dist/ HTML for legacy competitor-game copy and brand drift.
 * Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');

const LEGACY_TERMS = [
	'valocheats',
	'warzonehack',
	'the finals',
	'naraka bladepoint',
	'rust game',
	'solo farmer',
	'raider session',
	'weapon dropsgoblin',
];

const BRAND_DRIFT = [
  'warzone cheats org',
  'warzone-cheats.org',
  'warzone cheats .org',
];

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const ALLOWLIST_INDEXABLE = new Set([
	'guides/index.html',
]);

const WARN_ONLY_PREFIXES = [
	'blog/',
	'guides/',
];

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found — run npm run build first');
    process.exit(1);
  }

  const htmlFiles = walkHtml(distDir);
  const legacyHits = [];
  const brandHits = [];
  let noindexCount = 0;
  let indexableCount = 0;

  for (const file of htmlFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const isNoindex = /noindex/i.test(raw);
    if (isNoindex) noindexCount++;
    else indexableCount++;

    const text = stripTags(raw);
    for (const term of LEGACY_TERMS) {
      if (text.includes(term)) {
        legacyHits.push({ file: rel, term, noindex: isNoindex });
      }
    }
    for (const term of BRAND_DRIFT) {
      if (text.includes(term)) {
        brandHits.push({ file: rel, term, noindex: isNoindex });
      }
    }
  }

  const indexableLegacy = legacyHits.filter(
    (h) => !h.noindex && !ALLOWLIST_INDEXABLE.has(h.file),
  );
  const warnLegacy = indexableLegacy.filter((h) =>
    WARN_ONLY_PREFIXES.some((p) => h.file.startsWith(p)),
  );
  const failLegacy = indexableLegacy.filter(
    (h) => !WARN_ONLY_PREFIXES.some((p) => h.file.startsWith(p)),
  );
  const indexableBrand = brandHits.filter((h) => !h.noindex);

  console.log('=== SEO Audit (dist/) ===');
  console.log(`HTML files: ${htmlFiles.length}`);
  console.log(`Indexable: ${indexableCount} | noindex: ${noindexCount}`);
  console.log(`Legacy term hits (all): ${legacyHits.length}`);
  console.log(`Legacy term hits (indexable, fail): ${failLegacy.length}`);
  console.log(`Legacy term hits (indexable, warn only): ${warnLegacy.length}`);
  console.log(`Brand drift hits (indexable only): ${indexableBrand.length}`);

  if (warnLegacy.length > 0) {
    console.log('\n--- Indexable pages with legacy terms (warnings, first 20) ---');
    for (const hit of warnLegacy.slice(0, 20)) {
      console.log(`  ${hit.file}: "${hit.term}"`);
    }
  }

  if (failLegacy.length > 0) {
    console.log('\n--- Indexable pages with legacy terms (fail, first 30) ---');
    for (const hit of failLegacy.slice(0, 30)) {
      console.log(`  ${hit.file}: "${hit.term}"`);
    }
  }

  if (indexableBrand.length > 0) {
    console.log('\n--- Indexable pages with brand drift ---');
    for (const hit of indexableBrand) {
      console.log(`  ${hit.file}: "${hit.term}"`);
    }
  }

  const failed = failLegacy.length > 0 || indexableBrand.length > 0;
  if (failed) {
    console.error('\nAudit FAILED: indexable HTML still contains legacy or drift terms.');
    process.exit(1);
  }

  console.log('\nAudit PASSED.');
}

main();
