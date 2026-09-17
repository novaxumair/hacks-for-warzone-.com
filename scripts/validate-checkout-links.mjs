#!/usr/bin/env node
/**
 * Ensures all purchase CTAs in built HTML point at brand.checkoutUrl (checkout).
 * Run after `npm run build`: node scripts/validate-checkout-links.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function readBrandUrl(key) {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`));
	if (!m) throw new Error(`brand.ts missing ${key}`);
	return m[1].replace(/\\'/g, "'");
}

const CHECKOUT_URL = readBrandUrl('checkoutUrl');
const SUPPORT_URL = readBrandUrl('supportUrl');

/** Support tab primary CTA uses btn-buy styling but links to Discord, not checkout. */
function isAllowedPurchaseHref(href) {
	if (href === CHECKOUT_URL) return true;
	if (href === SUPPORT_URL) return true;
	if (href.startsWith('mailto:')) return true;
	return false;
}
const BUY_SELECTORS = [
	'hero__buy',
	'site-tools__buy',
	'site-panel__buy',
	'home__price-card-cta',
	'price-card',
	'post__buy',
	'review-detail__buy',
	'reviews-index__buy',
	'faq-detail__buy',
	'plan__cta',
	'product__buy',
];

/** btn-buy on product pages and banners — exclude 404 home link */
const BTN_BUY_PATTERN =
	/<a[^>]*class="[^"]*\bbtn-buy\b[^"]*"[^>]*href="([^"]+)"[^>]*>/gi;

const CTA_PATTERN = new RegExp(
	`<a[^>]*class="[^"]*(?:${BUY_SELECTORS.join('|')})[^"]*"[^>]*href="([^"]+)"`,
	'gi',
);

function walkHtmlFiles(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) walkHtmlFiles(full, files);
		else if (entry.endsWith('.html')) files.push(full);
	}
	return files;
}

function collectBuyHrefs(html, file) {
	const hrefs = [];
	let m;
	while ((m = CTA_PATTERN.exec(html))) {
		hrefs.push({ href: m[1], file, kind: 'cta' });
	}
	while ((m = BTN_BUY_PATTERN.exec(html))) {
		if (m[1] === '/' || m[1].startsWith('/#')) continue;
		hrefs.push({ href: m[1], file, kind: 'btn-buy' });
	}
	return hrefs;
}

const files = walkHtmlFiles(DIST);
const bad = [];

for (const file of files) {
	const html = readFileSync(file, 'utf8');
	for (const { href } of collectBuyHrefs(html, file)) {
		if (!isAllowedPurchaseHref(href)) {
			bad.push({ file: path.relative(ROOT, file), href });
		}
	}
}

if (bad.length === 0) {
	console.log(`✓ All purchase CTAs point to ${CHECKOUT_URL}`);
	console.log(`  Checked ${files.length} HTML files`);
	process.exit(0);
}

console.error('Purchase CTA checkout URL mismatches:\n');
for (const { file, href } of bad.slice(0, 30)) {
	console.error(`  ${file}\n    href="${href}"\n    expected="${CHECKOUT_URL}"`);
}
if (bad.length > 30) console.error(`  …and ${bad.length - 30} more`);
process.exit(1);
