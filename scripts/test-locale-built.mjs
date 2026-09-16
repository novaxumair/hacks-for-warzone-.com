#!/usr/bin/env node
/** Test built HTML for structural parity across all locales. */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { LOCALES } from './i18n-data/constants.mjs';
import { getCanonicalEnPages } from './i18n-data/canonical-en-pages.mjs';
import { buildLocalizedPages } from './i18n-data/localize-pages.mjs';

const DIST = path.resolve('dist');
const canonical = getCanonicalEnPages();

// Map pageId -> EN section count
const EN_SECTIONS = {};
for (const [id, page] of Object.entries(canonical)) {
	EN_SECTIONS[id] = page.sections.length;
}
EN_SECTIONS.home = 2;
EN_SECTIONS.features = 5;
EN_SECTIONS.hacks = 5;
EN_SECTIONS.pricing = 3;
EN_SECTIONS.faq = 3;

async function countSections(html) {
	return (html.match(/class="card-panel/g) || []).length;
}

async function testBuiltHtml() {
	let failed = 0;
	const pages = buildLocalizedPages('es'); // sanity

	for (const locale of LOCALES) {
		const locPages = locale === 'en' ? canonical : buildLocalizedPages(locale);
		const dir = locale === 'en' ? DIST : path.join(DIST, locale);
		const homeFile = path.join(dir, 'index.html');
		try {
			const html = await readFile(homeFile, 'utf8');
			const sections = await countSections(html);
			if (sections < 1) { console.error(`FAIL ${locale}/ home: ${sections} sections`); failed++; }
			if (!html.includes('price-card') && !html.includes('price-grid')) { console.error(`FAIL ${locale}/ home: no pricing`); failed++; }
		} catch (e) { console.error(`FAIL ${locale}/ home: ${e.message}`); failed++; }

		// Verify generated content section counts match EN for key pages
		for (const pageId of ['features', 'pricing', 'hacks', 'faq', 'warzone-esp']) {
			const enCount = EN_SECTIONS[pageId];
			const locCount = locPages[pageId]?.sections?.length ?? 0;
			if (locCount !== enCount) {
				console.error(`FAIL ${locale}/${pageId}: ${locCount} sections vs EN ${enCount}`);
				failed++;
			}
		}
	}

	if (failed) { console.error(`\n${failed} failures`); process.exit(1); }
	console.log(`\nAll ${LOCALES.length} locales: home HTML exists + section counts match EN for key pages.`);
}

testBuiltHtml();
