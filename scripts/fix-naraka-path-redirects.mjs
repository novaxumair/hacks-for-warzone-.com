#!/usr/bin/env node
/**
 * Fix path-redirects.json: rewrite warzone destinations → naraka and add legacy warzone → naraka 301s.
 * Run: node scripts/fix-naraka-path-redirects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SLUG_MAP = [
	['warzone-hacks', 'warzone-cheats'],
	['warzone-esp', 'warzone-esp'],
	['warzone-aimbot', 'warzone-aimbot'],
	['warzone-wallhack', 'warzone-wallhack'],
	['warzone-radar-hack', 'warzone-radar-hack'],
	['warzone-soft-aim', 'warzone-soft-aim'],
	['warzone-mod-menu', 'warzone-mod-menu'],
	['warzone-cheat-download', 'warzone-cheat-download'],
	['warzone-aimbot-hack', 'warzone-aimbot-hack'],
	['warzone-esp-hack', 'warzone-esp-hack'],
	['warzone-unlock-all', 'warzone-unlock-all'],
	['undetected-warzone-hacks', 'undetected-warzone-cheats'],
	['best-warzone-hacks', 'best-warzone-cheats'],
	['warzone-hacks-2026', 'warzone-cheats-2026'],
	['ricochet-bypass', 'ricochet-bypass'],
	['warzone-cheats', 'warzone-cheats'],
	['warzone-cheat', 'warzone-cheat'],
	['hacks-warzone', 'cheats-warzone'],
	['warzone', 'naraka'],
];

function rewritePath(p) {
	let out = p;
	for (const [from, to] of SLUG_MAP) {
		out = out.split(from).join(to);
	}
	return out;
}

function addPair(map, from, to) {
	if (!from || !to || from === to) return;
	map[from] = to;
	const noSlash = from.replace(/\/$/, '');
	if (noSlash !== from) map[noSlash] = to;
}

const raw = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const fixed = {};

for (const [key, value] of Object.entries(raw)) {
	const newKey = rewritePath(key);
	const newValue = rewritePath(value);
	addPair(fixed, newKey, newValue);
}

// Legacy warzone EN paths → naraka
const EN_REDIRECTS = [
	['/warzone-hacks', '/warzone-cheats/'],
	['/warzone-esp', '/warzone-esp/'],
	['/warzone-aimbot', '/warzone-aimbot/'],
	['/warzone-wallhack', '/warzone-wallhack/'],
	['/warzone-radar-hack', '/warzone-radar-hack/'],
	['/warzone-soft-aim', '/warzone-soft-aim/'],
	['/warzone-mod-menu', '/warzone-mod-menu/'],
	['/warzone-cheat-download', '/warzone-cheat-download/'],
	['/warzone-aimbot-hack', '/warzone-aimbot-hack/'],
	['/warzone-esp-hack', '/warzone-esp-hack/'],
	['/warzone-unlock-all', '/warzone-unlock-all/'],
	['/undetected-warzone-hacks', '/undetected-warzone-cheats/'],
	['/best-warzone-hacks', '/best-warzone-cheats/'],
	['/warzone-hacks-2026', '/warzone-cheats-2026/'],
	['/ricochet-bypass', '/ricochet-bypass/'],
	['/warzone-cheats', '/warzone-cheats/'],
];

for (const [from, to] of EN_REDIRECTS) {
	addPair(fixed, from, to);
	addPair(fixed, `${from}/`, to);
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(fixed, null, 2)}\n`);
console.log(`fix-naraka-path-redirects: ${Object.keys(fixed).length} redirect entries`);
