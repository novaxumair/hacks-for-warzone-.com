#!/usr/bin/env node
/**
 * One-time migration: Valorant Cheats template → Call of Duty Warzone (cheatsforwarzone.com).
 * Run from project root: node scripts/adapt-valorant-to-warzone.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['valorant-aimbot', 'warzone-aimbot'],
	['valorant-esp', 'warzone-esp'],
	['valorant-wallhack', 'warzone-wallhack'],
	['valorant-radar-hack', 'warzone-radar-hack'],
	['undetected-valorant-cheats', 'undetected-warzone-cheats'],
	['valorant-cheats-2026', 'warzone-cheats-2026'],
	['vanguard-bypass', 'ricochet-bypass'],
	['valorant-cheats', 'warzone-cheats'],
	['valorant-cheat-download', 'warzone-cheat-download'],
	['valorant-mod-menu', 'warzone-mod-menu'],
	['valorant-soft-aim', 'warzone-soft-aim'],
	['best-valorant-cheats', 'best-warzone-cheats'],
	['valorant-aimbot-hack', 'warzone-aimbot-hack'],
	['valorant-esp-hack', 'warzone-esp-hack'],
	['valorant-unlock-all', 'warzone-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://cheatsforvalorant.net', 'https://cheatsforwarzone.com'],
	['cheatsforvalorant.net', 'cheatsforwarzone.com'],
	['support@cheatsforvalorant.net', 'support@cheatsforwarzone.com'],
	['project-name=cheatsforvalorant', 'project-name=cheatsforwarzone'],
	['name = "cheats-for-valorant"', 'name = "cheats-for-warzone"'],
	['"name": "cheats-for-valorant"', '"name": "cheats-for-warzone"'],
	['https://playvalorant.com/en-us/news/', 'https://www.callofduty.com/warzone/news'],
	['https://playvalorant.com/', 'https://www.callofduty.com/warzone'],
	['https://playvalorant.com', 'https://www.callofduty.com/warzone'],
	['https://valorant.fandom.com/wiki/VALORANT', 'https://callofduty.fandom.com/wiki/Call_of_Duty:_Warzone'],
	['https://valorant.fandom.com', 'https://callofduty.fandom.com'],
	['https://www.reddit.com/r/VALORANT/', 'https://www.reddit.com/r/Warzone/'],
	['https://x.com/PlayVALORANT', 'https://x.com/CallofDuty'],
	['@PlayVALORANT', '@CallofDuty'],
	['/products/valorant', '/products/warzone'],
	['undetected-valorant-cheats', 'undetected-warzone-cheats'],
	['best-valorant-cheats', 'best-warzone-cheats'],
	['valorant-cheat-download', 'warzone-cheat-download'],
	['valorant-cheats-2026', 'warzone-cheats-2026'],
	['valorant-radar-hack', 'warzone-radar-hack'],
	['valorant-aimbot-hack', 'warzone-aimbot-hack'],
	['valorant-esp-hack', 'warzone-esp-hack'],
	['valorant-unlock-all', 'warzone-unlock-all'],
	['valorant-soft-aim', 'warzone-soft-aim'],
	['valorant-mod-menu', 'warzone-mod-menu'],
	['valorant-wallhack', 'warzone-wallhack'],
	['valorant-aimbot', 'warzone-aimbot'],
	['valorant-esp', 'warzone-esp'],
	["'valorant-esp'", "'warzone-esp'"],
	['"valorant-esp"', '"warzone-esp"'],
	["'valorant-aimbot'", "'warzone-aimbot'"],
	['"valorant-aimbot"', '"warzone-aimbot"'],
	['valorant-cheats', 'warzone-cheats'],
	['valorant-cheat', 'warzone-cheat'],
	['valorantImages', 'warzoneImages'],
	["from './valorant'", "from './warzone'"],
	["from '../data/valorant'", "from '../data/warzone'"],
	["from '../../data/valorant'", "from '../../data/warzone'"],
	['fetch-valorant-images', 'fetch-warzone-images'],
	['fetch-valorant-hero', 'fetch-warzone-hero'],
	['import-valorant-screenshots', 'import-warzone-screenshots'],
	['valorant-hack-overlays', 'warzone-hack-overlays'],
	['fix-valorant-copy', 'fix-warzone-copy'],
	['fix-valorant-content', 'fix-warzone-content'],
	['fix-valorant-lexicon', 'fix-warzone-lexicon'],
	['adapt-valorant-site', 'adapt-warzone-site'],
	['rebrand-valorant-cheats', 'rebrand-warzone-cheats'],
	['trucos-valorant', 'trucos-warzone'],
	['triche-valorant', 'triche-warzone'],
	['cheats-valorant', 'cheats-warzone'],
	['trucchi-valorant', 'trucchi-warzone'],
	['cheaty-valorant', 'cheaty-warzone'],
	['chity-valorant', 'chity-warzone'],
	['chitov-valorant', 'chitov-warzone'],
	['chitiv-valorant', 'chitiv-warzone'],
	['cheatow-valorant', 'cheatow-warzone'],
	['hile-valorant', 'hile-warzone'],
	['valorant-hile', 'warzone-hile'],
	['valorant-esp-chity', 'warzone-esp-chity'],
	['valorant-aimbot-chity', 'warzone-aimbot-chity'],
	['unentdeckte-valorant-cheats', 'unentdeckte-warzone-cheats'],
	['cheats-valorant-indetectaveis', 'cheats-warzone-indetectaveis'],
	['trucchi-valorant-indetectabili', 'trucchi-warzone-indetectabili'],
	['niewykrywalne-cheats-valorant', 'niewykrywalne-cheats-warzone'],
	['nedecektiruemye-chity-valorant', 'nedecektiruemye-chity-warzone'],
	['tespit-edilemeyen-valorant-hileleri', 'tespit-edilemeyen-warzone-hileleri'],
	['nedecektovani-chity-valorant', 'nedecektovani-chity-warzone'],
	['cheats-valorant-nedetectabile', 'cheats-warzone-nedetectabile'],
	['basta-valorant-cheats', 'basta-warzone-cheats'],
	['valorant-cheats-funktionen', 'warzone-cheats-funktionen'],
	['valorant-cheats-functies', 'warzone-cheats-functies'],
	['caracteristicas-trucos-valorant', 'caracteristicas-trucos-warzone'],
	['fonctionnalites-triche-valorant', 'fonctionnalites-triche-warzone'],
	['recursos-cheats-valorant', 'recursos-cheats-warzone'],
	['funzioni-trucchi-valorant', 'funzioni-trucchi-warzone'],
	["'vanguard'", "'ricochet'"],
	['| vanguard', '| ricochet'],
	['vanguard-bypass', 'ricochet-bypass'],
	['Valorant Hacks', 'Warzone Hacks'],
	['Valorant Cheats', 'Warzone Cheats'],
	['Valorant cheats', 'Warzone cheats'],
	['Valorant cheat', 'Warzone cheat'],
	['Valorant Intel', 'Warzone Intel'],
	['Vanguard anti-cheat', 'Ricochet anti-cheat'],
	['Vanguard maintenance', 'Ricochet maintenance'],
	['Vanguard bypass', 'Ricochet bypass'],
	['Vanguard Bypass', 'Ricochet Bypass'],
	['Vanguard patches', 'Ricochet patches'],
	['Vanguard patch', 'Ricochet patch'],
	['Vanguard updates', 'Ricochet updates'],
	['Vanguard update', 'Ricochet update'],
	['after Vanguard', 'after Ricochet'],
	['valorant hacks', 'warzone hacks'],
	['valorant cheats', 'warzone cheats'],
	['Quick Match and Ranked', 'Battle Royale and Resurgence'],
	['Quick Match', 'Resurgence'],
	['ranked matches', 'Battle Royale matches'],
	['competitive rounds', 'Battle Royale rounds'],
	['agent markers', 'operator markers'],
	['agent ESP', 'operator ESP'],
	['enemy agents', 'enemy operators'],
	['spike zones', 'buy stations'],
	['spike plant', 'loadout drop'],
	['valorant-screenshot', 'warzone-screenshot'],
	['valorant-cheats-logo', 'warzone-cheats-logo'],
	['valorant-site-icon', 'warzone-site-icon'],
	['valorant-hero-poster', 'warzone-hero-poster'],
	['valorant-cheats-hero', 'warzone-cheats-hero'],
	['valorant-cheats-esp', 'warzone-cheats-esp'],
	['valorant-cheats-aimbot', 'warzone-cheats-aimbot'],
	['valorant-cheats-wallhack', 'warzone-cheats-wallhack'],
	['valorant-cheats-radar', 'warzone-cheats-radar'],
	['valorant-cheats-combat', 'warzone-cheats-combat'],
	['valorant-cheats-session', 'warzone-cheats-session'],
	['valorant-esp-player-tags', 'warzone-esp-player-tags'],
	['valorant-esp-radar', 'warzone-esp-radar'],
	['valorant-aimbot-skeleton', 'warzone-aimbot-skeleton'],
	['valorant-aimbot-sniper', 'warzone-aimbot-sniper'],
	['valorant-wallhack-skeleton', 'warzone-wallhack-skeleton'],
	['--font-valorant', '--font-warzone'],
	['font-valorant', 'font-warzone'],
	['VALORANT', 'WARZONE'],
	['Valorant', 'Call of Duty: Warzone'],
	['valorant', 'warzone'],
	['vanguard', 'ricochet'],
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
	let out = content;
	for (const [from, to] of REPLACEMENTS) {
		out = out.replaceAll(from, to);
	}
	return out;
}

async function renamePageDirs() {
	const pagesDir = path.join(ROOT, 'src', 'pages');
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const fromPath = path.join(pagesDir, from);
		const toPath = path.join(pagesDir, to);
		try {
			await rename(fromPath, toPath);
			console.log(`Renamed pages/${from} → pages/${to}`);
		} catch {
			// may not exist
		}
	}
}

async function renameDataFile() {
	const from = path.join(ROOT, 'src', 'data', 'valorant.ts');
	const to = path.join(ROOT, 'src', 'data', 'warzone.ts');
	try {
		await rename(from, to);
		console.log('Renamed src/data/valorant.ts → warzone.ts');
	} catch {
		// already renamed
	}
}

async function processFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.includes('adapt-valorant-to-warzone.mjs')) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated);
			changed += 1;
		}
	}
	console.log(`Updated ${changed} files`);
}

async function main() {
	await renamePageDirs();
	await renameDataFile();
	await processFiles();
	console.log('Warzone migration complete.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
