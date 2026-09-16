#!/usr/bin/env node
/**
 * Ensures every sitemap page URL uses the canonical apex from brand.ts (cheatsforwarzone.com).
 * Run after build: node scripts/validate-sitemap-canonical-domain.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readBrandUrl() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/(?:^|\n)\turl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing url');
	return m[1].replace(/\\'/g, "'").replace(/\/$/, '');
}

const CANONICAL = readBrandUrl();
const CANONICAL_HOST = new URL(CANONICAL).host;

const LEGACY_HOSTS = [
	'warzonehacks.org',
	'warzonecheats.org',
	'thefinalscheats.org',
	'rustcheats.co',
	'bestrustcheats.com',
	'rustcheat.co',
];

function collectSitemapFiles(dir, acc = []) {
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		if (statSync(full).isDirectory()) continue;
		if (/^sitemap.*\.xml$/i.test(entry)) acc.push(full);
	}
	return acc;
}

const distDir = path.join(ROOT, 'dist');
const files = collectSitemapFiles(distDir);
const pageLocs = [];
const badLocs = [];

for (const file of files) {
	const xml = readFileSync(file, 'utf8');
	const name = path.basename(file);

	for (const host of LEGACY_HOSTS) {
		if (xml.toLowerCase().includes(host)) {
			console.error(`[validate-sitemap-canonical-domain] ${name} contains legacy host: ${host}`);
			process.exitCode = 1;
		}
	}

	// All crawlable URLs in url blocks (page loc, hreflang, image:loc)
	const blocks = xml.split(/<url>/i).slice(1);
	for (const block of blocks) {
		const urls = [];
		for (const m of block.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1]);
		for (const m of block.matchAll(/hreflang="[^"]+"\s+href="([^"]+)"/g)) urls.push(m[1]);
		for (const m of block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) urls.push(m[1]);
		for (const loc of urls) {
			pageLocs.push(loc);
			if (loc.startsWith(`${CANONICAL}/`) || loc === `${CANONICAL}/`) continue;
			if (/^https:\/\//.test(loc) && !loc.startsWith(CANONICAL)) continue; // external image hosts
			badLocs.push({ file: name, loc });
		}
	}
}

if (badLocs.length > 0) {
	console.error('[validate-sitemap-canonical-domain] Non-canonical page <loc> URLs:');
	for (const { file, loc } of badLocs.slice(0, 10)) {
		console.error(`  ${file}: ${loc}`);
	}
	process.exitCode = 1;
}

const bannedLegacySlugLocs = pageLocs.filter((loc) => {
	if (!loc.startsWith(`${CANONICAL}/`)) return false;
	if (loc.includes('/images/')) return false;
	try {
		const pathname = new URL(loc).pathname;
		return (
			/\/(?:undetected-)?warzone-hacks(?:\/|$|-)/i.test(pathname) ||
			/\/best-warzone-hacks(?:\/|$)/i.test(pathname) ||
			/\/warzone-hacks-2026(?:\/|$)/i.test(pathname)
		);
	} catch {
		return false;
	}
});
if (bannedLegacySlugLocs.length > 0) {
	console.error('[validate-sitemap-canonical-domain] Banned legacy warzone slug in sitemap page URLs:');
	for (const loc of bannedLegacySlugLocs.slice(0, 10)) {
		console.error(`  ${loc}`);
	}
	process.exitCode = 1;
}

if (!process.exitCode) {
	console.log(
		`[validate-sitemap-canonical-domain] OK — ${pageLocs.length} page URLs use ${CANONICAL_HOST} only`,
	);
}
