#!/usr/bin/env node
/** Final pass: fix remaining Call of Duty: Warzone references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['warzoneImages', 'warzoneImages'],
	["from '../data/warzone'", "from '../data/warzone'"],
	["from './warzone'", "from './warzone'"],
	['/undetected-warzone-cheats/', '/undetected-warzone-cheats/'],
	['/warzone-wallhack/', '/warzone-wallhack/'],
	['/warzone-radar-hack/', '/warzone-radar-hack/'],
	['/ricochet-bypass/', '/ricochet-bypass/'],
	['/warzone-cheats-2026/', '/warzone-cheats-2026/'],
	['/warzone-aimbot/', '/warzone-aimbot/'],
	['/warzone-esp/', '/warzone-esp/'],
	['/warzone-cheats/', '/warzone-esp/'],
	['Warzone Cheats', 'Warzone Cheats'],
	['warzone cheats', 'warzone cheats'],
	['thefinals wallhack', 'Call of Duty: Warzone wallhack'],
	['warzone radar', 'Call of Duty: Warzone radar'],
	['Call of Duty: Warzone Aimbot', 'Call of Duty: Warzone Aimbot'],
	['Call of Duty: Warzone ESP', 'Call of Duty: Warzone ESP'],
	['Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Ricochet', 'Ricochet'],
	['ricochet', 'ricochet'],
	['cheatsforwarzone.com', 'cheatsforwarzone.com'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'raidFight'],
	['alMazrah', 'raidMap'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
