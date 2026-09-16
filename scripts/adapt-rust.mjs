#!/usr/bin/env node
/**
 * One-time migration: The Isle Hacks → Rust Cheats.
 * Domain: rustcheats.co
 * Run from project root: node scripts/adapt-rust.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['isle-aimbot', 'rust-aimbot'],
	['isle-esp', 'rust-esp'],
	['isle-wallhack', 'rust-wallhack'],
	['isle-radar-hack', 'rust-radar-hack'],
	['undetected-isle-hacks', 'undetected-rust-cheats'],
	['isle-hacks-2026', 'rust-cheats-2026'],
	['the-isle-hacks', 'rust-cheats'],
	['isle-hack-download', 'rust-cheat-download'],
	['isle-mod-menu', 'rust-mod-menu'],
	['isle-soft-aim', 'rust-soft-aim'],
	['best-isle-hacks', 'best-rust-cheats'],
	['isle-aimbot-hack', 'rust-aimbot-hack'],
	['isle-esp-hack', 'rust-esp-hack'],
	['isle-unlock-all', 'rust-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.theislehacks.org', 'https://www.rustcheats.co'],
	['https://theislehacks.org', 'https://rustcheats.co'],
	['www.theislehacks.org', 'www.rustcheats.co'],
	['theislehacks.org', 'rustcheats.co'],
	['support@theislehacks.org', 'support@rustcheats.co'],
	['https://store.steampowered.com/app/376210/news/', 'https://store.steampowered.com/app/252490/news/'],
	['https://store.steampowered.com/app/376210/The_Isle/', 'https://store.steampowered.com/app/252490/Rust/'],
	['https://store.steampowered.com/app/376210', 'https://store.steampowered.com/app/252490'],
	['https://steamcommunity.com/app/376210', 'https://steamcommunity.com/app/252490'],
	['https://www.survivetheisle.com/', 'https://rust.facepunch.com/'],
	['https://isle.fandom.com/wiki/The_Isle', 'https://rust.fandom.com/wiki/Rust'],
	['https://isle.fandom.com', 'https://rust.fandom.com'],
	['survivetheisle.com', 'rust.facepunch.com'],
	['isle.fandom.com', 'rust.fandom.com'],
	['/products/the-isle-novaxware', '/products/rust-novaxware'],
	['/products/the-isle', '/products/rust'],
	['project-name=theislehacks', 'project-name=rustcheats'],
	['name = "theislehacks"', 'name = "rustcheats"'],
	['"name": "the-isle-hacks"', '"name": "rust-cheats"'],
	['bestislecheats.com', 'bestrustcheats.com'],
	['theislehack.org', 'rustcheat.co'],
	['isle-esp-player-tags', 'rust-esp-player-tags'],
	['isle-wallhack-skeleton', 'rust-wallhack-skeleton'],
	['isle-aimbot-skeleton', 'rust-aimbot-skeleton'],
	['isle-aimbot-sniper', 'rust-aimbot-sniper'],
	['isle-esp-radar', 'rust-esp-radar'],
	['isle-hacks-combat', 'rust-cheats-combat'],
	['isle-hacks-wallhack', 'rust-cheats-wallhack'],
	['isle-hacks-aimbot-view', 'rust-cheats-aimbot-view'],
	['isle-hacks-aimbot', 'rust-cheats-aimbot'],
	['isle-hacks-radar', 'rust-cheats-radar'],
	['isle-hacks-hero', 'rust-cheats-hero'],
	['isle-hacks-logo', 'rust-cheats-logo'],
	['isle-hacks-session', 'rust-cheats-session'],
	['isle-hacks-esp', 'rust-cheats-esp'],
	['isle-hero-banner', 'rust-hero-banner'],
	['isle-hero-ghost', 'rust-hero-ghost'],
	['isle-hero-source', 'rust-hero-source'],
	['undetected-isle-hacks', 'undetected-rust-cheats'],
	['best-isle-hacks', 'best-rust-cheats'],
	['isle-hack-download', 'rust-cheat-download'],
	['isle-hacks-2026', 'rust-cheats-2026'],
	['isle-radar-hack', 'rust-radar-hack'],
	['isle-aimbot-hack', 'rust-aimbot-hack'],
	['isle-esp-hack', 'rust-esp-hack'],
	['isle-unlock-all', 'rust-unlock-all'],
	['isle-soft-aim', 'rust-soft-aim'],
	['isle-mod-menu', 'rust-mod-menu'],
	['isle-wallhack', 'rust-wallhack'],
	['the-isle-hacks', 'rust-cheats'],
	['isle-aimbot', 'rust-aimbot'],
	['isle-esp', 'rust-esp'],
	["'isle-esp'", "'rust-esp'"],
	['"isle-esp"', '"rust-esp"'],
	["'isle-aimbot'", "'rust-aimbot'"],
	['"isle-aimbot"', '"rust-aimbot"'],
	['isle-hacks', 'rust-cheats'],
	['isle-hack', 'rust-cheat'],
	['isleImages', 'rustImages'],
	["from './isle'", "from './rust'"],
	["from '../data/isle'", "from '../data/rust'"],
	["from '../../data/isle'", "from '../../data/rust'"],
	['fetch-isle-images', 'fetch-rust-images'],
	['fetch-isle-hero', 'fetch-rust-hero'],
	['import-isle-screenshots', 'import-rust-screenshots'],
	['isle-hack-overlays', 'rust-hack-overlays'],
	['fix-isle-copy', 'fix-rust-copy'],
	['fix-isle-content', 'fix-rust-content'],
	['adapt-theisle', 'adapt-rust'],
	['escape-from-tarkov-cheats', 'rust-cheats'],
	['trucos-isla', 'trucos-rust'],
	['triche-isla', 'triche-rust'],
	['cheats-isla', 'cheats-rust'],
	['trucchi-isla', 'trucchi-rust'],
	['cheaty-isla', 'cheaty-rust'],
	['chity-isla', 'chity-rust'],
	['chitov-isla', 'chitov-rust'],
	['chitiv-isla', 'chitiv-rust'],
	['cheatow-isla', 'cheatow-rust'],
	['hile-isla', 'hile-rust'],
	['isle-hile', 'rust-hile'],
	['isle-esp-chity', 'rust-esp-chity'],
	['isle-aimbot-chity', 'rust-aimbot-chity'],
	['unentdeckte-isle-hacks', 'unentdeckte-rust-cheats'],
	['cheats-isla-indetectaveis', 'cheats-rust-indetectaveis'],
	['trucchi-isla-indetectabili', 'trucchi-rust-indetectabili'],
	['niewykrywalne-cheats-isla', 'niewykrywalne-cheats-rust'],
	['nedecektiruemye-chity-isla', 'nedecektiruemye-chity-rust'],
	['tespit-edilemeyen-isle-hileleri', 'tespit-edilemeyen-rust-hileleri'],
	['nedecektovani-chity-isla', 'nedecektovani-chity-rust'],
	['cheats-isla-nedetectabile', 'cheats-rust-nedetectabile'],
	['basta-isle-hacks', 'basta-rust-cheats'],
	['isle-hacks-funktionen', 'rust-cheats-funktionen'],
	['isle-hacks-functies', 'rust-cheats-functies'],
	['caracteristicas-trucos-isla', 'caracteristicas-trucos-rust'],
	['fonctionnalites-triche-isla', 'fonctionnalites-triche-rust'],
	['recursos-cheats-isla', 'recursos-cheats-rust'],
	['Isla Spire, forests, and river zones', 'Outpost, monuments, and compound zones'],
	['Isla Spire, forests and river zones', 'Outpost, monuments and compound zones'],
	['herbivore and carnivore survival sessions', 'base raids and PvP survival sessions'],
	['herbivore and carnivore survival sessions', 'base raids and PvP survival sessions'],
	['herbivore & carnivore', 'raiders & survivors'],
	['survival sessions', 'raid sessions'],
	['survival session', 'raid session'],
	['growth runs', 'farming runs'],
	['growth run', 'farming run'],
	['players and wild dinosaurs', 'players and NPCs'],
	['players, wild dinosaurs', 'players, NPCs'],
	['wild dinosaurs', 'enemy players'],
	['nest and carcass markers', 'base and weapon drops markers'],
	['nest markers', 'base markers'],
	['nest cues', 'raid cues'],
	['nest zones', 'compound zones'],
	['nest fights', 'raid fights'],
	['nest fight', 'raid fight'],
	['near nests and water', 'near monuments and compounds'],
	['Nests', 'Bases'],
	['nests', 'bases'],
	['growth timer', 'raid timer'],
	['fresh carcasses', 'high-value weapon drops'],
	['hunting routes', 'weapon drops routes'],
	['carcass markers', 'weapon drops markers'],
	['carcass ESP', 'weapon drops ESP'],
	['Carcass and water ESP', 'Weapon drops and resource ESP'],
	['carcasses worth the detour', 'weapon drops worth the detour'],
	['spawn rules', 'weapon drops rules'],
	['growth tools', 'raid tools'],
	['The Isle team', 'Facepunch Studios'],
	['last major update', 'last wipe'],
	['this update cycle', 'this wipe'],
	['Long-range', 'Bolt-action'],
	['long-range', 'bolt-action'],
	['Isla Spire', 'Outpost'],
	['in forest zones', 'on monuments'],
	['in high-traffic zones', 'in compound zones'],
	['hunt', 'firefight'],
	['hunts', 'firefights'],
	['survival flow', 'raid flow'],
	['session rounds', 'raid rounds'],
	['survival tips', 'raid tips'],
	['island map', 'raid map'],
	['spawn in faster', 'raid faster'],
	['before you spawn in', 'before you raid'],
	['you spawn in', 'you queue'],
	['spawn in', 'load in'],
	[' a session', ' a raid'],
	[' sessions', ' raids'],
	[' session', ' raid'],
	['sessions', 'raids'],
	['update cycle', 'wipe'],
	['The Isle on Steam', 'Rust on Steam'],
	['The Isle', 'Rust'],
	['IsleHacksSite', 'RustCheatsSite'],
	['Isle Intel', 'Rust Intel'],
	['The Isle Hacks', 'Rust Cheats'],
	['the isle hacks', 'rust cheats'],
	['the isle hack', 'rust cheat'],
	['the isle cheats', 'rust cheats'],
	['isle cheats', 'rust cheats'],
	['isle evrima', 'rust hacks'],
	['isle hacks', 'rust cheats'],
	['isle hack', 'rust cheat'],
	['Isle ESP', 'Rust ESP'],
	['Isle Aimbot', 'Rust Aimbot'],
	['isle esp', 'rust esp'],
	['isle aimbot', 'rust aimbot'],
	['isle wallhack', 'rust wallhack'],
	['isle radar', 'rust radar'],
	['Buy The Isle Hacks', 'Buy Rust Cheats'],
	['EXT.isle', 'EXT.rust'],
	['what-are-isle-hacks', 'what-are-rust-cheats'],
	['are-isle-hacks-undetected-in-2026', 'are-rust-cheats-undetected-in-2026'],
	['herbivore-and-carnivore-sessions', 'base-raids-and-pvp-sessions'],
	['what-is-an-isle-wallhack', 'what-is-a-rust-wallhack'],
	['does-isle-hacks-include-radar-hack', 'does-rust-cheats-include-radar-hack'],
	['eac-anti-cheat-and-isle-hacks', 'eac-anti-cheat-and-rust-cheats'],
	['buy-undetected-isle-hacks-windows-pc', 'buy-undetected-rust-cheats-windows-pc'],
	['isle-soft-aim-review', 'rust-soft-aim-review'],
	['isle-esp-growth-run-review', 'rust-esp-farming-run-review'],
	['isle-cloud-dma-review', 'rust-cloud-dma-review'],
	['isle-hack-setup-review', 'rust-cheat-setup-review'],
	['isle-carcass-esp-review', 'rust-weapon drops-esp-review'],
	['isle-soft-aim-session-review', 'rust-soft-aim-raid-review'],
	['isle-radar-hack-review', 'rust-radar-hack-review'],
	['isle-eac-update-review', 'rust-eac-update-review'],
	['isle-sniper-soft-aim-review', 'rust-sniper-soft-aim-review'],
	['xKrypt0_Isle', 'xKrypt0_Rust'],
	['vanLifeIsle', 'vanLifeRust'],
	['Isle Hacks', 'Rust Cheats'],
	['isle-screenshot', 'rust-screenshot'],
	['dinoEsp', 'playerEsp'],
	['dino ESP', 'player ESP'],
	['dinosaur', 'player'],
	['Dinosaur', 'Player'],
	['Afterthought LLC', 'Facepunch Studios'],
	['isle', 'rust'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
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

async function renameIsleTs() {
	const from = path.join(ROOT, 'src', 'data', 'isle.ts');
	const to = path.join(ROOT, 'src', 'data', 'rust.ts');
	try {
		await rename(from, to);
		console.log('Renamed isle.ts → rust.ts');
	} catch (e) {
		console.warn(`isle.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-isle-images.mjs', 'fetch-rust-images.mjs'],
		['fetch-isle-hero.mjs', 'fetch-rust-hero.mjs'],
		['import-isle-screenshots.mjs', 'import-rust-screenshots.mjs'],
		['isle-hack-overlays.mjs', 'rust-hack-overlays.mjs'],
		['fix-isle-copy.mjs', 'fix-rust-copy.mjs'],
		['fix-isle-content.mjs', 'fix-rust-content.mjs'],
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
		'rust-aimbot': 'rust-aimbot',
		'rust-esp': 'rust-esp',
		'rust-wallhack': 'wallhack',
		'rust-radar-hack': 'radar',
		'undetected-rust-cheats': 'undetected',
		'rust-cheats-2026': 'cheats-2026',
		'eac-bypass': 'eac',
		'rust-cheats': 'hacks',
		'rust-cheat-download': 'cheat-download',
		'rust-mod-menu': 'mod-menu',
		'rust-soft-aim': 'soft-aim',
		'best-rust-cheats': 'best-cheats',
		'rust-aimbot-hack': 'aimbot-hack',
		'rust-esp-hack': 'esp-hack',
		'rust-unlock-all': 'unlock-all',
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
		if (!file.includes('isle')) continue;
		const newName = file
			.replace(/isle-hacks/g, 'rust-cheats')
			.replace(/isle/g, 'rust');
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
	console.log('Adapting The Isle Hacks → Rust Cheats (rustcheats.co)...\n');
	await renamePageDirs();
	await renameIsleTs();
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
