#!/usr/bin/env node
/**
 * Syncs public SEO files from src/data/brand.ts (single source of truth).
 * Run: npm run sync:brand  (also runs before build)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readBrand() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const str = (key) => {
		const m = src.match(new RegExp(`${key}:\\s*'([^']*)'`));
		if (!m) throw new Error(`brand.ts missing string field: ${key}`);
		return m[1];
	};
	const optionalStr = (key, fallback = '') => {
		const m = src.match(new RegExp(`${key}:\\s*'([^']*)'`));
		return m ? m[1] : fallback;
	};
	const themeBlock = src.match(/theme:\s*\{([\s\S]*?)\n\t\},/);
	const themeField = (key, fallback) => {
		if (!themeBlock) return fallback;
		const m = themeBlock[1].match(new RegExp(`${key}:\\s*'([^']*)'`));
		return m ? m[1] : fallback;
	};
	const name = str('name');
	const url = str('url').replace(/\/$/, '');
	if (/warzonecheats\.org/i.test(url)) {
		throw new Error(
			`brand.ts url is ${url} — must be https://cheatsforwarzone.com. Run: node scripts/rebrand-warzone-cheats.mjs`,
		);
	}
	return {
		name,
		shortName: optionalStr('shortName', name),
		url,
		supportEmail: str('supportEmail'),
		game: str('game'),
		antiCheat: str('antiCheat'),
		primary: (() => {
			const m = src.match(/primary:\s*'([^']*)'/);
			if (!m) throw new Error('brand.ts missing keywords.primary');
			return m[1];
		})(),
		themeBg: themeField('bg', '#08090a'),
		themeAccent: themeField('accent', '#c026d3'),
	};
}

const brand = readBrand();
const description = `Undetected ${brand.primary} — ESP, aimbot, and radar for PC`;

writeFileSync(
	path.join(ROOT, 'public/robots.txt'),
	`User-agent: *
Allow: /
Allow: /images/
Disallow: /brand-studio/
Disallow: /brand-studio
Disallow: /__brand/
Disallow: /__brand

# Primary sitemap for Google Search Console — index covers EN, locale, and image sitemaps.
Sitemap: ${brand.url}/sitemap.xml
`,
	'utf8',
);

writeFileSync(
	path.join(ROOT, 'public/site.webmanifest'),
	`${JSON.stringify(
		{
			name: brand.name,
			short_name: brand.shortName || brand.name,
			description,
			start_url: '/',
			display: 'standalone',
			background_color: brand.themeBg,
			theme_color: brand.themeBg,
			icons: [
				{ src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
				{ src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
				{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			],
		},
		null,
		2,
	)}\n`,
	'utf8',
);

const astroPath = path.join(ROOT, 'astro.config.mjs');
let astro = readFileSync(astroPath, 'utf8');
const nextAstro = astro.replace(/site:\s*'[^']*'/, `site: '${brand.url}'`);
if (nextAstro === astro && !astro.includes(`site: '${brand.url}'`)) {
	throw new Error('Could not update site URL in astro.config.mjs');
}
writeFileSync(astroPath, nextAstro, 'utf8');

const canonicalHost = new URL(brand.url).hostname;
const wwwHost = `www.${canonicalHost}`;

function syncCanonicalConstant(filePath, pattern, replacement) {
	let text = readFileSync(filePath, 'utf8');
	const next = text.replace(pattern, replacement);
	if (next === text && !text.includes(replacement.trim().slice(0, 30))) {
		throw new Error(`Could not update canonical constants in ${path.relative(ROOT, filePath)}`);
	}
	writeFileSync(filePath, next, 'utf8');
}

syncCanonicalConstant(
	path.join(ROOT, 'src/lib/canonical-origin.ts'),
	/export const CANONICAL_ORIGIN = '[^']*';/,
	`export const CANONICAL_ORIGIN = '${brand.url}';`,
);
syncCanonicalConstant(
	path.join(ROOT, 'src/lib/canonical-origin.ts'),
	/export const CANONICAL_HOST = '[^']*';/,
	`export const CANONICAL_HOST = '${canonicalHost}';`,
);

const middlewarePath = path.join(ROOT, 'functions/_middleware.js');
syncCanonicalConstant(middlewarePath, /const CANONICAL_ORIGIN = '[^']*';/, `const CANONICAL_ORIGIN = '${brand.url}';`);
syncCanonicalConstant(middlewarePath, /const CANONICAL_HOST = '[^']*';/, `const CANONICAL_HOST = '${canonicalHost}';`);
syncCanonicalConstant(middlewarePath, /const WWW_HOST = '[^']*';/, `const WWW_HOST = '${wwwHost}';`);

console.log(
	`sync-brand: ${brand.name} → ${brand.url} (robots, Astro site, canonical host ${canonicalHost})`,
);
