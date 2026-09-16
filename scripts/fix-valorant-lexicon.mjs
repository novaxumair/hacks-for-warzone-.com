#!/usr/bin/env node
/**
 * Final-pass Call of Duty: Warzone lexicon cleanup — removes leftover Call of Duty: Warzone/Vanguard strings.
 * Run: node scripts/fix-warzone-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro', 'warzone-hacks-org']);

/** Ordered — specific patterns first. */
const REPLACEMENTS = [
	['warzone ricochet bypass', 'naraka ricochet bypass'],
	['warzone soft aim', 'warzone soft aim'],
	['warzone mod menu', 'warzone mod menu'],
	['warzone external hack', 'naraka external cheat'],
	['warzone 2d radar', 'naraka 2d radar'],
	['soft aim warzone', 'soft aim naraka'],
	['ricochet bypass warzone', 'ricochet bypass naraka'],
	['warzone anti cheat bypass', 'naraka anti cheat bypass'],
	['hwid spoofer warzone', 'hwid spoofer naraka'],
	['ricochet update', 'Ricochet update'],
	['ricochet undetected', 'Vanguard undetected'],
	['Vanguard Safe', 'Vanguard Safe'],
	['Ricochet maintenance', 'Ricochet maintenance'],
	['Vanguard rebuilds', 'Vanguard rebuilds'],
	['Ricochet patches', 'Ricochet patches'],
	['Vanguard and Call of Duty: Warzone', 'Vanguard and Call of Duty: Warzone'],
	['Vanguard or Call of Duty: Warzone', 'Vanguard or Call of Duty: Warzone'],
	['Vanguard', 'Vanguard'],
	['ricochet', 'ricochet'],
	['vanlifewarzone', 'vanlifenaraka'],
	['vanLifeCall of Duty: Warzone', 'vanLifeCall of Duty: Warzone'],
	['valo hack', 'warzone cheat'],
	['valo cheats', 'warzone cheats'],
	['warzone-patch-notes', 'naraka-patch-notes'],
	['warzone-cosmetics', 'naraka-cosmetics'],
	['warzone-weapon-tier-list', 'naraka-weapon-tier-list'],
	['warzone-weapon drops-run', 'naraka-weapon drops-run'],
	['warzone-competitive-meta', 'naraka-competitive-meta'],
	['warzone-cashout-routes', 'naraka-weapon drops-routes'],
	['warzone-pro-settings', 'naraka-pro-settings'],
	['warzone-warmup-routine', 'naraka-warmup-routine'],
	['free-warzone-hack-download', 'free-warzone-cheat-download'],
	['how-long-warzone-hack-setup-takes', 'how-long-warzone-cheat-setup-takes'],
	['agent tiers', 'agent tiers'],
	['agents and abilities', 'agents and weapons'],
	['agents &', 'agents &'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['internalLinks.ricochet', 'internalLinks.ricochet'],
	['Call of Duty: Warzone hacks', 'Warzone cheats'],
	['warzone hacks', 'warzone cheats'],
	['warzone hack', 'warzone cheat'],
	['{game} hacks', '{game} cheats'],
	['Hacks FAQ', 'Cheats FAQ'],
	['navPreview: \'Hacks\'', "navPreview: 'Cheats'"],
	["navPreview: 'Hacks'", "navPreview: 'Cheats'"],
	['/products/warzone', '/products/warzone'],
	['valo/valo cheats', 'naraka/warzone cheats'],
	['antiCheat: \'Vanguard\'', "antiCheat: 'Vanguard'"],
	['sitemap-meta.ts', 'sitemap-meta.ts'], // noop anchor
];

function walk(dir, files = []) {
	for (const name of readdirSync(dir)) {
		if (SKIP_DIRS.has(name)) continue;
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

const TEXT_EXT = /\.(ts|tsx|js|mjs|astro|css|json|toml|txt|md|mdc)$/i;
let changed = 0;

for (const file of walk(ROOT)) {
	if (!TEXT_EXT.test(file)) continue;
	if (path.basename(file) === 'fix-warzone-lexicon.mjs') continue;
	if (path.basename(file) === 'adapt-warzone-site.mjs') continue;
	if (path.basename(file) === 'adapt-warzone.mjs') continue;
	let text = readFileSync(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		text = text.split(from).join(to);
	}
	if (text !== original) {
		writeFileSync(file, text, 'utf8');
		changed++;
	}
}

console.log(`fix-warzone-lexicon: ${changed} file(s) updated`);
