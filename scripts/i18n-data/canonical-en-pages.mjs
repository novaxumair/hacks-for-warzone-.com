import { englishPagesFinal } from './pages-en.mjs';
import { simplePagesEn } from './simple-pages-en.mjs';

/** Merge rich EN pages with simple-page overrides — matches what EN users see at runtime. */
export function getCanonicalEnPages() {
	const pages = { ...englishPagesFinal };
	for (const [pageId, override] of Object.entries(simplePagesEn)) {
		const base = pages[pageId] ?? {};
		pages[pageId] = {
			...base,
			...override,
			heroImage: base.heroImage,
			imageAlt: override.imageAlt ?? base.imageAlt,
		};
	}
	return pages;
}
