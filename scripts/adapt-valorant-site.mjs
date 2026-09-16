#!/usr/bin/env node
/**
 * One-time migration: Naraka Cheats → Warzone Cheats (cheatsforwarzone.com).
 * Run from project root: node scripts/adapt-warzone-site.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['naraka-aimbot', 'warzone-aimbot'],
	['naraka-esp', 'warzone-esp'],
	['naraka-wallhack', 'warzone-wallhack'],
	['naraka-radar-hack', 'warzone-radar-hack'],
	['undetected-naraka-cheats', 'undetected-warzone-cheats'],
	['naraka-cheats-2026', 'warzone-cheats-2026'],
	['neac-bypass', 'ricochet-bypass'],
	['naraka-cheats', 'warzone-cheats'],
	['naraka-cheat-download', 'warzone-cheat-download'],
	['naraka-mod-menu', 'warzone-mod-menu'],
	['naraka-soft-aim', 'warzone-soft-aim'],
	['best-naraka-cheats', 'best-warzone-cheats'],
	['naraka-aimbot-hack', 'warzone-aimbot-hack'],
	['naraka-esp-hack', 'warzone-esp-hack'],
	['naraka-unlock-all', 'warzone-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.narakacheats.org', 'https://cheatsforwarzone.com'],
	['https://narakacheats.org', 'https://cheatsforwarzone.com'],
	['https://www.warzonehacks.org', 'https://cheatsforwarzone.com'],
	['https://warzonehacks.org', 'https://cheatsforwarzone.com'],
	['www.narakacheats.org', 'cheatsforwarzone.com'],
	['narakacheats.org', 'cheatsforwarzone.com'],
	['support@narakacheats.org', 'support@cheatsforwarzone.com'],
	['project-name=narakacheats', 'project-name=cheatsforwarzone'],
	['name = "naraka-cheats-org"', 'name = "cheats-for-warzone"'],
	['"name": "naraka-cheats"', '"name": "cheats-for-warzone"'],
	['https://store.steampowered.com/app/1203220/news/', 'https://www.callofduty.com/warzone/news'],
	['https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/', 'https://www.callofduty.com/warzone'],
	['https://store.steampowered.com/app/1203220', 'https://www.callofduty.com/warzone'],
	['https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT', 'https://callofduty.fandom.com/wiki/Call_of_Duty:_Warzone'],
	['https://naraka.fandom.com', 'https://callofduty.fandom.com'],
	['store.steampowered.com/app/1203220', 'playwarzone.com'],
	['naraka.fandom.com', 'warzone.fandom.com'],
	['https://www.reddit.com/r/NARAKA/', 'https://www.reddit.com/r/Warzone/'],
	['https://x.com/narakacheats', 'https://x.com/CallofDuty'],
	['@narakacheats', '@CallofDuty'],
	['https://zadeyo.com/go/QRH?to=%2Fproducts%2Fnaraka-bladepoint-novaxware', 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fwarzone'],
	['/products/naraka-bladepoint-novaxware', '/products/warzone'],
	['/products/naraka', '/products/warzone'],
	['undetected-naraka-cheats', 'undetected-warzone-cheats'],
	['best-naraka-cheats', 'best-warzone-cheats'],
	['naraka-cheat-download', 'warzone-cheat-download'],
	['naraka-cheats-2026', 'warzone-cheats-2026'],
	['naraka-radar-hack', 'warzone-radar-hack'],
	['naraka-aimbot-hack', 'warzone-aimbot-hack'],
	['naraka-esp-hack', 'warzone-esp-hack'],
	['naraka-unlock-all', 'warzone-unlock-all'],
	['naraka-soft-aim', 'warzone-soft-aim'],
	['naraka-mod-menu', 'warzone-mod-menu'],
	['naraka-wallhack', 'warzone-wallhack'],
	['naraka-aimbot', 'warzone-aimbot'],
	['naraka-esp', 'warzone-esp'],
	["'naraka-esp'", "'warzone-esp'"],
	['"naraka-esp"', '"warzone-esp"'],
	["'naraka-aimbot'", "'warzone-aimbot'"],
	['"naraka-aimbot"', '"warzone-aimbot"'],
	['naraka-cheats', 'warzone-cheats'],
	['naraka-cheat', 'warzone-cheat'],
	['narakaImages', 'warzoneImages'],
	["from './naraka'", "from './warzone'"],
	["from '../data/naraka'", "from '../data/warzone'"],
	["from '../../data/naraka'", "from '../../data/warzone'"],
	['fetch-naraka-images', 'fetch-warzone-images'],
	['fetch-naraka-hero', 'fetch-warzone-hero'],
	['import-naraka-screenshots', 'import-warzone-screenshots'],
	['naraka-hack-overlays', 'warzone-hack-overlays'],
	['fix-naraka-copy', 'fix-warzone-copy'],
	['fix-naraka-content', 'fix-warzone-content'],
	['fix-naraka-lexicon', 'fix-warzone-lexicon'],
	['adapt-naraka', 'adapt-warzone-site'],
	['rebrand-naraka-cheats', 'rebrand-warzone-cheats'],
	['trucos-naraka', 'trucos-warzone'],
	['triche-naraka', 'triche-warzone'],
	['cheats-naraka', 'cheats-warzone'],
	['trucchi-naraka', 'trucchi-warzone'],
	['cheaty-naraka', 'cheaty-warzone'],
	['chity-naraka', 'chity-warzone'],
	['chitov-naraka', 'chitov-warzone'],
	['chitiv-naraka', 'chitiv-warzone'],
	['cheatow-naraka', 'cheatow-warzone'],
	['hile-naraka', 'hile-warzone'],
	['naraka-hile', 'warzone-hile'],
	['naraka-esp-chity', 'warzone-esp-chity'],
	['naraka-aimbot-chity', 'warzone-aimbot-chity'],
	['unentdeckte-naraka-cheats', 'unentdeckte-warzone-cheats'],
	['cheats-naraka-indetectaveis', 'cheats-warzone-indetectaveis'],
	['trucchi-naraka-indetectabili', 'trucchi-warzone-indetectabili'],
	['niewykrywalne-cheats-naraka', 'niewykrywalne-cheats-warzone'],
	['nedecektiruemye-chity-naraka', 'nedecektiruemye-chity-warzone'],
	['tespit-edilemeyen-naraka-hileleri', 'tespit-edilemeyen-warzone-hileleri'],
	['nedecektovani-chity-naraka', 'nedecektovani-chity-warzone'],
	['cheats-naraka-nedetectabile', 'cheats-warzone-nedetectabile'],
	['basta-naraka-cheats', 'basta-warzone-cheats'],
	['naraka-cheats-funktionen', 'warzone-cheats-funktionen'],
	['naraka-cheats-functies', 'warzone-cheats-functies'],
	['caracteristicas-trucos-naraka', 'caracteristicas-trucos-warzone'],
	['fonctionnalites-triche-naraka', 'fonctionnalites-triche-warzone'],
	['recursos-cheats-naraka', 'recursos-cheats-warzone'],
	['maps, zones, and combat points', 'maps, sites, and buy stations'],
	['maps, zones and combat points', 'maps, sites and buy stations'],
	['battle royale rounds and Battle Royale matches', 'Battle Royale rounds and Battle Royale matches'],
	['heroes & ranked teams', 'agents & ranked teams'],
	['hero markers', 'operator markers'],
	['combat zones', 'buy stations'],
	['maps and combat zones', 'maps and bomb sites'],
	['near combat zones and choke points', 'near bomb sites and choke points'],
	['grapple routes', 'loadout drop routes'],
	['Hero and weapon ESP', 'Agent and ability ESP'],
	['hero ESP', 'operator ESP'],
	['elimination worth the push', 'round win worth the push'],
	['melee combat tools', 'tactical tools'],
	['24 Entertainment', 'Riot Games'],
	['melee combat', 'competitive fight'],
	['melee combat sessions', 'competitive fights'],
	['battle royale tips', 'competitive tips'],
	['map zones', 'map callouts'],
	['in combat zones', 'on bomb sites'],
	['NarakaCheatsSite', 'Call of Duty: WarzoneCheatsSite'],
	['Naraka Intel', 'Warzone Intel'],
	['Naraka Cheats', 'Warzone Cheats'],
	['naraka cheats', 'warzone cheats'],
	['naraka cheat', 'warzone cheat'],
	['Naraka ESP', 'Call of Duty: Warzone ESP'],
	['Naraka Aimbot', 'Call of Duty: Warzone Aimbot'],
	['naraka esp', 'warzone esp'],
	['naraka aimbot', 'warzone aimbot'],
	['naraka wallhack', 'warzone wallhack'],
	['naraka radar', 'warzone radar'],
	['Buy Naraka Cheats', 'Buy Warzone Cheats'],
	['what-are-naraka-cheats', 'what-are-warzone-cheats'],
	['are-naraka-cheats-undetected-in-2026', 'are-warzone-cheats-undetected-in-2026'],
	['battle-royale-rounds-and-ranked-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-naraka-wallhack', 'what-is-a-warzone-wallhack'],
	['does-naraka-cheats-include-radar-hack', 'does-warzone-cheats-include-radar-hack'],
	['neac-anti-cheat-and-naraka-cheats', 'ricochet-anti-cheat-and-warzone-cheats'],
	['buy-undetected-naraka-cheats-windows-pc', 'buy-undetected-warzone-cheats-windows-pc'],
	['naraka-soft-aim-review', 'warzone-soft-aim-review'],
	['naraka-esp-ranked-review', 'warzone-esp-ranked-review'],
	['naraka-cloud-dma-review', 'warzone-cloud-dma-review'],
	['naraka-cheat-setup-review', 'warzone-cheat-setup-review'],
	['naraka-hero-esp-review', 'warzone-agent-esp-review'],
	['naraka-soft-aim-ranked-review', 'warzone-soft-aim-ranked-review'],
	['naraka-radar-hack-review', 'warzone-radar-hack-review'],
	['naraka-neac-update-review', 'warzone-ricochet-update-review'],
	['naraka-melee-soft-aim-review', 'warzone-operator-soft-aim-review'],
	['xKrypt0_Naraka', 'xKrypt0_Call of Duty: Warzone'],
	['vanLifeNaraka', 'vanLifeCall of Duty: Warzone'],
	['naraka-screenshot', 'warzone-screenshot'],
	['naraka-cheats-logo', 'warzone-cheats-logo'],
	['naraka-cheats-hero', 'warzone-cheats-hero'],
	['naraka-hero-banner', 'warzone-hero-banner'],
	['naraka-hero-ghost', 'warzone-hero-ghost'],
	['naraka-hero-source', 'warzone-hero-source'],
	['naraka-esp-player-tags', 'warzone-esp-player-tags'],
	['naraka-wallhack-skeleton', 'warzone-wallhack-skeleton'],
	['naraka-aimbot-skeleton', 'warzone-aimbot-skeleton'],
	['naraka-aimbot-melee', 'warzone-aimbot-operator'],
	['naraka-esp-radar', 'warzone-esp-radar'],
	['naraka-cheats-combat', 'warzone-cheats-combat'],
	['naraka-cheats-wallhack', 'warzone-cheats-wallhack'],
	['naraka-cheats-aimbot-view', 'warzone-cheats-aimbot-view'],
	['naraka-cheats-aimbot', 'warzone-cheats-aimbot'],
	['naraka-cheats-radar', 'warzone-cheats-radar'],
	['naraka-cheats-session', 'warzone-cheats-session'],
	['naraka-cheats-esp', 'warzone-cheats-esp'],
	['Naraka Features', 'Call of Duty: Warzone Features'],
	['Naraka Status', 'Call of Duty: Warzone Status'],
	['Naraka patches', 'Call of Duty: Warzone patches'],
	['Naraka updates', 'Call of Duty: Warzone updates'],
	['Naraka setup', 'Call of Duty: Warzone setup'],
	['Naraka license', 'Call of Duty: Warzone license'],
	['Naraka licenses', 'Call of Duty: Warzone licenses'],
	['Naraka on PC', 'Call of Duty: Warzone on PC'],
	['Naraka on Steam', 'Call of Duty: Warzone on PC'],
	['neac-bypass', 'ricochet-bypass'],
	['NEAC bypass', 'Ricochet bypass'],
	['NEAC Bypass', 'Ricochet Bypass'],
	['NEAC maintenance', 'Ricochet maintenance'],
	['NEAC rebuilds', 'Vanguard rebuilds'],
	['NEAC update', 'Ricochet update'],
	['NEAC updates', 'Ricochet updates'],
	['NEAC patch', 'Ricochet patch'],
	['NEAC patches', 'Ricochet patches'],
	["'neac'", "'ricochet'"],
	['| neac', '| ricochet'],
	['neac-anti-cheat', 'ricochet-anti-cheat'],
	['nc_locale', 'vc_locale'],
	['in Naraka', 'in Call of Duty: Warzone'],
	['for Naraka', 'for Call of Duty: Warzone'],
	['Naraka on', 'Call of Duty: Warzone on'],
	['Naraka or', 'Call of Duty: Warzone or'],
	["Naraka's", "Call of Duty: Warzone's"],
	['Naraka ', 'Call of Duty: Warzone '],
	['Naraka,', 'Call of Duty: Warzone,'],
	['Naraka.', 'Call of Duty: Warzone.'],
	['Naraka', 'Call of Duty: Warzone'],
	['naraka hacks', 'warzone hacks'],
	['naraka hack', 'warzone hack'],
	['naraka/naraka cheats', 'warzone/warzone cheats'],
	// Remove brand references from visible copy (keep checkout URLs intact)
	['Zadeyo checkout', 'secure checkout'],
	['zadeyo checkout', 'secure checkout'],
	['Zadeyo', 'checkout'],
	['narakacheats.net', 'cheatsforwarzone.com'],
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
	'adapt-naraka.mjs',
	'adapt-warzone-site.mjs',
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

async function renameNarakaTs() {
	const from = path.join(ROOT, 'src', 'data', 'naraka.ts');
	const to = path.join(ROOT, 'src', 'data', 'warzone.ts');
	try {
		await rename(from, to);
		console.log('Renamed naraka.ts → warzone.ts');
	} catch (e) {
		console.warn(`naraka.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-naraka-images.mjs', 'fetch-warzone-images.mjs'],
		['fetch-naraka-hero.mjs', 'fetch-warzone-hero.mjs'],
		['import-naraka-screenshots.mjs', 'import-warzone-screenshots.mjs'],
		['naraka-hack-overlays.mjs', 'warzone-hack-overlays.mjs'],
		['fix-naraka-copy.mjs', 'fix-warzone-copy.mjs'],
		['fix-naraka-content.mjs', 'fix-warzone-content.mjs'],
		['fix-naraka-lexicon.mjs', 'fix-warzone-lexicon.mjs'],
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
		'undetected-warzone-cheats': 'undetected',
		'warzone-cheats-2026': 'cheats-2026',
		'ricochet-bypass': 'ricochet',
		'warzone-cheats': 'hacks',
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
		if (!file.includes('naraka')) continue;
		const newName = file
			.replace(/naraka-cheats/g, 'warzone-cheats')
			.replace(/naraka/g, 'warzone');
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
	console.log('Adapting Naraka Cheats → Warzone Cheats (cheatsforwarzone.com)...\n');
	await renamePageDirs();
	await renameNarakaTs();
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
