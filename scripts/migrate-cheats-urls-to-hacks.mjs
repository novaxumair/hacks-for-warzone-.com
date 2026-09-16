#!/usr/bin/env node
/**
 * Migrate URL slugs from warzone-cheats → warzone-cheats (paths + sitemaps).
 * Generates 301 redirects in functions/path-redirects.json from old routing slugs.
 * Run: node scripts/migrate-cheats-urls-to-hacks.mjs
 */
import { readFile, writeFile, readdir, rename, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'warzone-cheats-org-audit',
]);
const SKIP_FILES = new Set(['package-lock.json', 'migrate-cheats-urls-to-hacks.mjs']);

/** Ordered — longest / most specific first. Image asset names are excluded via guard. */
const SLUG_REPLACEMENTS = [
	['undetected-warzone-cheats-eac', 'undetected-warzone-cheats-eac'],
	['undetected-warzone-cheats', 'undetected-warzone-cheats'],
	['unentdeckte-warzone-cheats', 'unentdeckte-warzone-cheats'],
	['buy-undetected-warzone-cheats-windows-pc', 'buy-undetected-warzone-cheats-windows-pc'],
	['ricochet-anti-cheat-and-warzone-cheats', 'ricochet-anti-cheat-and-warzone-cheats'],
	['are-warzone-cheats-undetected-in-2026', 'are-warzone-cheats-undetected-in-2026'],
	['what-are-warzone-cheats', 'what-are-warzone-cheats'],
	['does-warzone-cheats-include-radar-hack', 'does-warzone-cheats-include-radar-hack'],
	['warzone-cheats-vs-ghostware-features-pricing', 'warzone-cheats-vs-ghostware-features-pricing'],
	['warzone-cheats-vs-cheatspike-comparison', 'warzone-cheats-vs-cheatspike-comparison'],
	['elitefn-vs-warzone-cheats-two-week-test', 'elitefn-vs-warzone-cheats-two-week-test'],
	['warzone-cheats-complete-guide-2026', 'warzone-cheats-complete-guide-2026'],
	['warzone-cheats-2026-whats-new', 'warzone-cheats-2026-whats-new'],
	['warzone-cheats-buyers-guide', 'warzone-cheats-buyers-guide'],
	['best-warzone-cheats', 'best-warzone-cheats'],
	['beste-warzone-cheats', 'beste-warzone-cheats'],
	['basta-warzone-cheats', 'basta-warzone-cheats'],
	['nejlepsi-warzone-cheats', 'nejlepsi-warzone-cheats'],
	['warzone-cheats-2026', 'warzone-cheats-2026'],
	['warzone-cheats-funktionen', 'warzone-cheats-funktionen'],
	['warzone-cheats-functies', 'warzone-cheats-functies'],
	['warzone-cheats-funkce', 'warzone-cheats-funkce'],
	['warzone-cheats-funktioner', 'warzone-cheats-funktioner'],
	['warzone-cheats-features', 'warzone-cheats-features'],
	['warzone-cheats-preise', 'warzone-cheats-preise'],
	['warzone-cheats-prijzen', 'warzone-cheats-prijzen'],
	['warzone-cheats-priser', 'warzone-cheats-priser'],
	['warzone-cheats-pricing', 'warzone-cheats-pricing'],
	['warzone-cheats-ceny', 'warzone-cheats-ceny'],
	['warzone-cheats-installation', 'warzone-cheats-installation'],
	['warzone-cheats-installatie', 'warzone-cheats-installatie'],
	['warzone-cheats-instalace', 'warzone-cheats-instalace'],
	['warzone-cheats-setup', 'warzone-cheats-setup'],
	['warzone-cheats-updates', 'warzone-cheats-updates'],
	['warzone-cheats-uppdateringar', 'warzone-cheats-uppdateringar'],
	['warzone-cheats-aktualizace', 'warzone-cheats-aktualizace'],
	['warzone-cheats-faq', 'warzone-cheats-faq'],
	['warzone-cheats-support', 'warzone-cheats-support'],
	['warzone-cheats-podpora', 'warzone-cheats-podpora'],
	['niewykrywalne-cheats-warzone', 'niewykrywalne-cheats-warzone'],
	['najlepsze-cheats-warzone', 'najlepsze-hacks-warzone'],
	['melhores-cheats-warzone', 'melhores-hacks-warzone'],
	['cele-mai-bune-cheats-warzone', 'cele-mai-bune-hacks-warzone'],
	['cheats-warzone-indetectaveis', 'cheats-warzone-indetectaveis'],
	['cheats-warzone-nedetectabile', 'cheats-warzone-nedetectabile'],
	['cheats-warzone-2026', 'hacks-warzone-2026'],
	['hacks-cheats-warzone', 'hacks-warzone'],
	['faq-cheats-warzone', 'faq-hacks-warzone'],
	['functii-cheats-warzone', 'functii-hacks-warzone'],
	['preturi-cheats-warzone', 'preturi-hacks-warzone'],
	['actualizari-cheats-warzone', 'actualizari-hacks-warzone'],
	['instalare-cheats-warzone', 'instalare-hacks-warzone'],
	['suport-cheats-warzone', 'suport-hacks-warzone'],
	['recursos-cheats-warzone', 'recursos-cheats-warzone'],
	['precos-cheats-warzone', 'precos-hacks-warzone'],
	['atualizacoes-cheats-warzone', 'atualizacoes-hacks-warzone'],
	['instalacao-cheats-warzone', 'instalacao-hacks-warzone'],
	['suporte-cheats-warzone', 'suporte-hacks-warzone'],
	['download-cheats-warzone', 'download-hacks-warzone'],
	['menu-mod-cheats-warzone', 'menu-mod-hacks-warzone'],
	['meniu-mod-cheats-warzone', 'meniu-mod-hacks-warzone'],
	['soft-aim-cheats-warzone', 'soft-aim-hacks-warzone'],
	['aimbot-hack-cheats-warzone', 'aimbot-hack-hacks-warzone'],
	['esp-hack-cheats-warzone', 'esp-hack-hacks-warzone'],
	['unlock-all-cheats-warzone', 'unlock-all-hacks-warzone'],
	['wallhack-cheats-warzone', 'wallhack-hacks-warzone'],
	['radar-hack-cheats-warzone', 'radar-hack-hacks-warzone'],
	['descarcare-cheats-warzone', 'descarcare-hacks-warzone'],
	['cheats-warzone-esp', 'hacks-warzone-esp'],
	['cheats-warzone-aimbot', 'hacks-warzone-aimbot'],
	['ricochet-bypass-cheats', 'ricochet-bypass-hacks'],
	['/warzone-cheats/', '/warzone-cheats/'],
	['/warzone-cheats', '/warzone-cheats'],
	["'warzone-cheats'", "'warzone-cheats'"],
	['"warzone-cheats"', '"warzone-cheats"'],
];

const IMAGE_ASSET_PREFIX = '/images/warzone-cheats';

function applySlugReplacements(text) {
	let out = text;
	for (const [from, to] of SLUG_REPLACEMENTS) {
		if (!out.includes(from)) continue;
		out = out
			.split('\n')
			.map((line) => {
				// Never rewrite static image asset filenames.
				if (line.includes('/images/warzone-cheats')) {
					return line;
				}
				return line.split(from).join(to);
			})
			.join('\n');
	}
	return out;
}

function parseEnglishPaths(src) {
	const block = src.match(/export const englishPaths[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
	if (!block) throw new Error('englishPaths block not found');
	/** @type {Record<string, string>} */
	const paths = {};
	for (const row of block[1].matchAll(/\t(?:'([^']+)'|(\w+)):\s*'([^']*)',/g)) {
		paths[row[1] ?? row[2]] = row[3];
	}
	return paths;
}

function parseLocalizedSlugs(src) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
	/** @type {Record<string, Record<string, string>>} */
	const slugs = {};
	for (const block of localized.matchAll(/\t(?:'([^']+)'|(\w+)):\s*\{([\s\S]*?)\n\t\},/g)) {
		const pageId = block[1] ?? block[2];
		slugs[pageId] = {};
		for (const row of block[3].matchAll(/\t(\w+):\s*'([^']*)',/g)) {
			slugs[pageId][row[1]] = row[2];
		}
	}
	return slugs;
}

function localePath(locale, slug) {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

function addRedirectPair(map, fromPath, toPath) {
	if (!fromPath || !toPath || fromPath === toPath) return;
	map[fromPath] = toPath;
	const noSlash = fromPath.replace(/\/$/, '');
	if (noSlash !== fromPath && noSlash !== toPath) map[noSlash] = toPath;
}

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const rel = path.relative(ROOT, file);
	if (SKIP_FILES.has(path.basename(file))) return false;
	if (rel.startsWith('public/images/')) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

const DIR_RENAMES = [
	['src/pages/warzone-cheats', 'src/pages/warzone-cheats'],
	['src/pages/best-warzone-cheats', 'src/pages/best-warzone-cheats'],
	['src/pages/undetected-warzone-cheats', 'src/pages/undetected-warzone-cheats'],
	['src/pages/warzone-cheats-2026', 'src/pages/warzone-cheats-2026'],
];

// --- Parse routing before migration ---
const routingBefore = await readFile(ROUTING, 'utf8');
const englishBefore = parseEnglishPaths(routingBefore);
const slugsBefore = parseLocalizedSlugs(routingBefore);

// --- Apply text replacements across repo ---
let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	const original = await readFile(file, 'utf8');
	const updated = applySlugReplacements(original);
	if (updated !== original) {
		await writeFile(file, updated, 'utf8');
		changed++;
	}
}

// Fix duplicate check in routing.ts
let routing = await readFile(ROUTING, 'utf8');
routing = routing.replace(
	"if (withSlash === '/warzone-cheats/' || withSlash === '/warzone-cheats/')",
	"if (withSlash === '/warzone-cheats/' || withSlash === '/warzone-cheats/')",
);
await writeFile(ROUTING, routing, 'utf8');

// --- Rename page directories ---
for (const [fromRel, toRel] of DIR_RENAMES) {
	const from = path.join(ROOT, fromRel);
	const to = path.join(ROOT, toRel);
	try {
		await access(from);
		await rename(from, to);
		console.log(`renamed ${fromRel} → ${toRel}`);
	} catch {
		// already migrated
	}
}

// --- Build redirects from slug diff ---
const routingAfter = await readFile(ROUTING, 'utf8');
const englishAfter = parseEnglishPaths(routingAfter);
const slugsAfter = parseLocalizedSlugs(routingAfter);

const existingRedirects = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const newRedirects = { ...existingRedirects };

for (const [pageId, oldPath] of Object.entries(englishBefore)) {
	const newPath = englishAfter[pageId];
	if (oldPath && newPath && oldPath !== newPath) {
		addRedirectPair(newRedirects, oldPath.replace(/\/$/, ''), newPath);
		addRedirectPair(newRedirects, oldPath, newPath);
	}
}

for (const [pageId, localeMap] of Object.entries(slugsBefore)) {
	const afterMap = slugsAfter[pageId] ?? {};
	for (const [locale, oldSlug] of Object.entries(localeMap)) {
		const newSlug = afterMap[locale];
		if (oldSlug === newSlug) continue;
		const from = localePath(locale, oldSlug);
		const to = localePath(locale, newSlug);
		addRedirectPair(newRedirects, from, to);
	}
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(newRedirects, null, 2)}\n`);

console.log(`\nmigrate-cheats-urls-to-hacks: ${changed} file(s) updated`);
console.log(
	`Added/updated ${Object.keys(newRedirects).length - Object.keys(existingRedirects).length} redirect entries in path-redirects.json`,
);
