#!/usr/bin/env node
/**
 * Syncs locale 301s for cannibal pageIds → pillar pageIds into
 * functions/cannibal-redirects.json (applied by src/worker.ts).
 *
 * Cloudflare _redirects allows max 100 dynamic rules; splat rules make later
 * lines count as dynamic. Locale cannibal 301s (~460 rules) must not live in
 * _redirects — the Worker handles them at runtime instead.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const CANONICAL = path.join(ROOT, 'src/data/seo-cannibal-map.ts');
const JSON_OUT = path.join(ROOT, 'functions/cannibal-redirects.json');

function readCannibalTargets() {
	const src = readFileSync(CANONICAL, 'utf8');
	const block = src.match(/cannibalRedirectTargets\s*=\s*\{([\s\S]*?)\}\s*as const/);
	if (!block) throw new Error('cannibalRedirectTargets missing in seo-cannibal-map.ts');
	/** @type {Record<string, string>} */
	const targets = {};
	for (const row of block[1].matchAll(/['"]?([\w-]+)['"]?\s*:\s*['"]([\w-]+)['"]/g)) {
		targets[row[1]] = row[2];
	}
	if (!Object.keys(targets).length) throw new Error('No cannibal targets parsed');
	return targets;
}

function extractSlugBlock(src, pageId) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
	const re = new RegExp(`\\t'${pageId}':\\s*\\{([\\s\\S]*?)\\n\\t\\},|\\t${pageId}:\\s*\\{([\\s\\S]*?)\\n\\t\\},`);
	const m = localized.match(re);
	const block = m?.[1] ?? m?.[2];
	if (!block) throw new Error(`Missing localizedSlugs block for ${pageId}`);
	const slugs = {};
	for (const row of block.matchAll(/(\w+):\s*'([^']*)'/g)) {
		slugs[row[1]] = row[2];
	}
	return slugs;
}

function localePath(locale, slug) {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

const TARGETS = readCannibalTargets();
const routing = readFileSync(ROUTING, 'utf8');
const map = {};

for (const [fromId, toId] of Object.entries(TARGETS)) {
	const fromSlugs = extractSlugBlock(routing, fromId);
	const toSlugs = extractSlugBlock(routing, toId);
	for (const [locale, fromSlug] of Object.entries(fromSlugs)) {
		if (locale === 'en') continue;
		const toSlug = toSlugs[locale];
		if (toSlug === undefined) continue;
		const fromPath = localePath(locale, fromSlug);
		const toPath = localePath(locale, toSlug);
		map[fromPath] = toPath;
		map[`/${locale}/${fromSlug}`] = toPath;
	}
}

	writeFileSync(JSON_OUT, `${JSON.stringify(map, null, 2)}\n`);
console.log(
	`Synced ${Object.keys(map).length / 2} locale redirect pairs (${Object.keys(TARGETS).length} cannibal pageIds) → functions/cannibal-redirects.json`,
);
