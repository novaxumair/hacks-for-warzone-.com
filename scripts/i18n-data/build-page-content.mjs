/**
 * Complete builder for simple-page-content.mjs — merges EN source + all locale overrides.
 */
import { writeFileSync } from 'node:fs';
import { simplePagesEn } from './simple-pages-en.mjs';
import { TRANSLATIONS } from './simple-page-content-translations.mjs';
import { REST_TRANSLATIONS } from './simple-page-content-translations-rest.mjs';

const LOCALES = ['en','es','fr','de','pt','it','nl','pl','ru','tr','ar','ja','ko','zh','hi','id','th','vi','uk','cs','ro','sv'];
const NON_EN = LOCALES.filter((l) => l !== 'en');

function block(en, trans = {}) {
	const o = { en };
	for (const loc of NON_EN) o[loc] = trans[loc] ?? en;
	return o;
}

function intro(enStr, trans = {}) {
	const b = { en: [enStr] };
	for (const loc of NON_EN) b[loc] = [trans[loc] ?? enStr];
	return b;
}

function addPage(PAGE, pageId, spec) {
	PAGE[pageId] = {};
	const pg = simplePagesEn[pageId];
	if (spec.intro) PAGE[pageId].intro = intro(pg.intro, spec.intro);
	for (const [key, val] of Object.entries(spec.sections ?? {})) {
		if (key.startsWith('list')) {
			PAGE[pageId][key] = val;
		} else {
			PAGE[pageId][key] = block(pg.sections[Number(key)].paragraphs, val);
		}
	}
}

const PAGE_CONTENT = {};
const ALL = { ...TRANSLATIONS, ...REST_TRANSLATIONS };

for (const [pageId, spec] of Object.entries(ALL)) {
	addPage(PAGE_CONTENT, pageId, spec);
}

const out = `/**
 * Native paragraph and list translations for simple pages (22 locales).
 * Canonical EN meaning from simple-pages-en.mjs.
 */
export const PAGE_CONTENT = ${JSON.stringify(PAGE_CONTENT, null, '\t')};
`;

writeFileSync(new URL('./simple-page-content.mjs', import.meta.url), out);

// Validate import
const { PAGE_CONTENT: PC } = await import('./simple-page-content.mjs');
const pages = Object.keys(PC);
const locales = LOCALES;
let ok = true;
for (const page of pages) {
	for (const section of Object.keys(PC[page])) {
		for (const loc of locales) {
			if (!PC[page][section][loc]) {
				console.error('MISSING', page, section, loc);
				ok = false;
			}
		}
	}
}
console.log(ok ? `OK: ${pages.length} pages, all ${locales.length} locales` : 'VALIDATION FAILED');
