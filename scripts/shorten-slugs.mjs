#!/usr/bin/env node
/**
 * Shorten englishPaths + localizedSlugs in routing.ts, rename page dirs, sync redirects.
 * Run: node scripts/shorten-slugs.mjs && node scripts/sync-cannibal-redirects.mjs
 */
import { readFile, writeFile, rename, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');
const MIDDLEWARE = path.join(ROOT, 'functions/_middleware.js');

const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr', 'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

/** Short english path segments (no leading/trailing slash). */
const SHORT_EN = {
	home: '',
	'warzone-esp': 'esp',
	'warzone-aimbot': 'aimbot',
	features: 'features',
	pricing: 'pricing',
	setup: 'setup',
	updates: 'updates',
	faq: 'faq',
	support: 'support',
	undetected: 'undetected',
	wallhack: 'wallhack',
	radar: 'radar',
	ricochet: 'ricochet',
	'cheats-2026': '2026',
	hacks: 'cheats',
	'cheat-download': 'download',
	'mod-menu': 'mod',
	'soft-aim': 'soft-aim',
	'best-cheats': 'best',
	'aimbot-hack': 'aimbot-hack',
	'esp-hack': 'esp-hack',
	'unlock-all': 'unlock',
	privacy: 'privacy',
	refund: 'refund',
	terms: 'terms',
};

/** Per-locale short slugs (same keys as SHORT_EN). */
const SHORT_LOCALIZED = {
	en: { ...SHORT_EN },
	es: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funciones', pricing: 'precios', setup: 'instalacion',
		updates: 'actualizaciones', faq: 'faq', support: 'soporte', undetected: 'indetectables', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'trucos', 'cheat-download': 'descarga', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'mejores', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'privacidad', refund: 'reembolso', terms: 'terminos',
	},
	fr: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'fonctions', pricing: 'prix', setup: 'installation',
		updates: 'maj', faq: 'faq', support: 'support', undetected: 'indetectable', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'triche', 'cheat-download': 'telechargement', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'meilleurs', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'confidentialite', refund: 'remboursement', terms: 'conditions',
	},
	de: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funktionen', pricing: 'preise', setup: 'installation',
		updates: 'updates', faq: 'faq', support: 'support', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'cheats', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'beste', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'datenschutz', refund: 'rueckerstattung', terms: 'nutzung',
	},
	pt: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'recursos', pricing: 'precos', setup: 'instalacao',
		updates: 'atualizacoes', faq: 'faq', support: 'suporte', undetected: 'indetectaveis', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'hacks', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'melhores', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'privacidade', refund: 'reembolso', terms: 'termos',
	},
	it: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funzioni', pricing: 'prezzi', setup: 'installazione',
		updates: 'aggiornamenti', faq: 'faq', support: 'supporto', undetected: 'indetectabili', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'trucchi', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'migliori', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'privacy', refund: 'rimborso', terms: 'termini',
	},
	nl: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'functies', pricing: 'prijzen', setup: 'installatie',
		updates: 'updates', faq: 'faq', support: 'support', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'cheats', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'beste', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'privacy', refund: 'terugbetaling', terms: 'voorwaarden',
	},
	pl: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funkcje', pricing: 'ceny', setup: 'instalacja',
		updates: 'aktualizacje', faq: 'faq', support: 'wsparcie', undetected: 'niewykrywalne', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'hacks', 'cheat-download': 'pobieranie', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'najlepsze', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'prywatnosc', refund: 'zwroty', terms: 'regulamin',
	},
	ru: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funkcii', pricing: 'ceny', setup: 'ustanovka',
		updates: 'obnovleniya', faq: 'faq', support: 'podderzhka', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'chity', 'cheat-download': 'skachat', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'luchshie', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'konfidencialnost', refund: 'vozvrat', terms: 'usloviya',
	},
	tr: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'ozellikler', pricing: 'fiyatlar', setup: 'kurulum',
		updates: 'guncellemeler', faq: 'sss', support: 'destek', undetected: 'tespit-edilemez', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'hile', 'cheat-download': 'indir', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'en-iyi', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'gizlilik', refund: 'iade', terms: 'kosullar',
	},
	ar: { ...SHORT_EN },
	ja: { ...SHORT_EN },
	ko: { ...SHORT_EN },
	zh: { ...SHORT_EN },
	hi: { ...SHORT_EN },
	id: { ...SHORT_EN },
	th: { ...SHORT_EN },
	vi: { ...SHORT_EN },
	uk: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funktsiyi', pricing: 'tsiny', setup: 'vstanovka',
		updates: 'onovlennya', faq: 'faq', support: 'pidtrymka', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'chity', 'cheat-download': 'zavantazhennya', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'naykrashchi', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'konfidentsijnist', refund: 'povorennya', terms: 'umovy',
	},
	cs: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funkce', pricing: 'ceny', setup: 'instalace',
		updates: 'aktualizace', faq: 'faq', support: 'podpora', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'cheats', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'nejlepsi', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'soukromi', refund: 'refund', terms: 'podminky',
	},
	ro: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'functii', pricing: 'preturi', setup: 'instalare',
		updates: 'actualizari', faq: 'faq', support: 'suport', undetected: 'nedetectabile', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'cheats', 'cheat-download': 'descarcare', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'cele-mai-bune', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'confidentialitate', refund: 'rambursare', terms: 'termeni',
	},
	sv: {
		home: '', 'warzone-esp': 'esp', 'warzone-aimbot': 'aimbot', features: 'funktioner', pricing: 'priser', setup: 'installation',
		updates: 'uppdateringar', faq: 'faq', support: 'support', undetected: 'undetected', wallhack: 'wallhack', radar: 'radar',
		ricochet: 'ricochet', 'cheats-2026': '2026', hacks: 'cheats', 'cheat-download': 'download', 'mod-menu': 'mod',
		'soft-aim': 'soft-aim', 'best-cheats': 'basta', 'aimbot-hack': 'aimbot-hack', 'esp-hack': 'esp-hack', 'unlock-all': 'unlock',
		privacy: 'integritet', refund: 'aterbetalning', terms: 'villkor',
	},
};

const DIR_RENAMES = [
	['src/pages/warzone-esp', 'src/pages/esp'],
	['src/pages/warzone-aimbot', 'src/pages/aimbot'],
	['src/pages/undetected-warzone-cheats', 'src/pages/undetected'],
	['src/pages/warzone-wallhack', 'src/pages/wallhack'],
	['src/pages/warzone-radar-hack', 'src/pages/radar'],
	['src/pages/ricochet-bypass', 'src/pages/ricochet'],
	['src/pages/warzone-cheats-2026', 'src/pages/2026'],
	['src/pages/warzone-cheats', 'src/pages/cheats'],
	['src/pages/warzone-cheat-download', 'src/pages/download'],
	['src/pages/warzone-mod-menu', 'src/pages/mod'],
	['src/pages/warzone-soft-aim', 'src/pages/soft-aim'],
	['src/pages/best-warzone-cheats', 'src/pages/best'],
	['src/pages/warzone-aimbot-hack', 'src/pages/aimbot-hack'],
	['src/pages/warzone-esp-hack', 'src/pages/esp-hack'],
	['src/pages/warzone-unlock-all', 'src/pages/unlock'],
	['src/pages/privacy-policy', 'src/pages/privacy'],
	['src/pages/refund-policy', 'src/pages/refund'],
];

function parseEnglishPaths(src) {
	const block = src.match(/export const englishPaths[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
	if (!block) throw new Error('englishPaths block not found');
	const paths = {};
	for (const row of block[1].matchAll(/\t(?:'([^']+)'|(\w+)):\s*'([^']*)',/g)) {
		paths[row[1] ?? row[2]] = row[3];
	}
	return paths;
}

function parseLocalizedSlugs(src) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
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

function englishPathFromSegment(segment) {
	if (!segment) return '/';
	return `/${segment}/`;
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

function buildEnglishPathsBlock() {
	const lines = ['export const englishPaths: Record<PageId, string> = {'];
	for (const [pageId, segment] of Object.entries(SHORT_EN)) {
		const key = pageId.includes('-') ? `'${pageId}'` : pageId;
		lines.push(`\t${key}: '${englishPathFromSegment(segment)}',`);
	}
	lines.push('};');
	return lines.join('\n');
}

function buildLocalizedSlugsBlock() {
	const pageIds = Object.keys(SHORT_EN);
	const lines = ['export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {'];
	for (const pageId of pageIds) {
		const key = pageId.includes('-') ? `'${pageId}'` : pageId;
		lines.push(`\t${key}: {`);
		for (const locale of LOCALES) {
			const slug = SHORT_LOCALIZED[locale][pageId] ?? SHORT_EN[pageId];
			lines.push(`\t\t${locale}: '${slug}',`);
		}
		lines.push('\t},');
	}
	lines.push('};');
	return lines.join('\n');
}

function replaceBlock(src, startMarker, newBlock) {
	const start = src.indexOf(startMarker);
	if (start === -1) throw new Error(`Block ${startMarker} not found`);
	const open = src.indexOf('{', start);
	let depth = 0;
	let end = -1;
	for (let i = open; i < src.length; i++) {
		if (src[i] === '{') depth++;
		else if (src[i] === '}') {
			depth--;
			if (depth === 0) {
				end = i + 1;
				break;
			}
		}
	}
	if (end === -1) throw new Error(`Block ${startMarker} not closed`);
	return src.slice(0, start) + newBlock + src.slice(end);
}

// --- Parse before ---
const routingBefore = await readFile(ROUTING, 'utf8');
const englishBefore = parseEnglishPaths(routingBefore);
const slugsBefore = parseLocalizedSlugs(routingBefore);

// --- Rewrite routing.ts ---
let routing = routingBefore;
routing = replaceBlock(routing, 'export const englishPaths', buildEnglishPathsBlock() + '\n');
routing = replaceBlock(routing, 'export const localizedSlugs', buildLocalizedSlugsBlock() + '\n');
routing = routing.replace(
	"if (withSlash === '/warzone-cheats/' || withSlash === '/warzone-cheats/')",
	"if (withSlash === '/cheats/' || withSlash === '/warzone-cheats/')",
);
await writeFile(ROUTING, routing, 'utf8');
console.log('Updated routing.ts with short slugs');

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

// --- Build redirects ---
const englishAfter = parseEnglishPaths(routing);
const slugsAfter = parseLocalizedSlugs(routing);
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
		addRedirectPair(newRedirects, localePath(locale, oldSlug), localePath(locale, newSlug));
	}
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(newRedirects, null, 2)}\n`);
console.log(`Updated path-redirects.json (${Object.keys(newRedirects).length} entries)`);

// --- Update middleware PATH_REDIRECTS for cannibal pages (short paths) ---
let middleware = await readFile(MIDDLEWARE, 'utf8');
const middlewareUpdates = [
	["'/warzone-soft-aim'", "'/soft-aim'"],
	["'/warzone-soft-aim/'", "'/soft-aim/'"],
	["'/warzone-wallhack'", "'/wallhack'"],
	["'/warzone-wallhack/'", "'/wallhack/'"],
	["'/warzone-cheat-download'", "'/download'"],
	["'/warzone-cheat-download/'", "'/download/'"],
	["'/warzone-mod-menu'", "'/mod'"],
	["'/warzone-mod-menu/'", "'/mod/'"],
	["'/warzone-unlock-all'", "'/unlock'"],
	["'/warzone-unlock-all/'", "'/unlock/'"],
	["'/warzone-esp-hack'", "'/esp-hack'"],
	["'/warzone-esp-hack/'", "'/esp-hack/'"],
	["'/warzone-aimbot-hack'", "'/aimbot-hack'"],
	["'/warzone-aimbot-hack/'", "'/aimbot-hack/'"],
	["'/warzone-hacks'", "'/cheats'"],
	["'/warzone-hacks/'", "'/cheats/'"],
	["'/warzone-esp'", "'/esp'"],
	["'/warzone-esp/'", "'/esp/'"],
	["'/warzone-aimbot'", "'/aimbot'"],
	["'/warzone-aimbot/'", "'/aimbot/'"],
	["'/ricochet-bypass'", "'/ricochet'"],
	["'/ricochet-bypass/'", "'/ricochet/'"],
];
for (const [from, to] of middlewareUpdates) {
	middleware = middleware.replace(from, to);
}
// Cannibal targets use new short paths
middleware = middleware.replace("'/warzone-soft-aim/'", "'/aimbot/'");
middleware = middleware.replace("'/soft-aim/'", "'/aimbot/'");
middleware = middleware.replace("'/warzone-wallhack/'", "'/esp/'");
middleware = middleware.replace("'/wallhack/'", "'/esp/'");
middleware = middleware.replace("'/warzone-cheat-download/'", "'/setup/'");
middleware = middleware.replace("'/download/'", "'/setup/'");
middleware = middleware.replace("'/warzone-mod-menu/'", "'/'");
middleware = middleware.replace("'/mod/'", "'/'");
middleware = middleware.replace("'/warzone-unlock-all/'", "'/'");
middleware = middleware.replace("'/unlock/'", "'/'");
middleware = middleware.replace("'/warzone-esp-hack/'", "'/esp/'");
middleware = middleware.replace("'/esp-hack/'", "'/esp/'");
middleware = middleware.replace("'/warzone-aimbot-hack/'", "'/aimbot/'");
middleware = middleware.replace("'/aimbot-hack/'", "'/aimbot/'");
middleware = middleware.replace("'/undetected-warzone-cheats'", "'/undetected'");
middleware = middleware.replace("'/undetected-warzone-cheats/'", "'/undetected/'");
middleware = middleware.replace("'/warzone-cheats'", "'/cheats'");
middleware = middleware.replace("'/warzone-cheats/'", "'/cheats/'");
middleware = middleware.replace("'/warzone-cheats-2026'", "'/2026'");
middleware = middleware.replace("'/warzone-cheats-2026/'", "'/2026/'");
middleware = middleware.replace("'/best-warzone-cheats'", "'/best'");
middleware = middleware.replace("'/best-warzone-cheats/'", "'/best/'");
middleware = middleware.replace("'/warzone-radar-hack'", "'/radar'");
middleware = middleware.replace("'/warzone-radar-hack/'", "'/radar/'");
await writeFile(MIDDLEWARE, middleware, 'utf8');
console.log('Updated functions/_middleware.js PATH_REDIRECTS');

console.log('\nDone. Run: node scripts/sync-cannibal-redirects.mjs');
