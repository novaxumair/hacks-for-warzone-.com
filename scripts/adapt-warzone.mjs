#!/usr/bin/env node
/**
 * One-time migration: Fortnite Cheats → Warzone Hacks.
 * Run from project root: node scripts/adapt-warzone.mjs
 */
import { readFile, writeFile, readdir, rm, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['fortnite-aimbot', 'warzone-aimbot'],
	['fortnite-esp', 'warzone-esp'],
	['fortnite-wallhack', 'warzone-wallhack'],
	['fortnite-radar-hack', 'warzone-radar-hack'],
	['undetected-fortnite-cheats', 'undetected-warzone-cheats'],
	['fortnite-cheats-2026', 'warzone-cheats-2026'],
	['eac-bypass-fortnite', 'ricochet-bypass'],
	['fortnite-hacks', 'warzone-hacks'],
	['fortnite-cheat-download', 'warzone-cheat-download'],
	['fortnite-mod-menu', 'warzone-mod-menu'],
	['fortnite-soft-aim', 'warzone-soft-aim'],
	['best-fortnite-cheats', 'best-warzone-cheats'],
	['fortnite-aimbot-hack', 'warzone-aimbot-hack'],
	['fortnite-esp-hack', 'warzone-esp-hack'],
	['fortnite-unlock-all', 'warzone-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['fortnitehack.net', 'warzonescheats.net'],
	['fortnitecheats.xyz', 'warzonescheats.xyz'],
	['fortnitecheats.net', 'warzonescheats.net'],
	['fortnitecheats.com', 'warzonescheats.com'],
	['support@fortnitehack.net', 'support@warzonescheats.net'],
	['/products/fortnite', '/products/warzone'],
	['fortnite-esp-wallhack', 'warzone-esp-wallhack'],
	['fortnite-esp-hack', 'warzone-esp-hack'],
	['fortnite-aimbot-hack', 'warzone-aimbot-hack'],
	['undetected-fortnite-cheats', 'undetected-warzone-cheats'],
	['fortnite-cheats-2026', 'warzone-cheats-2026'],
	['fortnite-radar-hack', 'warzone-radar-hack'],
	['fortnite-wallhack', 'warzone-wallhack'],
	['eac-bypass-fortnite', 'ricochet-bypass'],
	['fortnite-cheat-download', 'warzone-cheat-download'],
	['fortnite-mod-menu', 'warzone-mod-menu'],
	['fortnite-soft-aim', 'warzone-soft-aim'],
	['best-fortnite-cheats', 'best-warzone-cheats'],
	['fortnite-unlock-all', 'warzone-unlock-all'],
	['fortnite-hacks', 'warzone-hacks'],
	['fortnite-aimbot', 'warzone-aimbot'],
	['fortnite-esp', 'warzone-esp'],
	["'eac-bypass'", "'ricochet'"],
	['| eac-bypass', '| ricochet'],
	['fortnite-cheats', 'call-of-duty-warzone-cheats'],
	['call-of-duty-warzone-cheats-buyers-guide', 'call-of-duty-warzone-cheats-buyers-guide'],
	['Fortnite Hacks', 'Warzone Hacks'],
	['Fortnite Cheats', 'Warzone Cheats'],
	['Fortnite cheats', 'Warzone cheats'],
	['Fortnite cheat', 'Warzone cheat'],
	['FortniteCheatsSite', 'WarzoneCheatsSite'],
	['Fortnite Intel', 'Warzone Intel'],
	['Easy Anti-Cheat (EAC)', 'Ricochet anti-cheat'],
	['Easy Anti-Cheat', 'Ricochet anti-cheat'],
	['EAC maintenance', 'Ricochet maintenance'],
	['EAC bypass', 'Ricochet bypass'],
	['EAC Bypass', 'Ricochet Bypass'],
	['EAC patches', 'Ricochet patches'],
	['EAC patch', 'Ricochet patch'],
	['EAC updates', 'Ricochet updates'],
	['EAC update', 'Ricochet update'],
	['after EAC', 'after Ricochet'],
	['fortnite hacks', 'warzone hacks'],
	['fortnite cheats', 'warzone cheats'],
	['survival island, Zero Build, and official servers', 'Verdansk, Urzikstan, and Rebirth Island'],
	['survival island, Zero Build and official servers', 'Verdansk, Urzikstan and Rebirth Island'],
	['survival island, Zero Build et lobbies compétitifs', 'Verdansk, Urzikstan et Rebirth Island'],
	['survival island, Zero Build e lobbies competitivi', 'Verdansk, Urzikstan e Rebirth Island'],
	['survival island, Zero Build und Competitive-Lobbys', 'Verdansk, Urzikstan und Rebirth Island'],
	['reboot van rotations', 'gulag fights'],
	['reboot van fight', 'gulag fight'],
	['respawn rounds', 'gulag rounds'],
	['reboot van', 'gulag'],
	['Zero Build and survival', 'Resurgence and survival'],
	['BR and Zero Build', 'BR and Resurgence'],
	['BR & Zero Build', 'BR & Resurgence'],
	['Zero Build', 'Resurgence'],
	['weapon drops chests', 'fresh weapon drops'],
	['weapon drops chest', 'loadout drop'],
	['survival island', 'Verdansk'],
	['survival-island', 'al-mazrah'],
	['supply drop', 'UAV'],
	['species', 'species'],
	['operators', 'operators'],
	['fortniteImages', 'warzoneImages'],
	["from './fortnite'", "from './warzone'"],
	["from '../data/fortnite'", "from '../data/warzone'"],
	['fortnitecheats', 'warzonescheats'],
	['project-name=fortnitecheats', 'project-name=warzonescheats'],
	['name = "fortnitecheats"', 'name = "warzonescheats"'],
	['https://fortnitehack.net', 'https://warzonescheats.net'],
	['trucos-fortnite', 'trucos-warzone'],
	['triche-fortnite', 'triche-warzone'],
	['cheats-fortnite', 'cheats-warzone'],
	['trucchi-fortnite', 'trucchi-warzone'],
	['cheaty-fortnite', 'cheaty-warzone'],
	['chity-fortnite', 'chity-warzone'],
	['chitov-fortnite', 'chitov-warzone'],
	['chitiv-fortnite', 'chitiv-warzone'],
	['cheatow-fortnite', 'cheatow-warzone'],
	['hile-fortnite', 'hile-warzone'],
	['fortnite-hile', 'warzone-hile'],
	['fortnite-esp-chity', 'warzone-esp-chity'],
	['fortnite-aimbot-chity', 'warzone-aimbot-chity'],
	['unentdeckte-fortnite-cheats', 'unentdeckte-warzone-cheats'],
	['cheats-fortnite-indetectaveis', 'cheats-warzone-indetectaveis'],
	['trucchi-fortnite-indetectabili', 'trucchi-warzone-indetectabili'],
	['niewykrywalne-cheats-fortnite', 'niewykrywalne-cheats-warzone'],
	['nedecektiruemye-chity-fortnite', 'nedecektiruemye-chity-warzone'],
	['tespit-edilemeyen-fortnite-hileleri', 'tespit-edilemeyen-warzone-hileleri'],
	['nedecektovani-chity-fortnite', 'nedecektovani-chity-warzone'],
	['cheats-fortnite-nedetectabile', 'cheats-warzone-nedetectabile'],
	['basta-fortnite-cheats', 'basta-warzone-cheats'],
	['fortnite-cheats-funktionen', 'warzone-cheats-funktionen'],
	['fortnite-cheats-functies', 'warzone-cheats-functies'],
	['caracteristicas-trucos-fortnite', 'caracteristicas-trucos-warzone'],
	['fonctionnalites-triche-fortnite', 'fonctionnalites-triche-warzone'],
	['recursos-cheats-fortnite', 'recursos-cheats-warzone'],
	['funzioni-trucchi-fortnite', 'funzioni-trucchi-fortnite'],
	['Call of Duty: Warzone', 'Call of Duty: Warzone'],
	['Call of Duty Warzone', 'Call of Duty Warzone'],
	['Fortnite', 'Call of Duty: Warzone'],
	['fortnite', 'warzone'],
	['eac-bypass', 'ricochet-bypass'],
	['eac', 'ricochet'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.endsWith('adapt-warzone.mjs') || file.endsWith('adapt-fortnite.mjs')) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameFortniteTs() {
	const from = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	const to = path.join(ROOT, 'src', 'data', 'warzone.ts');
	try {
		await rename(from, to);
		console.log('Renamed fortnite.ts → warzone.ts');
	} catch (e) {
		console.warn(`fortnite.ts rename: ${e.message}`);
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'warzone-aimbot': 'warzone-aimbot',
		'warzone-esp': 'warzone-esp',
		'warzone-wallhack': 'wallhack',
		'warzone-radar-hack': 'radar',
		'undetected-warzone-cheats': 'undetected',
		'warzone-cheats-2026': 'cheats-2026',
		'ricochet-bypass': 'ricochet',
		'warzone-hacks': 'hacks',
		'warzone-cheat-download': 'cheat-download',
		'warzone-mod-menu': 'mod-menu',
		'warzone-soft-aim': 'soft-aim',
		'best-warzone-cheats': 'best-cheats',
		'warzone-aimbot-hack': 'aimbot-hack',
		'warzone-esp-hack': 'esp-hack',
		'warzone-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (file.includes('fortnite') || file.includes('call-of-duty-warzone')) {
			const newName = file
				.replace(/fortnite-cheats/g, 'call-of-duty-warzone-cheats')
				.replace(/fortnite-/g, 'warzone-')
				.replace(/fortnite/g, 'call-of-duty-warzone');
			if (newName !== file) {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Fortnite Cheats → Warzone Hacks...\n');
	await renamePageDirs();
	await renameFortniteTs();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next steps:');
	console.log('  node scripts/generate-i18n-content.mjs');
	console.log('  node scripts/generate-blog-posts.mjs');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
