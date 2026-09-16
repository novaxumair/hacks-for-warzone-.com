#!/usr/bin/env node
/**
 * One-time migration: The Final Cheats → Warzone Hacks (warzonehacks.org).
 * Run from project root: node scripts/adapt-warzone.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['finals-aimbot', 'warzone-aimbot'],
	['finals-esp', 'warzone-esp'],
	['finals-wallhack', 'warzone-wallhack'],
	['finals-radar-hack', 'warzone-radar-hack'],
	['undetected-finals-cheats', 'undetected-warzone-hacks'],
	['finals-cheats-2026', 'warzone-hacks-2026'],
	['eac-bypass', 'ricochet-bypass'],
	['finals-cheats', 'warzone-hacks'],
	['finals-cheat-download', 'warzone-cheat-download'],
	['finals-mod-menu', 'warzone-mod-menu'],
	['finals-soft-aim', 'warzone-soft-aim'],
	['best-finals-cheats', 'best-warzone-hacks'],
	['finals-aimbot-hack', 'warzone-aimbot-hack'],
	['finals-esp-hack', 'warzone-esp-hack'],
	['finals-unlock-all', 'warzone-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.thefinalscheats.org', 'https://www.warzonehacks.org'],
	['https://thefinalscheats.org', 'https://warzonehacks.org'],
	['www.thefinalscheats.org', 'www.warzonehacks.org'],
	['thefinalscheats.org', 'warzonehacks.org'],
	['support@thefinalscheats.org', 'support@warzonehacks.org'],
	['project-name=thefinalscheats', 'project-name=warzonehacks'],
	['name = "thefinalscheats"', 'name = "warzonehacks"'],
	['"name": "the-finals-cheats"', '"name": "warzone-hacks"'],
	['https://store.steampowered.com/app/2073850/THE_FINALS/', 'https://www.callofduty.com/warzone'],
	['https://store.steampowered.com/app/2073850/news/', 'https://www.callofduty.com/warzone/news'],
	['https://store.steampowered.com/app/2073850', 'https://www.callofduty.com/warzone'],
	['https://steamcommunity.com/app/2073850', 'https://www.callofduty.com/warzone'],
	['https://www.reachthefinals.com/', 'https://www.callofduty.com/warzone'],
	['https://thefinals.fandom.com/wiki/The_Finals', 'https://callofduty.fandom.com/wiki/Call_of_Duty:_Warzone'],
	['https://thefinals.fandom.com', 'https://callofduty.fandom.com'],
	['reachthefinals.com', 'playwarzone.com'],
	['thefinals.fandom.com', 'warzone.fandom.com'],
	['/products/the-finals', '/products/warzone'],
	['undetected-finals-cheats', 'undetected-warzone-hacks'],
	['best-finals-cheats', 'best-warzone-hacks'],
	['finals-cheat-download', 'warzone-cheat-download'],
	['finals-cheats-2026', 'warzone-hacks-2026'],
	['finals-radar-hack', 'warzone-radar-hack'],
	['finals-aimbot-hack', 'warzone-aimbot-hack'],
	['finals-esp-hack', 'warzone-esp-hack'],
	['finals-unlock-all', 'warzone-unlock-all'],
	['finals-soft-aim', 'warzone-soft-aim'],
	['finals-mod-menu', 'warzone-mod-menu'],
	['finals-wallhack', 'warzone-wallhack'],
	['finals-aimbot', 'warzone-aimbot'],
	['finals-esp', 'warzone-esp'],
	["'finals-esp'", "'warzone-esp'"],
	['"finals-esp"', '"warzone-esp"'],
	["'finals-aimbot'", "'warzone-aimbot'"],
	['"finals-aimbot"', '"warzone-aimbot"'],
	['finals-cheats', 'warzone-hacks'],
	['finals-cheat', 'warzone-cheat'],
	['finalsImages', 'warzoneImages'],
	["from './finals'", "from './warzone'"],
	["from '../data/finals'", "from '../data/warzone'"],
	["from '../../data/finals'", "from '../../data/warzone'"],
	['fetch-finals-images', 'fetch-warzone-images'],
	['fetch-finals-hero', 'fetch-warzone-hero'],
	['import-finals-screenshots', 'import-warzone-screenshots'],
	['finals-hack-overlays', 'warzone-hack-overlays'],
	['fix-finals-copy', 'fix-warzone-copy'],
	['fix-finals-content', 'fix-warzone-content'],
	['adapt-finals', 'adapt-warzone'],
	['trucos-finals', 'trucos-warzone'],
	['triche-finals', 'triche-warzone'],
	['cheats-finals', 'cheats-warzone'],
	['trucchi-finals', 'trucchi-warzone'],
	['cheaty-finals', 'cheaty-warzone'],
	['chity-finals', 'chity-warzone'],
	['chitov-finals', 'chitov-warzone'],
	['chitiv-finals', 'chitiv-warzone'],
	['cheatow-finals', 'cheatow-warzone'],
	['hile-finals', 'hile-warzone'],
	['finals-hile', 'warzone-hile'],
	['finals-esp-chity', 'warzone-esp-chity'],
	['finals-aimbot-chity', 'warzone-aimbot-chity'],
	['unentdeckte-finals-cheats', 'unentdeckte-warzone-hacks'],
	['cheats-finals-indetectaveis', 'hacks-warzone-indetectaveis'],
	['trucchi-finals-indetectabili', 'trucchi-warzone-indetectabili'],
	['niewykrywalne-cheats-finals', 'niewykrywalne-hacks-warzone'],
	['nedecektiruemye-chity-finals', 'nedecektiruemye-chity-warzone'],
	['tespit-edilemeyen-finals-hileleri', 'tespit-edilemeyen-warzone-hileleri'],
	['nedecektovani-chity-finals', 'nedecektovani-chity-warzone'],
	['cheats-finals-nedetectabile', 'hacks-warzone-nedetectabile'],
	['basta-finals-cheats', 'basta-warzone-hacks'],
	['finals-cheats-funktionen', 'warzone-hacks-funktionen'],
	['finals-cheats-functies', 'warzone-hacks-functies'],
	['caracteristicas-trucos-finals', 'caracteristicas-trucos-warzone'],
	['fonctionnalites-triche-finals', 'fonctionnalites-triche-warzone'],
	['recursos-cheats-finals', 'recursos-hacks-warzone'],
	['arenas, stadiums, and cashout zones', 'maps, sites, and buy stations'],
	['arenas, stadiums and cashout zones', 'maps, sites and buy stations'],
	['cashout rounds and arena PvP sessions', 'Battle Royale rounds and Battle Royale matches'],
	['cashout rounds and arena PvP fights', 'Battle Royale rounds and Battle Royale matches'],
	['contestants & cashout teams', 'agents & ranked teams'],
	['spike markers', 'operator markers'],
	['cashout zones', 'buy stations'],
	['arenas and cashout spikes', 'maps and bomb sites'],
	['near arenas and cashout spikes', 'near bomb sites and choke points'],
	['cashout routes', 'loadout drop routes'],
	['Spike and cashout ESP', 'Agent and ability ESP'],
	['spike ESP', 'operator ESP'],
	['cashout worth the detour', 'round win worth the push'],
	['arena tools', 'tactical tools'],
	['Embark Studios', 'Riot Games'],
	['arena fight', 'competitive fight'],
	['arena fights', 'competitive fights'],
	['arena tips', 'competitive tips'],
	['arena map', 'map callouts'],
	['in stadiums', 'on maps'],
	['in cashout zones', 'on bomb sites'],
	['Arena', 'Map'],
	['FinalsCheatsSite', 'Call of Duty: WarzoneCheatsSite'],
	['Finals Intel', 'Warzone Intel'],
	['The Final Cheats', 'Warzone Hacks'],
	['the finals cheats', 'warzone cheats'],
	['the finals cheat', 'warzone cheat'],
	['thefinals cheats', 'warzone cheats'],
	['thefinals cheat', 'warzone cheat'],
	['thefinals hacks', 'warzone hacks'],
	['thefinals hack', 'warzone hack'],
	['The Finals ESP', 'Call of Duty: Warzone ESP'],
	['The Finals Aimbot', 'Call of Duty: Warzone Aimbot'],
	['the finals esp', 'warzone esp'],
	['the finals aimbot', 'warzone aimbot'],
	['the finals wallhack', 'warzone wallhack'],
	['the finals radar', 'warzone radar'],
	['Buy The Finals Cheats', 'Buy Warzone Hacks'],
	['what-are-finals-cheats', 'what-are-warzone-hacks'],
	['are-finals-cheats-undetected-in-2026', 'are-warzone-hacks-undetected-in-2026'],
	['cashout-rounds-and-arena-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-finals-wallhack', 'what-is-a-warzone-wallhack'],
	['does-finals-cheats-include-radar-hack', 'does-warzone-hacks-include-radar-hack'],
	['eac-anti-cheat-and-finals-cheats', 'ricochet-anti-cheat-and-warzone-hacks'],
	['buy-undetected-finals-cheats-windows-pc', 'buy-undetected-warzone-hacks-windows-pc'],
	['finals-soft-aim-review', 'warzone-soft-aim-review'],
	['finals-esp-cashout-review', 'warzone-esp-ranked-review'],
	['finals-cloud-dma-review', 'warzone-cloud-dma-review'],
	['finals-cheat-setup-review', 'warzone-cheat-setup-review'],
	['finals-spike-esp-review', 'warzone-agent-esp-review'],
	['finals-soft-aim-match-review', 'warzone-soft-aim-ranked-review'],
	['finals-radar-hack-review', 'warzone-radar-hack-review'],
	['finals-eac-update-review', 'warzone-ricochet-update-review'],
	['finals-sniper-soft-aim-review', 'warzone-operator-soft-aim-review'],
	['xKrypt0_Finals', 'xKrypt0_Call of Duty: Warzone'],
	['vanLifeFinals', 'vanLifeCall of Duty: Warzone'],
	['finals-screenshot', 'warzone-screenshot'],
	['finals-cheats-logo', 'warzone-hacks-logo'],
	['finals-cheats-hero', 'warzone-hacks-hero'],
	['finals-hero-banner', 'warzone-hero-banner'],
	['finals-hero-ghost', 'warzone-hero-ghost'],
	['finals-hero-source', 'warzone-hero-source'],
	['finals-esp-player-tags', 'warzone-esp-player-tags'],
	['finals-wallhack-skeleton', 'warzone-wallhack-skeleton'],
	['finals-aimbot-skeleton', 'warzone-aimbot-skeleton'],
	['finals-aimbot-sniper', 'warzone-aimbot-operator'],
	['finals-esp-radar', 'warzone-esp-radar'],
	['finals-cheats-combat', 'warzone-hacks-combat'],
	['finals-cheats-wallhack', 'warzone-hacks-wallhack'],
	['finals-cheats-aimbot-view', 'warzone-hacks-aimbot-view'],
	['finals-cheats-aimbot', 'warzone-hacks-aimbot'],
	['finals-cheats-radar', 'warzone-hacks-radar'],
	['finals-cheats-session', 'warzone-hacks-session'],
	['finals-cheats-esp', 'warzone-hacks-esp'],
	['The Finals Hacks', 'Warzone Hacks'],
	['The Finals Features', 'Call of Duty: Warzone Features'],
	['The Finals Status', 'Call of Duty: Warzone Status'],
	['The Finals patches', 'Call of Duty: Warzone patches'],
	['The Finals updates', 'Call of Duty: Warzone updates'],
	['The Finals setup', 'Call of Duty: Warzone setup'],
	['The Finals license', 'Call of Duty: Warzone license'],
	['The Finals licenses', 'Call of Duty: Warzone licenses'],
	['The Finals on Steam', 'Call of Duty: Warzone on PC'],
	['eac-bypass', 'ricochet-bypass'],
	['EAC bypass', 'Ricochet bypass'],
	['EAC Bypass', 'Ricochet Bypass'],
	['EAC maintenance', 'Ricochet maintenance'],
	['EAC rebuilds', 'Vanguard rebuilds'],
	['EAC update', 'Ricochet update'],
	['EAC updates', 'Ricochet updates'],
	['EAC patch', 'Ricochet patch'],
	['EAC patches', 'Ricochet patches'],
	['Easy Anti-Cheat (EAC)', 'Vanguard'],
	['Easy Anti-Cheat', 'Vanguard'],
	["'eac'", "'ricochet'"],
	['| eac', '| ricochet'],
	['eac-anti-cheat', 'ricochet-anti-cheat'],
	['fc_locale', 'vc_locale'],
	['in The Finals', 'in Call of Duty: Warzone'],
	['for The Finals', 'for Call of Duty: Warzone'],
	['The Finals on', 'Call of Duty: Warzone on'],
	['The Finals or', 'Call of Duty: Warzone or'],
	["The Finals'", "Call of Duty: Warzone's"],
	['The Finals ', 'Call of Duty: Warzone '],
	['The Finals,', 'Call of Duty: Warzone,'],
	['The Finals.', 'Call of Duty: Warzone.'],
	['The Finals', 'Call of Duty: Warzone'],
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
	'adapt-warzone.mjs',
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

async function renameFinalsTs() {
	const from = path.join(ROOT, 'src', 'data', 'finals.ts');
	const to = path.join(ROOT, 'src', 'data', 'warzone.ts');
	try {
		await rename(from, to);
		console.log('Renamed finals.ts → warzone.ts');
	} catch (e) {
		console.warn(`finals.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-finals-images.mjs', 'fetch-warzone-images.mjs'],
		['fetch-finals-hero.mjs', 'fetch-warzone-hero.mjs'],
		['import-finals-screenshots.mjs', 'import-warzone-screenshots.mjs'],
		['finals-hack-overlays.mjs', 'warzone-hack-overlays.mjs'],
		['fix-finals-copy.mjs', 'fix-warzone-copy.mjs'],
		['fix-finals-content.mjs', 'fix-warzone-content.mjs'],
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
		'warzone-aimbot': 'warzone-aimbot',
		'warzone-esp': 'warzone-esp',
		'warzone-wallhack': 'wallhack',
		'warzone-radar-hack': 'radar',
		'undetected-warzone-hacks': 'undetected',
		'warzone-hacks-2026': 'cheats-2026',
		'ricochet-bypass': 'ricochet',
		'warzone-hacks': 'hacks',
		'warzone-cheat-download': 'cheat-download',
		'warzone-mod-menu': 'mod-menu',
		'warzone-soft-aim': 'soft-aim',
		'best-warzone-hacks': 'best-cheats',
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
		if (!file.includes('finals')) continue;
		const newName = file
			.replace(/finals-cheats/g, 'warzone-hacks')
			.replace(/finals/g, 'warzone');
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
	console.log('Adapting The Final Cheats → Warzone Hacks (warzonehacks.org)...\n');
	await renamePageDirs();
	await renameFinalsTs();
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
