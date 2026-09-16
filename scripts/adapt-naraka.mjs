#!/usr/bin/env node
/**
 * One-time migration: Warzone Hacks → Naraka Cheats (narakacheats.org).
 * Run from project root: node scripts/adapt-naraka.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['warzone-aimbot', 'naraka-aimbot'],
	['warzone-esp', 'naraka-esp'],
	['warzone-wallhack', 'naraka-wallhack'],
	['warzone-radar-hack', 'naraka-radar-hack'],
	['undetected-warzone-hacks', 'undetected-naraka-cheats'],
	['warzone-hacks-2026', 'naraka-cheats-2026'],
	['ricochet-bypass', 'neac-bypass'],
	['warzone-hacks', 'naraka-cheats'],
	['warzone-cheat-download', 'naraka-cheat-download'],
	['warzone-mod-menu', 'naraka-mod-menu'],
	['warzone-soft-aim', 'naraka-soft-aim'],
	['best-warzone-hacks', 'best-naraka-cheats'],
	['warzone-aimbot-hack', 'naraka-aimbot-hack'],
	['warzone-esp-hack', 'naraka-esp-hack'],
	['warzone-unlock-all', 'naraka-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.warzonehacks.org', 'https://www.narakacheats.org'],
	['https://warzonehacks.org', 'https://narakacheats.org'],
	['https://www.warzonecheats.org', 'https://www.narakacheats.org'],
	['https://warzonecheats.org', 'https://narakacheats.org'],
	['www.warzonehacks.org', 'www.narakacheats.org'],
	['www.warzonecheats.org', 'www.narakacheats.org'],
	['warzonehacks.org', 'narakacheats.org'],
	['warzonecheats.org', 'narakacheats.org'],
	['support@warzonehacks.org', 'support@narakacheats.org'],
	['support@warzonecheats.org', 'support@narakacheats.org'],
	['project-name=warzonehacks', 'project-name=narakacheats'],
	['name = "warzone-hacks-org"', 'name = "naraka-cheats-org"'],
	['name = "warzonehacks"', 'name = "naraka-cheats-org"'],
	['"name": "warzone-hacks"', '"name": "naraka-cheats"'],
	['https://www.callofduty.com/warzone/news', 'https://store.steampowered.com/app/1203220/news/'],
	['https://www.callofduty.com/warzone', 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/'],
	['https://www.callofduty.com/warzone', 'https://store.steampowered.com/app/1203220'],
	['https://callofduty.fandom.com/wiki/Call_of_Duty:_Warzone', 'https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT'],
	['https://callofduty.fandom.com', 'https://naraka.fandom.com'],
	['playwarzone.com', 'store.steampowered.com/app/1203220'],
	['warzone.fandom.com', 'naraka.fandom.com'],
	['https://www.reddit.com/r/Warzone/', 'https://www.reddit.com/r/NARAKA/'],
	['https://x.com/warzonehacks', 'https://x.com/narakacheats'],
	['@warzonehacks', '@narakacheats'],
	['/products/warzone', '/products/naraka'],
	['undetected-warzone-hacks', 'undetected-naraka-cheats'],
	['best-warzone-hacks', 'best-naraka-cheats'],
	['warzone-cheat-download', 'naraka-cheat-download'],
	['warzone-hacks-2026', 'naraka-cheats-2026'],
	['warzone-radar-hack', 'naraka-radar-hack'],
	['warzone-aimbot-hack', 'naraka-aimbot-hack'],
	['warzone-esp-hack', 'naraka-esp-hack'],
	['warzone-unlock-all', 'naraka-unlock-all'],
	['warzone-soft-aim', 'naraka-soft-aim'],
	['warzone-mod-menu', 'naraka-mod-menu'],
	['warzone-wallhack', 'naraka-wallhack'],
	['warzone-aimbot', 'naraka-aimbot'],
	['warzone-esp', 'naraka-esp'],
	["'warzone-esp'", "'naraka-esp'"],
	['"warzone-esp"', '"naraka-esp"'],
	["'warzone-aimbot'", "'naraka-aimbot'"],
	['"warzone-aimbot"', '"naraka-aimbot"'],
	['warzone-hacks', 'naraka-cheats'],
	['warzone-cheat', 'naraka-cheat'],
	['warzoneImages', 'narakaImages'],
	["from './warzone'", "from './naraka'"],
	["from '../data/warzone'", "from '../data/naraka'"],
	["from '../../data/warzone'", "from '../../data/naraka'"],
	['fetch-warzone-images', 'fetch-naraka-images'],
	['fetch-warzone-hero', 'fetch-naraka-hero'],
	['import-warzone-screenshots', 'import-naraka-screenshots'],
	['warzone-hack-overlays', 'naraka-hack-overlays'],
	['fix-warzone-copy', 'fix-naraka-copy'],
	['fix-warzone-content', 'fix-naraka-content'],
	['fix-warzone-lexicon', 'fix-naraka-lexicon'],
	['adapt-warzone', 'adapt-naraka'],
	['rebrand-warzone-hacks', 'rebrand-naraka-cheats'],
	['trucos-warzone', 'trucos-naraka'],
	['triche-warzone', 'triche-naraka'],
	['cheats-warzone', 'cheats-naraka'],
	['trucchi-warzone', 'trucchi-naraka'],
	['cheaty-warzone', 'cheaty-naraka'],
	['chity-warzone', 'chity-naraka'],
	['chitov-warzone', 'chitov-naraka'],
	['chitiv-warzone', 'chitiv-naraka'],
	['cheatow-warzone', 'cheatow-naraka'],
	['hile-warzone', 'hile-naraka'],
	['warzone-hile', 'naraka-hile'],
	['warzone-esp-chity', 'naraka-esp-chity'],
	['warzone-aimbot-chity', 'naraka-aimbot-chity'],
	['unentdeckte-warzone-hacks', 'unentdeckte-naraka-cheats'],
	['hacks-warzone-indetectaveis', 'cheats-naraka-indetectaveis'],
	['trucchi-warzone-indetectabili', 'trucchi-naraka-indetectabili'],
	['niewykrywalne-hacks-warzone', 'niewykrywalne-cheats-naraka'],
	['nedecektiruemye-chity-warzone', 'nedecektiruemye-chity-naraka'],
	['tespit-edilemeyen-warzone-hileleri', 'tespit-edilemeyen-naraka-hileleri'],
	['nedecektovani-chity-warzone', 'nedecektovani-chity-naraka'],
	['hacks-warzone-nedetectabile', 'cheats-naraka-nedetectabile'],
	['basta-warzone-hacks', 'basta-naraka-cheats'],
	['warzone-hacks-funktionen', 'naraka-cheats-funktionen'],
	['warzone-hacks-functies', 'naraka-cheats-functies'],
	['caracteristicas-trucos-warzone', 'caracteristicas-trucos-naraka'],
	['fonctionnalites-triche-warzone', 'fonctionnalites-triche-naraka'],
	['recursos-hacks-warzone', 'recursos-cheats-naraka'],
	['maps, sites, and buy stations', 'maps, zones, and combat points'],
	['maps, sites and buy stations', 'maps, zones and combat points'],
	['Battle Royale rounds and Battle Royale matches', 'battle royale rounds and Battle Royale matches'],
	['agents & ranked teams', 'heroes & ranked teams'],
	['operator markers', 'hero markers'],
	['buy stations', 'combat zones'],
	['maps and bomb sites', 'maps and combat zones'],
	['near bomb sites and choke points', 'near combat zones and choke points'],
	['loadout drop routes', 'grapple routes'],
	['Agent and ability ESP', 'Hero and weapon ESP'],
	['operator ESP', 'hero ESP'],
	['round win worth the push', 'elimination worth the push'],
	['tactical tools', 'melee combat tools'],
	['Riot Games', '24 Entertainment'],
	['competitive fight', 'melee combat'],
	['competitive fights', 'melee combat sessions'],
	['competitive tips', 'battle royale tips'],
	['map callouts', 'map zones'],
	['on bomb sites', 'in combat zones'],
	['Call of Duty: WarzoneCheatsSite', 'NarakaCheatsSite'],
	['Warzone Intel', 'Naraka Intel'],
	['Warzone Hacks', 'Naraka Cheats'],
	['warzone cheats', 'naraka cheats'],
	['warzone cheat', 'naraka cheat'],
	['warzone hacks', 'naraka cheats'],
	['warzone hack', 'naraka cheat'],
	['Call of Duty: Warzone ESP', 'Naraka ESP'],
	['Call of Duty: Warzone Aimbot', 'Naraka Aimbot'],
	['warzone esp', 'naraka esp'],
	['warzone aimbot', 'naraka aimbot'],
	['warzone wallhack', 'naraka wallhack'],
	['warzone radar', 'naraka radar'],
	['Buy Warzone Hacks', 'Buy Naraka Cheats'],
	['what-are-warzone-hacks', 'what-are-naraka-cheats'],
	['are-warzone-hacks-undetected-in-2026', 'are-naraka-cheats-undetected-in-2026'],
	['competitive-rounds-and-ranked-sessions', 'battle-royale-rounds-and-ranked-sessions'],
	['what-is-a-warzone-wallhack', 'what-is-a-naraka-wallhack'],
	['does-warzone-hacks-include-radar-hack', 'does-naraka-cheats-include-radar-hack'],
	['ricochet-anti-cheat-and-warzone-hacks', 'neac-anti-cheat-and-naraka-cheats'],
	['buy-undetected-warzone-hacks-windows-pc', 'buy-undetected-naraka-cheats-windows-pc'],
	['warzone-soft-aim-review', 'naraka-soft-aim-review'],
	['warzone-esp-ranked-review', 'naraka-esp-ranked-review'],
	['warzone-cloud-dma-review', 'naraka-cloud-dma-review'],
	['warzone-cheat-setup-review', 'naraka-cheat-setup-review'],
	['warzone-agent-esp-review', 'naraka-hero-esp-review'],
	['warzone-soft-aim-ranked-review', 'naraka-soft-aim-ranked-review'],
	['warzone-radar-hack-review', 'naraka-radar-hack-review'],
	['warzone-ricochet-update-review', 'naraka-neac-update-review'],
	['warzone-operator-soft-aim-review', 'naraka-melee-soft-aim-review'],
	['xKrypt0_Call of Duty: Warzone', 'xKrypt0_Naraka'],
	['vanLifeCall of Duty: Warzone', 'vanLifeNaraka'],
	['warzone-screenshot', 'naraka-screenshot'],
	['warzone-hacks-logo', 'naraka-cheats-logo'],
	['warzone-hacks-hero', 'naraka-cheats-hero'],
	['warzone-hero-banner', 'naraka-hero-banner'],
	['warzone-hero-ghost', 'naraka-hero-ghost'],
	['warzone-hero-source', 'naraka-hero-source'],
	['warzone-esp-player-tags', 'naraka-esp-player-tags'],
	['warzone-wallhack-skeleton', 'naraka-wallhack-skeleton'],
	['warzone-aimbot-skeleton', 'naraka-aimbot-skeleton'],
	['warzone-aimbot-operator', 'naraka-aimbot-melee'],
	['warzone-esp-radar', 'naraka-esp-radar'],
	['warzone-hacks-combat', 'naraka-cheats-combat'],
	['warzone-hacks-wallhack', 'naraka-cheats-wallhack'],
	['warzone-hacks-aimbot-view', 'naraka-cheats-aimbot-view'],
	['warzone-hacks-aimbot', 'naraka-cheats-aimbot'],
	['warzone-hacks-radar', 'naraka-cheats-radar'],
	['warzone-hacks-session', 'naraka-cheats-session'],
	['warzone-hacks-esp', 'naraka-cheats-esp'],
	['Call of Duty: Warzone Features', 'Naraka Features'],
	['Call of Duty: Warzone Status', 'Naraka Status'],
	['Call of Duty: Warzone patches', 'Naraka patches'],
	['Call of Duty: Warzone updates', 'Naraka updates'],
	['Call of Duty: Warzone setup', 'Naraka setup'],
	['Call of Duty: Warzone license', 'Naraka license'],
	['Call of Duty: Warzone licenses', 'Naraka licenses'],
	['Call of Duty: Warzone on PC', 'Naraka on PC'],
	['Call of Duty: Warzone on Steam', 'Naraka on Steam'],
	['ricochet-bypass', 'neac-bypass'],
	['Ricochet bypass', 'NEAC bypass'],
	['Ricochet Bypass', 'NEAC Bypass'],
	['Ricochet maintenance', 'NEAC maintenance'],
	['Vanguard rebuilds', 'NEAC rebuilds'],
	['Ricochet update', 'NEAC update'],
	['Ricochet updates', 'NEAC updates'],
	['Ricochet patch', 'NEAC patch'],
	['Ricochet patches', 'NEAC patches'],
	["'ricochet'", "'neac'"],
	['| ricochet', '| neac'],
	['ricochet-anti-cheat', 'neac-anti-cheat'],
	['vc_locale', 'nc_locale'],
	['in Call of Duty: Warzone', 'in Naraka'],
	['for Call of Duty: Warzone', 'for Naraka'],
	['Call of Duty: Warzone on', 'Naraka on'],
	['Call of Duty: Warzone or', 'Naraka or'],
	["Call of Duty: Warzone's", "Naraka's"],
	['Call of Duty: Warzone ', 'Naraka '],
	['Call of Duty: Warzone,', 'Naraka,'],
	['Call of Duty: Warzone.', 'Naraka.'],
	['Call of Duty: Warzone', 'Naraka'],
	['valo hacks', 'naraka cheats'],
	['valo cheats', 'naraka cheats'],
	['valo/valo cheats', 'naraka/naraka cheats'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp', 'warzone-hacks-org']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-warzone.mjs',
	'adapt-naraka.mjs',
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

async function renameCall of Duty: WarzoneTs() {
	const from = path.join(ROOT, 'src', 'data', 'warzone.ts');
	const to = path.join(ROOT, 'src', 'data', 'naraka.ts');
	try {
		await rename(from, to);
		console.log('Renamed warzone.ts → naraka.ts');
	} catch (e) {
		console.warn(`warzone.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-warzone-images.mjs', 'fetch-naraka-images.mjs'],
		['fetch-warzone-hero.mjs', 'fetch-naraka-hero.mjs'],
		['import-warzone-screenshots.mjs', 'import-naraka-screenshots.mjs'],
		['warzone-hack-overlays.mjs', 'naraka-hack-overlays.mjs'],
		['fix-warzone-copy.mjs', 'fix-naraka-copy.mjs'],
		['fix-warzone-content.mjs', 'fix-naraka-content.mjs'],
		['fix-warzone-lexicon.mjs', 'fix-naraka-lexicon.mjs'],
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
		'naraka-aimbot': 'naraka-aimbot',
		'naraka-esp': 'naraka-esp',
		'naraka-wallhack': 'wallhack',
		'naraka-radar-hack': 'radar',
		'undetected-naraka-cheats': 'undetected',
		'naraka-cheats-2026': 'cheats-2026',
		'neac-bypass': 'neac',
		'naraka-cheats': 'hacks',
		'naraka-cheat-download': 'cheat-download',
		'naraka-mod-menu': 'mod-menu',
		'naraka-soft-aim': 'soft-aim',
		'best-naraka-cheats': 'best-cheats',
		'naraka-aimbot-hack': 'aimbot-hack',
		'naraka-esp-hack': 'esp-hack',
		'naraka-unlock-all': 'unlock-all',
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
		const newName = file
			.replace(/warzone-hacks/g, 'naraka-cheats')
			.replace(/warzone/g, 'naraka');
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
	console.log('Adapting Warzone Hacks → Naraka Cheats (narakacheats.org)...\n');
	await renamePageDirs();
	await renameCall of Duty: WarzoneTs();
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
