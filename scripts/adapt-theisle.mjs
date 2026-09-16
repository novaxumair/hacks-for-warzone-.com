#!/usr/bin/env node
/**
 * One-time migration: Tarkov Cheats → The Isle Hacks (The Isle).
 * Domain: theislehacks.org
 * Run from project root: node scripts/adapt-theisle.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['tarkov-aimbot', 'isle-aimbot'],
	['tarkov-esp', 'isle-esp'],
	['tarkov-wallhack', 'isle-wallhack'],
	['tarkov-radar-hack', 'isle-radar-hack'],
	['undetected-tarkov-cheats', 'undetected-isle-hacks'],
	['tarkov-cheats-2026', 'isle-hacks-2026'],
	['battleye-bypass', 'eac-bypass'],
	['tarkov-cheats', 'the-isle-hacks'],
	['tarkov-cheat-download', 'isle-hack-download'],
	['tarkov-mod-menu', 'isle-mod-menu'],
	['tarkov-soft-aim', 'isle-soft-aim'],
	['best-tarkov-cheats', 'best-isle-hacks'],
	['tarkov-aimbot-hack', 'isle-aimbot-hack'],
	['tarkov-esp-hack', 'isle-esp-hack'],
	['tarkov-unlock-all', 'isle-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.tarkovcheats.org', 'https://www.theislehacks.org'],
	['https://tarkovcheats.org', 'https://theislehacks.org'],
	['www.tarkovcheats.org', 'www.theislehacks.org'],
	['tarkovcheats.org', 'theislehacks.org'],
	['support@tarkovcheats.org', 'support@theislehacks.org'],
	['https://www.escapefromtarkov.com/support', 'https://store.steampowered.com/app/376210/The_Isle/'],
	['https://www.escapefromtarkov.com/', 'https://store.steampowered.com/app/376210/The_Isle/'],
	['www.escapefromtarkov.com/support', 'store.steampowered.com/app/376210/The_Isle'],
	['www.escapefromtarkov.com', 'store.steampowered.com/app/376210/The_Isle'],
	['https://www.battleye.com/', 'https://www.easy.ac/'],
	['www.battleye.com', 'www.easy.ac'],
	['/products/escape-from-tarkov', '/products/the-isle'],
	['project-name=tarkov-cheats--org', 'project-name=theislehacks'],
	['project-name=besttarkovcheats', 'project-name=theislehacks'],
	['name = "tarkov-cheats--org"', 'name = "theislehacks"'],
	['name = "besttarkovcheats"', 'name = "theislehacks"'],
	['"name": "tarkov-cheats"', '"name": "the-isle-hacks"'],
	['tarkov-esp-player-tags', 'isle-esp-player-tags'],
	['tarkov-wallhack-skeleton', 'isle-wallhack-skeleton'],
	['tarkov-aimbot-skeleton', 'isle-aimbot-skeleton'],
	['tarkov-aimbot-sniper', 'isle-aimbot-sniper'],
	['tarkov-esp-radar', 'isle-esp-radar'],
	['tarkov-cheats-combat', 'isle-hacks-combat'],
	['tarkov-cheats-wallhack', 'isle-hacks-wallhack'],
	['tarkov-cheats-aimbot-view', 'isle-hacks-aimbot-view'],
	['tarkov-cheats-aimbot', 'isle-hacks-aimbot'],
	['tarkov-cheats-radar', 'isle-hacks-radar'],
	['tarkov-cheats-hero', 'isle-hacks-hero'],
	['tarkov-cheats-logo', 'isle-hacks-logo'],
	['tarkov-cheats-raid', 'isle-hacks-session'],
	['tarkov-cheats-esp', 'isle-hacks-esp'],
	['tarkov-hero-banner', 'isle-hero-banner'],
	['tarkov-hero-ghost', 'isle-hero-ghost'],
	['tarkov-hero-source', 'isle-hero-source'],
	['undetected-tarkov-cheats', 'undetected-isle-hacks'],
	['best-tarkov-cheats', 'best-isle-hacks'],
	['tarkov-cheat-download', 'isle-hack-download'],
	['tarkov-cheats-2026', 'isle-hacks-2026'],
	['tarkov-radar-hack', 'isle-radar-hack'],
	['tarkov-aimbot-hack', 'isle-aimbot-hack'],
	['tarkov-esp-hack', 'isle-esp-hack'],
	['tarkov-unlock-all', 'isle-unlock-all'],
	['tarkov-soft-aim', 'isle-soft-aim'],
	['tarkov-mod-menu', 'isle-mod-menu'],
	['tarkov-wallhack', 'isle-wallhack'],
	['tarkov-cheats', 'the-isle-hacks'],
	['tarkov-aimbot', 'isle-aimbot'],
	['tarkov-esp', 'isle-esp'],
	['battleye-bypass', 'eac-bypass'],
	["'tarkov-esp'", "'isle-esp'"],
	['"tarkov-esp"', '"isle-esp"'],
	["'tarkov-aimbot'", "'isle-aimbot'"],
	['"tarkov-aimbot"', '"isle-aimbot"'],
	['pageId="battleye"', 'pageId="eac"'],
	["pageId: 'battleye'", "pageId: 'eac'"],
	["'battleye'", "'eac'"],
	['"battleye"', '"eac"'],
	['| battleye', '| eac'],
	['tarkovImages', 'isleImages'],
	["from './tarkov'", "from './isle'"],
	["from '../data/tarkov'", "from '../data/isle'"],
	["from '../../data/tarkov'", "from '../../data/isle'"],
	['fetch-tarkov-images', 'fetch-isle-images'],
	['tarkov-hack-overlays', 'isle-hack-overlays'],
	['fix-tarkov-copy', 'fix-isle-copy'],
	['adapt-tarkov', 'adapt-theisle'],
	['escape-from-tarkov-cheats', 'the-isle-hacks'],
	['escape-from-tarkov', 'the-isle'],
	['trucos-tarkov', 'trucos-isla'],
	['triche-tarkov', 'triche-isla'],
	['cheats-tarkov', 'cheats-isla'],
	['trucchi-tarkov', 'trucchi-isla'],
	['cheaty-tarkov', 'cheaty-isla'],
	['chity-tarkov', 'chity-isla'],
	['chitov-tarkov', 'chitov-isla'],
	['chitiv-tarkov', 'chitiv-isla'],
	['cheatow-tarkov', 'cheatow-isla'],
	['hile-tarkov', 'hile-isla'],
	['tarkov-hile', 'isle-hile'],
	['tarkov-esp-chity', 'isle-esp-chity'],
	['tarkov-aimbot-chity', 'isle-aimbot-chity'],
	['unentdeckte-tarkov-cheats', 'unentdeckte-isle-hacks'],
	['cheats-tarkov-indetectaveis', 'cheats-isla-indetectaveis'],
	['trucchi-tarkov-indetectabili', 'trucchi-isla-indetectabili'],
	['niewykrywalne-cheats-tarkov', 'niewykrywalne-cheats-isla'],
	['nedecektiruemye-chity-tarkov', 'nedecektiruemye-chity-isla'],
	['tespit-edilemeyen-tarkov-hileleri', 'tespit-edilemeyen-isle-hileleri'],
	['nedecektovani-chity-tarkov', 'nedecektovani-chity-isla'],
	['cheats-tarkov-nedetectabile', 'cheats-isla-nedetectabile'],
	['basta-tarkov-cheats', 'basta-isle-hacks'],
	['tarkov-cheats-funktionen', 'isle-hacks-funktionen'],
	['tarkov-cheats-functies', 'isle-hacks-functies'],
	['caracteristicas-trucos-tarkov', 'caracteristicas-trucos-isla'],
	['fonctionnalites-triche-tarkov', 'fonctionnalites-triche-isla'],
	['recursos-cheats-tarkov', 'recursos-cheats-isla'],
	['Customs, Woods, and Streets of Tarkov', 'Isla Spire, forests, and river zones'],
	['Customs, Woods and Streets of Tarkov', 'Isla Spire, forests and river zones'],
	['PMC raids and Scav runs', 'herbivore and carnivore survival sessions'],
	['PMC raids and scav-runs', 'herbivore and carnivore survival sessions'],
	['PMC raids and scav runs', 'herbivore and carnivore survival sessions'],
	['PMC & Scav', 'herbivore & carnivore'],
	['PMC raids', 'survival sessions'],
	['PMC raid', 'survival session'],
	['Scav runs', 'growth runs'],
	['Scav run', 'growth run'],
	['scav-runs', 'growth runs'],
	['scav-run', 'growth run'],
	['scav runs', 'growth runs'],
	['scav run', 'growth run'],
	['PMCs and Scavs', 'players and wild dinosaurs'],
	['PMCs, Scavs', 'players, wild dinosaurs'],
	['PMCs and Scav', 'players and wild dinosaurs'],
	['PMCs', 'players'],
	['Scavs', 'wild dinosaurs'],
	['extract and weapon drops markers', 'nest and carcass markers'],
	['extract markers', 'nest markers'],
	['extract cues', 'nest cues'],
	['extract holds', 'nest zones'],
	['extract fights', 'nest fights'],
	['extract fight', 'nest fight'],
	['near extracts', 'near nests and water'],
	['Extracts', 'Nests'],
	['extracts', 'nests'],
	['extract timer', 'growth timer'],
	['high-value weapon drops', 'fresh carcasses'],
	['weapon drops routes', 'hunting routes'],
	['weapon drops markers', 'carcass markers'],
	['weapon drops ESP', 'carcass ESP'],
	['Container and weapon drops ESP', 'Carcass and water ESP'],
	['weapon drops worth the detour', 'carcasses worth the detour'],
	['weapon drops rules', 'spawn rules'],
	['weapon drops tools', 'growth tools'],
	['Battlestate Games', 'The Isle team'],
	['BattlEye anti-cheat', 'Easy Anti-Cheat'],
	['BattlEye maintenance', 'Easy Anti-Cheat maintenance'],
	['BattlEye bypass', 'Easy Anti-Cheat bypass'],
	['BattlEye Bypass', 'Easy Anti-Cheat Bypass'],
	['BattlEye patches', 'Easy Anti-Cheat patches'],
	['BattlEye patch', 'Easy Anti-Cheat patch'],
	['BattlEye updates', 'Easy Anti-Cheat updates'],
	['BattlEye update', 'Easy Anti-Cheat update'],
	['after BattlEye', 'after Easy Anti-Cheat'],
	['BattlEye rebuilds', 'Easy Anti-Cheat rebuilds'],
	['BattlEye security', 'Easy Anti-Cheat security'],
	['BattlEye guide', 'Easy Anti-Cheat guide'],
	['undetected BattlEye notes', 'undetected Easy Anti-Cheat notes'],
	['BattlEye', 'Easy Anti-Cheat'],
	['battleye', 'eac'],
	['last wipe', 'last major update'],
	['this wipe', 'this update cycle'],
	['Bolt-action', 'Long-range'],
	['bolt-action', 'long-range'],
	['Customs', 'Isla Spire'],
	['on Woods', 'in forest zones'],
	['in dorms', 'in high-traffic zones'],
	['firefight', 'hunt'],
	['firefights', 'hunts'],
	['raid flow', 'survival flow'],
	['raid rounds', 'session rounds'],
	['raid tips', 'survival tips'],
	['raid map', 'island map'],
	['raid faster', 'spawn in faster'],
	['before you raid', 'before you spawn in'],
	['before you queue', 'before you spawn in'],
	['you queue', 'you spawn in'],
	['you raid', 'you play'],
	['queue a raid', 'spawn in'],
	[' a raid', ' a session'],
	[' raids', ' sessions'],
	[' raid', ' session'],
	['raids', 'sessions'],
	['raid', 'session'],
	['wipe', 'update cycle'],
	['Escape from Tarkov Support', 'The Isle on Steam'],
	['Escape from Tarkov', 'The Isle'],
	['TarkovCheatsSite', 'IsleHacksSite'],
	['Tarkov Intel', 'Isle Intel'],
	['Tarkov Cheats', 'The Isle Hacks'],
	['Tarkov cheats', 'the isle hacks'],
	['Tarkov cheat', 'the isle hack'],
	['Tarkov hacks', 'the isle hacks'],
	['Tarkov hack', 'isle hack'],
	['Tarkov ESP', 'Isle ESP'],
	['Tarkov Aimbot', 'Isle Aimbot'],
	['Tarkov esp', 'isle esp'],
	['Tarkov aimbot', 'isle aimbot'],
	['Tarkov wallhack', 'isle wallhack'],
	['Tarkov radar', 'isle radar'],
	['Buy Tarkov Cheats', 'Buy The Isle Hacks'],
	['EXT.tarkov', 'EXT.isle'],
	['KW.battleye', 'KW.eac'],
	['what-are-tarkov-cheats', 'what-are-isle-hacks'],
	['are-tarkov-cheats-undetected-in-2026', 'are-isle-hacks-undetected-in-2026'],
	['pmc-raids-and-scav-runs', 'herbivore-and-carnivore-sessions'],
	['what-is-a-tarkov-wallhack', 'what-is-an-isle-wallhack'],
	['does-tarkov-cheats-include-radar-hack', 'does-isle-hacks-include-radar-hack'],
	['battleye-anti-cheat-and-tarkov-cheats', 'eac-anti-cheat-and-isle-hacks'],
	['buy-undetected-tarkov-cheats-windows-pc', 'buy-undetected-isle-hacks-windows-pc'],
	['tarkov-soft-aim-review', 'isle-soft-aim-review'],
	['tarkov-esp-scav-run-review', 'isle-esp-growth-run-review'],
	['tarkov-cloud-dma-review', 'isle-cloud-dma-review'],
	['tarkov-cheat-setup-review', 'isle-hack-setup-review'],
	['tarkov-weapon drops-esp-review', 'isle-carcass-esp-review'],
	['tarkov-soft-aim-raid-review', 'isle-soft-aim-session-review'],
	['tarkov-radar-hack-review', 'isle-radar-hack-review'],
	['tarkov-battleye-update-review', 'isle-eac-update-review'],
	['tarkov-sniper-soft-aim-review', 'isle-sniper-soft-aim-review'],
	['xKrypt0_EFT', 'xKrypt0_Isle'],
	['vanLifeEFT', 'vanLifeIsle'],
	['Tarkov', 'The Isle'],
	['tarkov', 'isle'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
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

async function renameTarkovTs() {
	const from = path.join(ROOT, 'src', 'data', 'tarkov.ts');
	const to = path.join(ROOT, 'src', 'data', 'isle.ts');
	try {
		await rename(from, to);
		console.log('Renamed tarkov.ts → isle.ts');
	} catch (e) {
		console.warn(`tarkov.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-tarkov-images.mjs', 'fetch-isle-images.mjs'],
		['tarkov-hack-overlays.mjs', 'isle-hack-overlays.mjs'],
		['fix-tarkov-copy.mjs', 'fix-isle-copy.mjs'],
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
		'isle-aimbot': 'isle-aimbot',
		'isle-esp': 'isle-esp',
		'isle-wallhack': 'wallhack',
		'isle-radar-hack': 'radar',
		'undetected-isle-hacks': 'undetected',
		'isle-hacks-2026': 'cheats-2026',
		'eac-bypass': 'eac',
		'the-isle-hacks': 'hacks',
		'isle-hack-download': 'cheat-download',
		'isle-mod-menu': 'mod-menu',
		'isle-soft-aim': 'soft-aim',
		'best-isle-hacks': 'best-cheats',
		'isle-aimbot-hack': 'aimbot-hack',
		'isle-esp-hack': 'esp-hack',
		'isle-unlock-all': 'unlock-all',
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
		if (!file.includes('tarkov')) continue;
		const newName = file
			.replace(/tarkov-cheats/g, 'isle-hacks')
			.replace(/tarkov/g, 'isle');
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
	console.log('Adapting Tarkov Cheats → The Isle Hacks (theislehacks.org)...\n');
	await renamePageDirs();
	await renameTarkovTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
