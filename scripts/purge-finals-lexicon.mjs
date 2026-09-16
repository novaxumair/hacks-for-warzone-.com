#!/usr/bin/env node
/**
 * Purge Rust / wrong-game lexicon from EN sources and i18n translation overlays.
 * Run: node scripts/purge-finals-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** @type {Array<[RegExp|string, string]>} */
const replacements = [
	['published by Facepunch', 'published by Activision'],
	['published by Facepunch', 'published by Activision'],
	['When Facepunch ships', 'When Activision ships'],
	['Player, apex, and spike', 'Player, objective, and spike'],
	['apex and base awareness', 'objective and spike awareness'],
	['players, scientists, and weapon drops', 'players, objects, and weapon drops'],
	['Boxes, distance, and filters for players, scientists, and weapon drops.', 'Boxes, distance, and filters for players, objects, and weapon drops.'],
	['See players, scientists, and weapon drops through walls', 'See players, objects, and weapon drops through walls'],
	['monument zones, compounds, and high-traffic PvP areas', 'arena zones, spike sectors, and high-traffic PvP areas'],
	['monument zones and weapon drops runs', 'arena sectors and loadout drop routes'],
	['Clear monument zones and weapon drops runs', 'Clear arena sectors and loadout drop routes'],
	['Heli and Bradley filters', 'Objective and vehicle filters'],
	['compound zone fights', 'zone fights'],
	['compound fights', 'zone fights'],
	['forest and monument edge ambushes', 'arena corners and vertical fights'],
	['hills, forests, and monument edges', 'arenas, rooftops, and vertical routes'],
	['survival competitive fights happen across open terrain', 'Map fights happen across open terrain'],
	['weapon drops run', 'cashout route'],
	['weapon drops runs', 'loadout drop routes'],
	['scientists', 'contestants'],
	['Bradley', 'objective'],
	['monumentos', 'sectores de arena'],
	['monuments', 'arena sectors'],
	['monument', 'arena sector'],
	['compounds', 'spike sectors'],
	['compound', 'zone'],
];

const targets = [
	path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-pages-en.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-pages-i18n.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-page-content-translations-rest.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-page-content.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'faq-i18n.mjs'),
	path.join(ROOT, 'src', 'data', 'i18n', 'gallery-ui.ts'),
];

let totalHits = 0;
for (const file of targets) {
	let src = readFileSync(file, 'utf8');
	let hits = 0;
	for (const [from, to] of replacements) {
		if (typeof from === 'string') {
			if (!src.includes(from)) continue;
			const count = src.split(from).length - 1;
			src = src.split(from).join(to);
			hits += count;
		} else {
			const next = src.replace(from, to);
			if (next !== src) {
				hits += (src.match(from) ?? []).length;
				src = next;
			}
		}
	}
	if (hits > 0) {
		writeFileSync(file, src);
		console.log(`${path.relative(ROOT, file)}: ${hits} replacements`);
		totalHits += hits;
	}
}

console.log(`Total: ${totalHits} replacements`);

const gen = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-i18n-content.mjs')], {
	cwd: ROOT,
	stdio: 'inherit',
});
if (gen.status !== 0) process.exit(gen.status ?? 1);
console.log('Regenerated content.generated.ts');
