#!/usr/bin/env node
/**
 * Rewrite legacy domains in built sitemap XML (safety net after astro build).
 * Fixes GSC "URL not allowed" when stale dist still references cheatsforwarzone.com.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function readBrandUrl() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/(?:^|\n)\turl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing url');
	const url = m[1].replace(/\\'/g, "'").replace(/\/$/, '');
	if (/warzonecheats\.org/i.test(url)) {
		throw new Error(
			`brand.ts url must be cheatsforwarzone.com, not ${url}. Run: node scripts/rebrand-warzone-cheats.mjs`,
		);
	}
	return url;
}

const CANONICAL = readBrandUrl();

/** Ordered most-specific first. */
const LEGACY_ORIGIN_REPLACEMENTS = [
	['https://cheatsforwarzone.com', CANONICAL],
	['http://cheatsforwarzone.com', CANONICAL],
	['https://cheatsforwarzone.com', CANONICAL],
	['http://cheatsforwarzone.com', CANONICAL],
	['https://www.thefinalscheats.org', CANONICAL],
	['http://www.thefinalscheats.org', CANONICAL],
	['https://thefinalscheats.org', CANONICAL],
	['http://thefinalscheats.org', CANONICAL],
	['https://www.rustcheats.co', CANONICAL],
	['https://rustcheats.co', CANONICAL],
];

const files = readdirSync(DIST).filter((name) => /^sitemap.*\.xml$/i.test(name));
let fixed = 0;

for (const name of files) {
	const file = path.join(DIST, name);
	let xml = readFileSync(file, 'utf8');
	const original = xml;

	for (const [from, to] of LEGACY_ORIGIN_REPLACEMENTS) {
		xml = xml.split(from).join(to);
	}

	if (xml !== original) {
		writeFileSync(file, xml, 'utf8');
		fixed += 1;
		console.log(`fix-sitemap-domains: rewrote legacy URLs in ${name}`);
	}
}

if (fixed === 0) {
	console.log(`fix-sitemap-domains: all ${files.length} sitemap files already use ${CANONICAL}`);
} else {
	console.log(`fix-sitemap-domains: updated ${fixed} file(s) → ${CANONICAL}`);
}
