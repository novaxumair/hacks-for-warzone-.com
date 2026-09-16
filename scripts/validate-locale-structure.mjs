#!/usr/bin/env node
/** Validate structural parity between EN and all localized pages. */
import { LOCALES } from './i18n-data/constants.mjs';
import { getCanonicalEnPages } from './i18n-data/canonical-en-pages.mjs';
import { buildLocalizedPages, validateStructure } from './i18n-data/localize-pages.mjs';

const canonical = getCanonicalEnPages();
let failed = 0;

for (const locale of LOCALES) {
	if (locale === 'en') continue;
	const pages = buildLocalizedPages(locale);
	const errors = validateStructure(locale, pages);
	if (errors.length) {
		console.error(`FAIL ${locale}:`, errors.slice(0, 3).join('; '));
		failed++;
	} else {
		// Spot-check key pages section counts
		for (const key of ['features', 'pricing', 'hacks', 'warzone-esp', 'faq', 'home']) {
			const en = key === 'home' ? pages.home : canonical[key];
			const loc = pages[key];
			if (en.sections.length !== loc.sections.length) {
				console.error(`FAIL ${locale}/${key}: sections ${loc.sections.length} vs EN ${en.sections.length}`);
				failed++;
			}
		}
		console.log(`OK ${locale}`);
	}
}

if (failed) {
	console.error(`\n${failed} locale(s) failed structure validation`);
	process.exit(1);
}
console.log(`\nAll ${LOCALES.length - 1} non-EN locales pass structure validation.`);
