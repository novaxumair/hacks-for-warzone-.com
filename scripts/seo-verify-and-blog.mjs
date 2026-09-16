#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
const bad = [
	'supply-drop',
	'BR-critical',
	'BR loop',
	'vehicles',
	'ranked block',
	'Controllers',
	'Battle Pass',
	'reboot rounds',
	'endgame circles',
	'Verdansk',
	'Activision',
	'soft aim, and .',
	'ESP, Soft Aim,',
	'best-warzone-cheats',
	'warzone-esp-hack',
	'warzone-aimbot-hack',
];
console.log('--- pages-en leftovers ---');
for (const b of bad) {
	const n = pages.split(b).length - 1;
	if (n) console.log(`${b}: ${n}`);
}

const gen = readFileSync('src/data/i18n/content.generated.ts', 'utf8');
const enEnd = gen.indexOf('\n\t\tes:');
const en = enEnd > 0 ? gen.slice(0, enEnd) : gen.slice(0, 120000);
console.log('--- EN generated leftovers ---');
for (const b of [
	'supply-drop',
	'BR-critical',
	'full BR',
	'vehicles before',
	'Controllers',
	'Battle Pass',
	'RRicochet',
	'soft aim, and .',
	'best-warzone-cheats',
	'warzone-esp-hack',
]) {
	const n = en.split(b).length - 1;
	if (n) console.log(`${b}: ${n}`);
}

const blog = readFileSync('src/data/blog/posts.generated.ts', 'utf8');
const reps = [
	['V-Bucks', 'scrap'],
	['Item Shop', 'in-game store'],
	['Battle Pass', 'patch cycle progression'],
	['FNCS', 'Call of Duty: Warzone community event'],
	['Hammer AR', 'M4A1'],
	['mythics', 'meta guns'],
	['island codes', 'aim train sessions maps'],
	['Creative 1v1s', 'aim training'],
	['creative 1v1s', 'aim training'],
	['Epic health', 'Battlestate status'],
	['Epic terms', 'Activision terms'],
	["Epic's Ricochet", 'Ricochet'],
	['Epic patch', 'Call of Duty: Warzone patch'],
	['EliteFN', 'a Fortnite cheat shop'],
	['GhostWare', 'a slim cheat vendor'],
	['CheatSpike', 'another cheat shop'],
	['/warzone-aimbot-hack/', '/warzone-aimbot/'],
	['/warzone-esp-hack/', '/warzone-esp/'],
	['/best-warzone-cheats/', '/'],
	['best warzone cheats', 'warzone cheats'],
	['hot drops', 'hot spawns'],
	['ranked grinders', 'session grinders'],
	['before Battle Royale', 'before a match'],
];
let s = blog;
let n = 0;
for (const [a, b] of reps) {
	if (s.includes(a)) {
		s = s.split(a).join(b);
		n += 1;
	}
}
writeFileSync('src/data/blog/posts.generated.ts', s);
console.log('blog patterns fixed:', n);
