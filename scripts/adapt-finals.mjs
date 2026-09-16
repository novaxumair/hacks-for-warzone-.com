#!/usr/bin/env node
/**
 * One-time migration: Rust Cheats → The Final Cheats (thefinalscheats.org).
 * Run from project root: node scripts/adapt-finals.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['rust-aimbot', 'finals-aimbot'],
	['rust-esp', 'finals-esp'],
	['rust-wallhack', 'finals-wallhack'],
	['rust-radar-hack', 'finals-radar-hack'],
	['undetected-rust-cheats', 'undetected-finals-cheats'],
	['rust-cheats-2026', 'finals-cheats-2026'],
	['rust-cheats', 'finals-cheats'],
	['rust-cheat-download', 'finals-cheat-download'],
	['rust-mod-menu', 'finals-mod-menu'],
	['rust-soft-aim', 'finals-soft-aim'],
	['best-rust-cheats', 'best-finals-cheats'],
	['rust-aimbot-hack', 'finals-aimbot-hack'],
	['rust-esp-hack', 'finals-esp-hack'],
	['rust-unlock-all', 'finals-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.rustcheats.co', 'https://www.thefinalscheats.org'],
	['https://rustcheats.co', 'https://thefinalscheats.org'],
	['www.rustcheats.co', 'www.thefinalscheats.org'],
	['rustcheats.co', 'thefinalscheats.org'],
	['support@rustcheats.co', 'support@thefinalscheats.org'],
	['bestrustcheats.com', 'thefinalscheats.org'],
	['rustcheat.co', 'thefinalscheats.org'],
	['project-name=rustcheats', 'project-name=thefinalscheats'],
	['name = "rustcheats"', 'name = "thefinalscheats"'],
	['"name": "rust-cheats"', '"name": "the-finals-cheats"'],
	['https://store.steampowered.com/app/252490/Rust/', 'https://store.steampowered.com/app/2073850/THE_FINALS/'],
	['https://store.steampowered.com/app/252490/news/', 'https://store.steampowered.com/app/2073850/news/'],
	['https://store.steampowered.com/app/252490', 'https://store.steampowered.com/app/2073850'],
	['https://steamcommunity.com/app/252490', 'https://steamcommunity.com/app/2073850'],
	['https://rust.facepunch.com/', 'https://www.reachthefinals.com/'],
	['https://rust.fandom.com/wiki/Rust', 'https://thefinals.fandom.com/wiki/The_Finals'],
	['https://rust.fandom.com', 'https://thefinals.fandom.com'],
	['rust.facepunch.com', 'reachthefinals.com'],
	['rust.fandom.com', 'thefinals.fandom.com'],
	['/products/rust-novaxware', '/products/the-finals'],
	['/products/rust', '/products/the-finals'],
	['undetected-rust-cheats', 'undetected-finals-cheats'],
	['best-rust-cheats', 'best-finals-cheats'],
	['rust-cheat-download', 'finals-cheat-download'],
	['rust-cheats-2026', 'finals-cheats-2026'],
	['rust-radar-hack', 'finals-radar-hack'],
	['rust-aimbot-hack', 'finals-aimbot-hack'],
	['rust-esp-hack', 'finals-esp-hack'],
	['rust-unlock-all', 'finals-unlock-all'],
	['rust-soft-aim', 'finals-soft-aim'],
	['rust-mod-menu', 'finals-mod-menu'],
	['rust-wallhack', 'finals-wallhack'],
	['rust-aimbot', 'finals-aimbot'],
	['rust-esp', 'finals-esp'],
	["'rust-esp'", "'finals-esp'"],
	['"rust-esp"', '"finals-esp"'],
	["'rust-aimbot'", "'finals-aimbot'"],
	['"rust-aimbot"', '"finals-aimbot"'],
	['rust-cheats', 'finals-cheats'],
	['rust-cheat', 'finals-cheat'],
	['rustImages', 'finalsImages'],
	["from './rust'", "from './finals'"],
	["from '../data/rust'", "from '../data/finals'"],
	["from '../../data/rust'", "from '../../data/finals'"],
	['fetch-rust-images', 'fetch-finals-images'],
	['fetch-rust-hero', 'fetch-finals-hero'],
	['import-rust-screenshots', 'import-finals-screenshots'],
	['rust-hack-overlays', 'finals-hack-overlays'],
	['fix-rust-copy', 'fix-finals-copy'],
	['fix-rust-content', 'fix-finals-content'],
	['adapt-rust', 'adapt-finals'],
	['trucos-rust', 'trucos-finals'],
	['triche-rust', 'triche-finals'],
	['cheats-rust', 'cheats-finals'],
	['trucchi-rust', 'trucchi-finals'],
	['cheaty-rust', 'cheaty-finals'],
	['chity-rust', 'chity-finals'],
	['chitov-rust', 'chitov-finals'],
	['chitiv-rust', 'chitiv-finals'],
	['cheatow-rust', 'cheatow-finals'],
	['hile-rust', 'hile-finals'],
	['rust-hile', 'finals-hile'],
	['rust-esp-chity', 'finals-esp-chity'],
	['rust-aimbot-chity', 'finals-aimbot-chity'],
	['unentdeckte-rust-cheats', 'unentdeckte-finals-cheats'],
	['cheats-rust-indetectaveis', 'cheats-finals-indetectaveis'],
	['trucchi-rust-indetectabili', 'trucchi-finals-indetectabili'],
	['niewykrywalne-cheats-rust', 'niewykrywalne-cheats-finals'],
	['nedecektiruemye-chity-rust', 'nedecektiruemye-chity-finals'],
	['tespit-edilemeyen-rust-hileleri', 'tespit-edilemeyen-finals-hileleri'],
	['nedecektovani-chity-rust', 'nedecektovani-chity-finals'],
	['cheats-rust-nedetectabile', 'cheats-finals-nedetectabile'],
	['basta-rust-cheats', 'basta-finals-cheats'],
	['rust-cheats-funktionen', 'finals-cheats-funktionen'],
	['rust-cheats-functies', 'finals-cheats-functies'],
	['caracteristicas-trucos-rust', 'caracteristicas-trucos-finals'],
	['fonctionnalites-triche-rust', 'fonctionnalites-triche-finals'],
	['recursos-cheats-rust', 'recursos-cheats-finals'],
	['Outpost, monuments, and compound zones', 'arenas, stadiums, and cashout zones'],
	['Outpost, monuments and compound zones', 'arenas, stadiums and cashout zones'],
	['base raids and PvP survival sessions', 'cashout rounds and arena PvP sessions'],
	['base raids and PvP fights', 'cashout rounds and arena PvP fights'],
	['raiders & survivors', 'contestants & cashout teams'],
	['base markers', 'spike markers'],
	['compound zones', 'cashout zones'],
	['monuments and compounds', 'arenas and cashout spikes'],
	['near monuments and compounds', 'near arenas and cashout spikes'],
	['weapon drops routes', 'cashout routes'],
	['weapon drops markers', 'spike markers'],
	['weapon drops ESP', 'spike ESP'],
	['Weapon drops and resource ESP', 'Spike and cashout ESP'],
	['weapon drops worth the detour', 'cashout worth the detour'],
	['weapon drops rules', 'match rules'],
	['raid tools', 'arena tools'],
	['Facepunch Studios', 'Embark Studios'],
	['last wipe', 'last patch'],
	['this wipe', 'this patch'],
	['Bolt-action', 'Long-range'],
	['bolt-action', 'long-range'],
	['Outpost', 'Arena'],
	['on monuments', 'in stadiums'],
	['in compound zones', 'in cashout zones'],
	['firefight', 'arena fight'],
	['firefights', 'arena fights'],
	['raid flow', 'match flow'],
	['raid rounds', 'match rounds'],
	['raid tips', 'arena tips'],
	['raid map', 'arena map'],
	['raid faster', 'queue faster'],
	['before you raid', 'before you queue'],
	['you queue', 'you queue'],
	['load in', 'load in'],
	[' a raid', ' a match'],
	[' raids', ' matches'],
	[' raid', ' match'],
	['raids', 'matches'],
	['wipe', 'patch'],
	['Rust on Steam', 'Call of Duty: Warzone on Steam'],
	['RustCheatsSite', 'FinalsCheatsSite'],
	['Rust Intel', 'Finals Intel'],
	['Rust Cheats', 'The Final Cheats'],
	['the rust cheats', 'the finals cheats'],
	['the rust cheat', 'the finals cheat'],
	['rust cheats', 'the finals cheats'],
	['rust cheat', 'the finals cheat'],
	['rust hacks', 'the finals hacks'],
	['rust hack', 'the finals hack'],
	['rust evrima', 'the finals hacks'],
	['Rust ESP', 'Call of Duty: Warzone ESP'],
	['Rust Aimbot', 'Call of Duty: Warzone Aimbot'],
	['rust esp', 'the finals esp'],
	['rust aimbot', 'the finals aimbot'],
	['rust wallhack', 'the finals wallhack'],
	['rust radar', 'the finals radar'],
	['Buy Rust Cheats', 'Buy Call of Duty: Warzone Cheats'],
	['EXT.rust', 'EXT.finals'],
	['what-are-rust-cheats', 'what-are-finals-cheats'],
	['are-rust-cheats-undetected-in-2026', 'are-finals-cheats-undetected-in-2026'],
	['base-raids-and-pvp-sessions', 'cashout-rounds-and-arena-sessions'],
	['what-is-a-rust-wallhack', 'what-is-a-finals-wallhack'],
	['does-rust-cheats-include-radar-hack', 'does-finals-cheats-include-radar-hack'],
	['eac-anti-cheat-and-rust-cheats', 'eac-anti-cheat-and-finals-cheats'],
	['buy-undetected-rust-cheats-windows-pc', 'buy-undetected-finals-cheats-windows-pc'],
	['rust-soft-aim-review', 'finals-soft-aim-review'],
	['rust-esp-farming-run-review', 'finals-esp-cashout-review'],
	['rust-cloud-dma-review', 'finals-cloud-dma-review'],
	['rust-cheat-setup-review', 'finals-cheat-setup-review'],
	['rust-weapon drops-esp-review', 'finals-spike-esp-review'],
	['rust-soft-aim-raid-review', 'finals-soft-aim-match-review'],
	['rust-radar-hack-review', 'finals-radar-hack-review'],
	['rust-eac-update-review', 'finals-eac-update-review'],
	['rust-sniper-soft-aim-review', 'finals-sniper-soft-aim-review'],
	['xKrypt0_Rust', 'xKrypt0_Finals'],
	['vanLifeRust', 'vanLifeFinals'],
	['rust-screenshot', 'finals-screenshot'],
	['rust-cheats-logo', 'finals-cheats-logo'],
	['rust-cheats-hero', 'finals-cheats-hero'],
	['rust-hero-banner', 'finals-hero-banner'],
	['rust-hero-ghost', 'finals-hero-ghost'],
	['rust-hero-source', 'finals-hero-source'],
	['rust-esp-player-tags', 'finals-esp-player-tags'],
	['rust-wallhack-skeleton', 'finals-wallhack-skeleton'],
	['rust-aimbot-skeleton', 'finals-aimbot-skeleton'],
	['rust-aimbot-sniper', 'finals-aimbot-sniper'],
	['rust-esp-radar', 'finals-esp-radar'],
	['rust-cheats-combat', 'finals-cheats-combat'],
	['rust-cheats-wallhack', 'finals-cheats-wallhack'],
	['rust-cheats-aimbot-view', 'finals-cheats-aimbot-view'],
	['rust-cheats-aimbot', 'finals-cheats-aimbot'],
	['rust-cheats-radar', 'finals-cheats-radar'],
	['rust-cheats-session', 'finals-cheats-session'],
	['rust-cheats-esp', 'finals-cheats-esp'],
	['Rust Hacks', 'Call of Duty: Warzone Hacks'],
	['Rust Features', 'Call of Duty: Warzone Features'],
	['Rust Status', 'Call of Duty: Warzone Status'],
	['Rust patches', 'Call of Duty: Warzone patches'],
	['Rust updates', 'Call of Duty: Warzone updates'],
	['Rust setup', 'Call of Duty: Warzone setup'],
	['Rust license', 'Call of Duty: Warzone license'],
	['Rust licenses', 'Call of Duty: Warzone licenses'],
	['in Rust', 'in Call of Duty: Warzone'],
	['for Rust', 'for Call of Duty: Warzone'],
	['Rust on', 'Call of Duty: Warzone on'],
	['Rust or', 'Call of Duty: Warzone or'],
	["Rust's", "Call of Duty: Warzone'"],
	['Rust ', 'Call of Duty: Warzone '],
	['Rust,', 'Call of Duty: Warzone,'],
	['Rust.', 'Call of Duty: Warzone.'],
	['Rust', 'Call of Duty: Warzone'],
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
	'adapt-finals.mjs',
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

async function renameRustTs() {
	const from = path.join(ROOT, 'src', 'data', 'rust.ts');
	const to = path.join(ROOT, 'src', 'data', 'finals.ts');
	try {
		await rename(from, to);
		console.log('Renamed rust.ts → finals.ts');
	} catch (e) {
		console.warn(`rust.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-rust-images.mjs', 'fetch-finals-images.mjs'],
		['fetch-rust-hero.mjs', 'fetch-finals-hero.mjs'],
		['import-rust-screenshots.mjs', 'import-finals-screenshots.mjs'],
		['rust-hack-overlays.mjs', 'finals-hack-overlays.mjs'],
		['fix-rust-copy.mjs', 'fix-finals-copy.mjs'],
		['fix-rust-content.mjs', 'fix-finals-content.mjs'],
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
		'finals-aimbot': 'finals-aimbot',
		'finals-esp': 'finals-esp',
		'finals-wallhack': 'wallhack',
		'finals-radar-hack': 'radar',
		'undetected-finals-cheats': 'undetected',
		'finals-cheats-2026': 'cheats-2026',
		'eac-bypass': 'eac',
		'finals-cheats': 'hacks',
		'finals-cheat-download': 'cheat-download',
		'finals-mod-menu': 'mod-menu',
		'finals-soft-aim': 'soft-aim',
		'best-finals-cheats': 'best-cheats',
		'finals-aimbot-hack': 'aimbot-hack',
		'finals-esp-hack': 'esp-hack',
		'finals-unlock-all': 'unlock-all',
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
		if (!file.includes('rust')) continue;
		const newName = file
			.replace(/rust-cheats/g, 'finals-cheats')
			.replace(/rust/g, 'finals');
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
	console.log('Adapting Rust Cheats → The Final Cheats (thefinalscheats.org)...\n');
	await renamePageDirs();
	await renameRustTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: update brand.ts, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
