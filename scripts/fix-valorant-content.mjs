#!/usr/bin/env node
/**
 * Clean leftover Naraka/Bladepoint/Ricochet/checkout references after Call of Duty: Warzone rebrand.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	['Call of Duty: Warzone', 'Call of Duty: Warzone'],
	['warzone', 'warzone'],
	['Call of Duty: Warzone', 'Call of Duty: Warzone'],
	['warzone', 'warzone'],
	['warzone cheats', 'warzone cheats'],
	['Warzone cheats', 'Warzone cheats'],
	['Warzone Cheats', 'Warzone Cheats'],
	['warzone hack', 'warzone hack'],
	['warzone esp', 'warzone esp'],
	['warzone aimbot', 'warzone aimbot'],
	['warzone wallhack', 'warzone wallhack'],
	['warzone soft aim', 'warzone soft aim'],
	['warzone mod menu', 'warzone mod menu'],
	['warzone radar', 'warzone radar'],
	['warzone patch', 'warzone patch'],
	['warzone/warzone', 'warzone/warzone'],
	['Ricochet', 'Ricochet'],
	['ricochet', 'ricochet'],
	['Battle Royale', 'Battle Royale'],
	['Immortal lobbies', 'Immortal lobbies'],
	['Haven', 'Haven'],
	['Bind', 'Bind'],
	['Ascent', 'Ascent'],
	['Split', 'Split'],
	['Lotus', 'Lotus'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['agent ability', 'agent ability'],
	['agents', 'agents'],
	['Agents', 'Agents'],
	['agent ', 'agent '],
	['Agent ', 'Agent '],
	['spike', 'spike'],
	['Spike', 'Spike'],
	['weapon drops', 'weapon drops'],
	['Weapon drops', 'Weapon drops'],
	['operator', 'operator'],
	['Operator', 'Operator'],
	['assault rifle vs SMG', 'assault rifle vs SMG'],
	['vanLifeCall of Duty: Warzone', 'vanLifeCall of Duty: Warzone'],
	['warzone-ricochet-bypass', 'warzone-ricochet-bypass'],
	['meilleures-triches-warzone', 'meilleures-triches-warzone'],
	['checkout', 'checkout'],
	['checkout', 'checkout'],
	['cheatsforwarzone', 'cheatsforwarzone'],
	['EXT.warzone', 'EXT.warzone'],
	['${EXT.warzone}', '${EXT.warzone}'],
	['ricochet:', 'ricochet:'],
	["'ricochet'", "'ricochet'"],
	['/images/warzone', '/images/warzone'],
	['antiCheatShort": "Ricochet', 'antiCheatShort": "Ricochet'],
	['antiCheatShort": "Ricochet supported', 'antiCheatShort": "Ricochet supported'],
];

const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.md']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
		if (file.includes('adapt-naraka') || file.includes('adapt-warzone-site')) continue;
		const original = await readFile(file, 'utf8');
		let updated = original;
		for (const [from, to] of REPLACEMENTS) {
			updated = updated.split(from).join(to);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Fixed ${changed} files`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
