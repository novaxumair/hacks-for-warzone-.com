#!/usr/bin/env node
/** Fix remaining i18n key mismatches and ui-strings. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const UI_REPLACEMENTS = [
	['Warzone Cheats', 'Warzone Cheats'],
	['warzone cheats', 'warzone cheats'],
	['Warzone Cheats', 'Warzone Cheats'],
	['Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Call of Duty', 'Call of Duty: Warzone's],
	['Call of Duty: Warzone PC', 'Call of Duty: Warzone PC'],
	['for Call of Duty: Warzone', 'for Call of Duty: Warzone'],
	['Call of Duty: Warzone ', 'Call of Duty: Warzone '],
	['rust ', 'rust '],
	['Ricochet maintenance', 'Ricochet maintenance'],
	['Ricochet', 'Ricochet'],
	['Ricochet', 'Ricochet'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'raidFight'],
	['alMazrah', 'raidMap'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['Al Mazrah', 'Verdansk'],
	['Verdansk', 'Verdansk'],
	['farming run', 'farming run'],
	['extract', 'extract'],
	['cheatsforwarzone.com', 'cheatsforwarzone.com'],
	['Trucos Call of Duty: Warzone's, 'Trucos Call of Duty: Warzone's],
	['Triches Call of Duty: Warzone's, 'Triches Call of Duty: Warzone's],
	['Cheats Call of Duty: Warzone's, 'Cheats Call of Duty: Warzone's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of UI_REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

// Rebuild ui-strings from clean source
for (const file of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	let content = await readFile(path.join(SRC, 'scripts/i18n-data', file), 'utf8');
	content = apply(content);
	await writeFile(path.join(ROOT, 'scripts/i18n-data', file), content);
	console.log('Fixed', file);
}

// Fix pages-en eac key
let pagesEn = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), 'utf8');
pagesEn = pagesEn.replace(/\teac: \{/, "\t'ricochet': {");
pagesEn = pagesEn.replace(/Call of Duty: Warzone Call of Duty: Warzone/g, 'Call of Duty: Warzone's);
pagesEn = pagesEn.replace(/for Call of Duty: Warzone Call of Duty: Warzone/g, 'for Call of Duty: Warzone');
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), pagesEn);

// Fix pages-i18n
let pagesI18n = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), 'utf8');
pagesI18n = apply(pagesI18n);
pagesI18n = pagesI18n.replace(/'ricochet'/g, "'ricochet'");
pagesI18n = pagesI18n.replace(/eac:/g, "'ricochet':");
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), pagesI18n);

// Fix generate-i18n pages count
let gen = await readFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), 'utf8');
gen = gen.replace('Pages per locale: 25', 'Pages per locale: 17');
await writeFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), gen);

console.log('Fixed i18n keys.');
