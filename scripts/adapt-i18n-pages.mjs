#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Call of Duty: Warzone source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['warzone-esp', 'warzone-esp'],
	['warzone-aimbot', 'warzone-aimbot'],
	["'ricochet'", "'ricochet'"],
	['ricochet-bypass', 'ricochet-bypass'],
	['undetected-warzone-cheats', 'undetected-warzone-cheats'],
	['warzone-wallhack', 'warzone-wallhack'],
	['warzone-radar-hack', 'warzone-radar-hack'],
	['warzone-cheats-2026', 'warzone-cheats-2026'],
	['warzone-cheats', 'warzone-cheats'],
	['the-rust', 'rust'],
	['Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Warzone Cheats', 'Warzone Cheats'],
	['warzone cheats', 'warzone cheats'],
	['warzone cheat', 'warzone cheat'],
	['Call of Duty: Warzone ESP', 'Call of Duty: Warzone ESP'],
	['Call of Duty: Warzone Aimbot', 'Call of Duty: Warzone Aimbot'],
	['warzone wallhack', 'Call of Duty: Warzone wallhack'],
	['warzone radar', 'Call of Duty: Warzone radar'],
	['Call of Duty: Warzone competitive fights', 'Call of Duty: Warzone competitive fights'],
	['Call of Duty: Warzone combat', 'Call of Duty: Warzone combat'],
	['Call of Duty: Warzone patches', 'Call of Duty: Warzone patches'],
	['Call of Duty: Warzone updates', 'Call of Duty: Warzone updates'],
	['Call of Duty: Warzone setup', 'Call of Duty: Warzone setup'],
	['Call of Duty: Warzone license', 'Call of Duty: Warzone license'],
	['Call of Duty: Warzone licenses', 'Call of Duty: Warzone licenses'],
	['Call of Duty: Warzone matches', 'Call of Duty: Warzone matches'],
	['in Call of Duty: Warzone', 'in Call of Duty: Warzone'],
	['for Call of Duty: Warzone', 'for Call of Duty: Warzone'],
	['Call of Duty: Warzone on', 'Call of Duty: Warzone on'],
	['Call of Duty: Warzone or', 'Call of Duty: Warzone or'],
	['Call of Duty: Warzone\'s', 'Call of Duty: Warzone\'s'],
	['Call of Duty: Warzone ', 'Call of Duty: Warzone '],
	['Ricochet', 'Ricochet'],
	['Ricochet maintenance', 'Ricochet maintenance'],
	['Ricochet bypass', 'Ricochet bypass'],
	['Ricochet Bypass', 'Ricochet Bypass'],
	['Ricochet', 'Ricochet'],
	['ricochet', 'ricochet'],
	['support@cheatsforwarzone.com', 'support@cheatsforwarzone.com'],
	['maps, sites, and buy stations', 'maps, sites, and buy stations'],
	['maps, sites and buy stations', 'maps, sites and buy stations'],
	['raid fights', 'raid fights'],
	['raid fight', 'raid fight'],
	['match rounds', 'match rounds'],
	['extract', 'extract'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['raid timer', 'raid timer'],
	['Battle Royale rounds and Battle Royale matches', 'Battle Royale rounds and Battle Royale matches'],
	['Battle Royale rounds and Battle Royale matches', 'Battle Royale rounds and Battle Royale matches'],
	['agents & ranked teams', 'agents & ranked teams'],
	['high-value weapon drops', 'high-value weapon drops'],
	['high-value weapon drops', 'high-value weapon drops'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['Call of Duty combat pace', 'Call of Duty: Warzone combat pace'],
	['COD', 'Call of Duty: Warzone's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Warzone Cheats',
	game: 'Call of Duty: Warzone's,
	checkout: 'checkout',
	eac: 'Ricochet',
};`,
);
phrases = phrases.replace(/KW\.eac/g, 'KW.eac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'maps, sites, and buy stations'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
