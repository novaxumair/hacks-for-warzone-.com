const localeModules = import.meta.glob('../../public/locales/*/translation.json', { eager: true });

type TranslationCatalog = Record<string, unknown>;

const catalogs: Record<string, TranslationCatalog> = {};
for (const [path, mod] of Object.entries(localeModules)) {
	const match = path.match(/locales\/([^/]+)\/translation\.json$/);
	if (match) {
		catalogs[match[1]] = (mod as { default: TranslationCatalog }).default;
	}
}

function lookup(obj: unknown, path: string): string | undefined {
	const parts = path.split('.');
	let cur: unknown = obj;
	for (const part of parts) {
		if (!cur || typeof cur !== 'object') return undefined;
		cur = (cur as Record<string, unknown>)[part];
	}
	return typeof cur === 'string' ? cur : undefined;
}

/** Sync translator for Astro frontmatter (SSR). React islands use useTranslation(). */
export function getT(locale: string) {
	const catalog = catalogs[locale] ?? catalogs.en;
	return (key: string, vars?: Record<string, string | number>) => {
		let value = lookup(catalog, key) ?? lookup(catalogs.en, key) ?? key;
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				value = value.replaceAll(`{{${k}}}`, String(v));
			}
		}
		return value;
	};
}
