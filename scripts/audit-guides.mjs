#!/usr/bin/env node
/** Audit guide URL → page mapping. Run after generate-guides.mjs */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const raw = readFileSync(path.join(ROOT, 'scripts/guide-urls.raw.txt'), 'utf8').trim().split(/\s+/);
const gen = readFileSync(path.join(ROOT, 'src/data/guides/guides.generated.ts'), 'utf8');

function norm(u) {
	return u.trim().replace(/^http:/i, 'https:').replace(/\/$/, '');
}

function field(name) {
	return [...gen.matchAll(new RegExp(`^\\t${name}:\\s*"([^"]*)"`, 'gm'))].map((m) => m[1]);
}

const uniq = [];
const seen = new Set();
for (const u of raw) {
	const n = norm(u);
	if (!seen.has(n)) {
		seen.add(n);
		uniq.push(n);
	}
}

const slugs = field('slug');
const games = field('game');
const urls = field('externalUrl');
const anchors = field('anchorText');
const images = field('imageUrl');

const guides = slugs.map((slug, i) => ({
	slug,
	game: games[i],
	externalUrl: urls[i],
	anchorText: anchors[i],
	imageUrl: images[i],
}));

const byUrl = new Map(guides.map((g) => [g.externalUrl, g]));
const missing = uniq.filter((u) => !byUrl.has(u));
const urlDupes = guides.length - new Set(guides.map((g) => g.externalUrl)).size;
const slugDupes = guides.length - new Set(guides.map((g) => g.slug)).size;

console.log(
	`Total Provided: ${raw.length} | Dedicated Pages Created: ${guides.length} | Missing: ${missing.length} | Duplicates: ${urlDupes + slugDupes}`,
);
if (missing.length) console.log('Missing URLs:', missing);
if (slugDupes) console.log('Duplicate slugs:', slugDupes);

console.log('\n| Provided URL | Game/Niche | Created Page Path | IGN Image Used | Anchor Text Used |');
console.log('|---|---|---|---|---|');
for (const url of uniq) {
	const g = byUrl.get(url);
	if (!g) continue;
	console.log(`| ${url} | ${g.game} | /guides/${g.slug}/ | ${g.imageUrl} | ${g.anchorText} |`);
}
