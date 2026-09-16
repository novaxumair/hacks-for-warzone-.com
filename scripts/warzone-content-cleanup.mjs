#!/usr/bin/env node
/**
 * Bulk Warzone lexicon cleanup — removes Valorant/Vanguard leftovers from source files.
 * Run before generate:i18n and generate-blog-posts.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SKIP = new Set([
	'scripts/adapt-valorant-to-warzone.mjs',
	'scripts/adapt-valorant.mjs',
	'scripts/adapt-valorant-site.mjs',
	'scripts/adapt-naraka.mjs',
	'scripts/fix-valorant-lexicon.mjs',
	'scripts/warzone-content-cleanup.mjs',
	'src/data/brand.ts',
	'scripts/validate-checkout-links.mjs',
]);

/** Order matters — longer phrases first. */
const REPLACEMENTS = [
	['ranked & competitive ranked', 'Battle Royale and Resurgence'],
	['Ranked & competitive ranked', 'Battle Royale and Resurgence'],
	['Vanguard rebuilds', 'Ricochet rebuilds'],
	['Vanguard maintenance', 'Ricochet maintenance'],
	['Mantenimiento Vanguard', 'Mantenimiento Ricochet'],
	['Maintenance Vanguard', 'Maintenance Ricochet'],
	['Vanguard-underhåll', 'Ricochet-underhåll'],
	['Vanguard-Wartung', 'Ricochet-Wartung'],
	['Vanguard supported', 'Ricochet supported'],
	['Vanguard Updates', 'Ricochet Updates'],
	['Bypass Vanguard', 'Ricochet Bypass'],
	['How does Vanguard', 'How does Ricochet'],
	['Vanguard monitors', 'Ricochet monitors'],
	['keep Vanguard status', 'keep Ricochet status'],
	['Vanguard and report', 'Ricochet and report'],
	['parches de Vanguard', 'parches de Ricochet'],
	['patches Vanguard', 'patches Ricochet'],
	['with Vanguard', 'with Ricochet'],
	['& Vanguard', '& Ricochet'],
	['Vanguard incluido', 'Ricochet incluido'],
	['Vanguard inclus', 'Ricochet inclus'],
	['Vanguard support', 'Ricochet support'],
	['Vanguard rebuild', 'Ricochet rebuild'],
	['Vanguard patch', 'Ricochet patch'],
	['Vanguard update', 'Ricochet update'],
	['Vanguard FAQ', 'Ricochet FAQ'],
	['Vanguard rebuilds', 'Ricochet rebuilds'],
	['Vanguard', 'Ricochet'],
	['Riot Games', 'Activision'],
	["Riot's", "Activision's"],
	['Riot ', 'Activision '],
	['from Riot', 'from Activision'],
	['on Riot', 'on Activision'],
	['Unrated and Ranked', 'public matches and Battle Royale'],
	['Unrated', 'public matches'],
	['Ranked queues', 'Battle Royale queues'],
	['before Ranked', 'before Battle Royale'],
	['in Ranked', 'in Battle Royale'],
	['for Ranked', 'for Battle Royale'],
	['Ranked and Resurgence', 'Battle Royale and Resurgence'],
	['Ranked duels', 'mid-range gunfights'],
	['Ranked sessions', 'Battle Royale sessions'],
	['Ranked play', 'Battle Royale play'],
	['Ranked firefight', 'Battle Royale firefight'],
	['Ranked competitive', 'Battle Royale'],
	['competitive ranked', 'Battle Royale'],
	['Vandal and Phantom', 'assault rifles and SMGs'],
	['Vandal', 'assault rifle'],
	['Phantom', 'SMG'],
	[' on Haven', ' at Train Wreck'],
	[' on Bind', ' on Main Street'],
	[' on Ascent', ' at Coal Depot'],
	[' on Split', ' at Verdansk'],
	[' on Breeze', ' in Urzikstan'],
	['Finals intel', 'Warzone intel'],
	['The Finals', 'Call of Duty: Warzone'],
	['grapple and ult cues', 'loadout and streak cues'],
	['agent abilities', 'operator loadouts'],
	['agent tiers', 'weapon meta tiers'],
	['agent abilitys', 'operator loadouts'],
	['When Riot adjusts', 'When Activision adjusts'],
	['When Riot drops', 'When Activision drops'],
	['>Vanguard<', '>Ricochet anti-cheat<'],
	['rel="noopener noreferrer">Vanguard</a>', 'rel="noopener noreferrer">Ricochet anti-cheat</a>'],
	['Warzone Cheats agent', 'Warzone Cheats overlay'],
	['agents through walls', 'players through walls'],
	['enemy agents', 'enemy players'],
	['valorant', 'warzone'],
	['Valorant', 'Warzone'],
];

async function walk(dir, acc = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const rel = path.relative(ROOT, path.join(dir, e.name)).replace(/\\/g, '/');
		if (e.isDirectory()) {
			if (['node_modules', 'dist', '.git', '.astro'].includes(e.name)) continue;
			await walk(path.join(dir, e.name), acc);
		} else if (/\.(mjs|ts|tsx|astro|json)$/.test(e.name) && !rel.includes('content.generated') && !rel.includes('posts.generated')) {
			if (!SKIP.has(rel)) acc.push(path.join(dir, e.name));
		}
	}
	return acc;
}

function applyReplacements(text) {
	let out = text;
	for (const [from, to] of REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	return out;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const before = await readFile(file, 'utf8');
		const after = applyReplacements(before);
		if (after !== before) {
			await writeFile(file, after, 'utf8');
			changed++;
			console.log('fixed:', path.relative(ROOT, file));
		}
	}
	console.log(`\nDone — ${changed} files updated.`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
