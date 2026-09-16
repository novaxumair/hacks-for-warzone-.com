#!/usr/bin/env node
/**
 * One-time migration: Warzone Hacks → Tarkov Cheats (Escape from Tarkov).
 * Domain: tarkovcheats.org
 * Run from project root: node scripts/adapt-tarkov.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['warzone-aimbot', 'tarkov-aimbot'],
	['warzone-esp', 'tarkov-esp'],
	['warzone-wallhack', 'tarkov-wallhack'],
	['warzone-radar-hack', 'tarkov-radar-hack'],
	['undetected-warzone-cheats', 'undetected-tarkov-cheats'],
	['warzone-cheats-2026', 'tarkov-cheats-2026'],
	['ricochet-bypass', 'battleye-bypass'],
	['warzone-hacks', 'tarkov-cheats'],
	['warzone-cheat-download', 'tarkov-cheat-download'],
	['warzone-mod-menu', 'tarkov-mod-menu'],
	['warzone-soft-aim', 'tarkov-soft-aim'],
	['best-warzone-cheats', 'best-tarkov-cheats'],
	['warzone-aimbot-hack', 'tarkov-aimbot-hack'],
	['warzone-esp-hack', 'tarkov-esp-hack'],
	['warzone-unlock-all', 'tarkov-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://warzonehacks.net', 'https://tarkovcheats.org'],
	['https://www.warzonehacks.net', 'https://www.tarkovcheats.org'],
	['www.warzonehacks.net', 'www.tarkovcheats.org'],
	['warzonehacks.net', 'tarkovcheats.org'],
	['support@warzonehacks.net', 'support@tarkovcheats.org'],
	['support@warzonescheats.net', 'support@tarkovcheats.org'],
	['warzonescheats.net', 'tarkovcheats.org'],
	['warzonescheats.com', 'tarkovcheats.org'],
	['warzonescheats.xyz', 'tarkovcheats.org'],
	['/products/warzone', '/products/tarkov'],
	['project-name=warzonehacks', 'project-name=besttarkovcheats'],
	['project-name=warzonescheats', 'project-name=besttarkovcheats'],
	['name = "warzonehacks"', 'name = "besttarkovcheats"'],
	['name = "warzonescheats"', 'name = "besttarkovcheats"'],
	['"name": "warzone-hacks"', '"name": "tarkov-cheats"'],
	['warzone-esp-player-tags', 'tarkov-esp-player-tags'],
	['warzone-wallhack-skeleton', 'tarkov-wallhack-skeleton'],
	['warzone-aimbot-sniper', 'tarkov-aimbot-sniper'],
	['warzone-aimbot-skeleton', 'tarkov-aimbot-skeleton'],
	['warzone-esp-radar', 'tarkov-esp-radar'],
	['warzone-cheats-combat', 'tarkov-cheats-combat'],
	['warzone-hacks-logo', 'tarkov-cheats-logo'],
	['warzone-hero-banner', 'tarkov-hero-banner'],
	['warzone-hero-ghost', 'tarkov-hero-ghost'],
	['warzone-hero-source', 'tarkov-hero-source'],
	['undetected-warzone-cheats', 'undetected-tarkov-cheats'],
	['best-warzone-cheats', 'best-tarkov-cheats'],
	['warzone-cheat-download', 'tarkov-cheat-download'],
	['warzone-cheats-2026', 'tarkov-cheats-2026'],
	['warzone-radar-hack', 'tarkov-radar-hack'],
	['warzone-aimbot-hack', 'tarkov-aimbot-hack'],
	['warzone-esp-hack', 'tarkov-esp-hack'],
	['warzone-unlock-all', 'tarkov-unlock-all'],
	['warzone-soft-aim', 'tarkov-soft-aim'],
	['warzone-mod-menu', 'tarkov-mod-menu'],
	['warzone-wallhack', 'tarkov-wallhack'],
	['warzone-hacks', 'tarkov-cheats'],
	['warzone-aimbot', 'tarkov-aimbot'],
	['warzone-esp', 'tarkov-esp'],
	['ricochet-bypass', 'battleye-bypass'],
	["'ricochet'", "'battleye'"],
	['| ricochet', '| battleye'],
	['pageId="ricochet"', 'pageId="battleye"'],
	['pageId: \'ricochet\'', "pageId: 'battleye'"],
	['"ricochet"', '"battleye"'],
	['call-of-duty-warzone-cheats', 'escape-from-tarkov-cheats'],
	['Call of Duty: Warzone', 'Escape from Tarkov'],
	['Call of Duty Warzone', 'Escape from Tarkov'],
	['Warzone Hacks', 'Tarkov Cheats'],
	['Warzone Cheats', 'Tarkov Cheats'],
	['Warzone cheats', 'Tarkov cheats'],
	['Warzone cheat', 'Tarkov cheat'],
	['Warzone hacks', 'Tarkov cheats'],
	['Warzone hack', 'Tarkov cheat'],
	['WarzoneCheatsSite', 'TarkovCheatsSite'],
	['Warzone Intel', 'Tarkov Intel'],
	['Ricochet anti-cheat', 'BattlEye anti-cheat'],
	['Ricochet maintenance', 'BattlEye maintenance'],
	['Ricochet bypass', 'BattlEye bypass'],
	['Ricochet Bypass', 'BattlEye Bypass'],
	['Ricochet patches', 'BattlEye patches'],
	['Ricochet patch', 'BattlEye patch'],
	['Ricochet updates', 'BattlEye updates'],
	['Ricochet update', 'BattlEye update'],
	['after Ricochet', 'after BattlEye'],
	['RICOCHET', 'BattlEye'],
	['Ricochet', 'BattlEye'],
	['ricochet', 'battleye'],
	['warzone hacks', 'tarkov cheats'],
	['warzone cheats', 'tarkov cheats'],
	['warzone hack', 'tarkov cheat'],
	['warzone cheat', 'tarkov cheat'],
	['Verdansk, Urzikstan, and Rebirth Island', 'Customs, Woods, and Streets of Tarkov'],
	['Verdansk, Urzikstan and Rebirth Island', 'Customs, Woods and Streets of Tarkov'],
	['Verdansk, Urzikstan et Rebirth Island', 'Customs, Woods et Streets of Tarkov'],
	['Verdansk, Urzikstan e Rebirth Island', 'Customs, Woods e Streets of Tarkov'],
	['Verdansk, Urzikstan und Rebirth Island', 'Customs, Woods und Streets of Tarkov'],
	['gulag fights', 'extract fights'],
	['gulag fight', 'extract fight'],
	['gulag rounds', 'raid rounds'],
	['gulag', 'extract'],
	['BR and Resurgence-style modes', 'PMC raids and Scav runs'],
	['BR and Resurgence', 'PMC raids and Scav runs'],
	['BR & Resurgence', 'PMC & Scav'],
	['Resurgence and Battle Royale', 'PMC raids and Scav runs'],
	['Battle Royale', 'raid'],
	['Resurgence', 'Scav run'],
	['resurgence', 'scav run'],
	['contract markers', 'extract and weapon drops markers'],
	['loadout drops', 'high-value weapon drops'],
	['loadout drop', 'high-value weapon drops'],
	['Operators', 'PMCs'],
	['operators', 'PMCs'],
	['UAV', 'extract timer'],
	['warzoneImages', 'tarkovImages'],
	["from './warzone'", "from './tarkov'"],
	["from '../data/warzone'", "from '../data/tarkov'"],
	["from '../../data/warzone'", "from '../../data/tarkov'"],
	['fetch-warzone-images', 'fetch-tarkov-images'],
	['warzone-hack-overlays', 'tarkov-hack-overlays'],
	['trucos-warzone', 'trucos-tarkov'],
	['triche-warzone', 'triche-tarkov'],
	['cheats-warzone', 'cheats-tarkov'],
	['trucchi-warzone', 'trucchi-tarkov'],
	['cheaty-warzone', 'cheaty-tarkov'],
	['chity-warzone', 'chity-tarkov'],
	['chitov-warzone', 'chitov-tarkov'],
	['chitiv-warzone', 'chitiv-tarkov'],
	['cheatow-warzone', 'cheatow-tarkov'],
	['hile-warzone', 'hile-tarkov'],
	['warzone-hile', 'tarkov-hile'],
	['warzone-esp-chity', 'tarkov-esp-chity'],
	['warzone-aimbot-chity', 'tarkov-aimbot-chity'],
	['unentdeckte-warzone-cheats', 'unentdeckte-tarkov-cheats'],
	['cheats-warzone-indetectaveis', 'cheats-tarkov-indetectaveis'],
	['trucchi-warzone-indetectabili', 'trucchi-tarkov-indetectabili'],
	['niewykrywalne-cheats-warzone', 'niewykrywalne-cheats-tarkov'],
	['nedecektiruemye-chity-warzone', 'nedecektiruemye-chity-tarkov'],
	['tespit-edilemeyen-warzone-hileleri', 'tespit-edilemeyen-tarkov-hileleri'],
	['nedecektovani-chity-warzone', 'nedecektovani-chity-tarkov'],
	['cheats-warzone-nedetectabile', 'cheats-tarkov-nedetectabile'],
	['basta-warzone-cheats', 'basta-tarkov-cheats'],
	['warzone-cheats-funktionen', 'tarkov-cheats-funktionen'],
	['warzone-cheats-functies', 'tarkov-cheats-functies'],
	['caracteristicas-trucos-warzone', 'caracteristicas-trucos-tarkov'],
	['fonctionnalites-triche-warzone', 'fonctionnalites-triche-tarkov'],
	['recursos-cheats-warzone', 'recursos-cheats-tarkov'],
	['call-of-duty-warzone', 'escape-from-tarkov'],
	['Buy Warzone Hacks', 'Buy Tarkov Cheats'],
	['Warzone', 'Tarkov'],
	['warzone', 'tarkov'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
]);

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
		if (SKIP_FILES.has(path.basename(file))) continue;
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

async function renameWarzoneTs() {
	const from = path.join(ROOT, 'src', 'data', 'warzone.ts');
	const to = path.join(ROOT, 'src', 'data', 'tarkov.ts');
	try {
		await rename(from, to);
		console.log('Renamed warzone.ts → tarkov.ts');
	} catch (e) {
		console.warn(`warzone.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-warzone-images.mjs', 'fetch-tarkov-images.mjs'],
		['warzone-hack-overlays.mjs', 'tarkov-hack-overlays.mjs'],
		['fix-warzone-copy.mjs', 'fix-tarkov-copy.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'tarkov-aimbot': 'tarkov-aimbot',
		'tarkov-esp': 'tarkov-esp',
		'tarkov-wallhack': 'wallhack',
		'tarkov-radar-hack': 'radar',
		'undetected-tarkov-cheats': 'undetected',
		'tarkov-cheats-2026': 'cheats-2026',
		'battleye-bypass': 'battleye',
		'tarkov-cheats': 'hacks',
		'tarkov-cheat-download': 'cheat-download',
		'tarkov-mod-menu': 'mod-menu',
		'tarkov-soft-aim': 'soft-aim',
		'best-tarkov-cheats': 'best-cheats',
		'tarkov-aimbot-hack': 'aimbot-hack',
		'tarkov-esp-hack': 'esp-hack',
		'tarkov-unlock-all': 'unlock-all',
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
		if (!file.includes('warzone')) continue;
		const newName = file.replace(/warzone/g, 'tarkov').replace(/tarkov-hacks-logo/g, 'tarkov-cheats-logo');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Warzone Hacks → Tarkov Cheats (tarkovcheats.org)...\n');
	await renamePageDirs();
	await renameWarzoneTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: fix brand.ts identity, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
