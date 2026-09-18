import { siteConfig } from '../site';
import {
	defaultLocale,
	isLocaleCode,
	localeCodes,
	localeMap,
	type LocaleCode,
	locales,
} from './locales';
import { getCannibalTargetId, isCannibalPageId } from '../seo-cannibal-map';
import { forumThreads as rawForumThreads } from '../forums/threads.generated';

const forumThreadSlugs = new Set(rawForumThreads.map((thread) => thread.translations.en.slug));

export function isForumThreadSlug(slug: string): boolean {
	return forumThreadSlugs.has(slug);
}

/** @deprecated Legacy blog slug check — forums only */
export function isBlogPostSlug(slug: string): boolean {
	return isForumThreadSlug(slug);
}

/** Canonical page identifiers shared across all locales. */
export type PageId =
	| 'home'
	| 'warzone-esp'
	| 'warzone-aimbot'
	| 'features'
	| 'pricing'
	| 'setup'
	| 'updates'
	| 'faq'
	| 'support'
	| 'undetected'
	| 'wallhack'
	| 'radar'
	| 'ricochet'
	| 'cheats-2026'
	| 'hacks'
	| 'cheat-download'
	| 'mod-menu'
	| 'soft-aim'
	| 'best-cheats'
	| 'aimbot-hack'
	| 'esp-hack'
	| 'unlock-all'
	| 'privacy'
	| 'refund'
	| 'terms';

/** English (official) paths — served at site root without /en/ prefix. */
export const englishPaths: Record<PageId, string> = {
	home: '/',
	'warzone-esp': '/esp/',
	'warzone-aimbot': '/aimbot/',
	features: '/features/',
	pricing: '/pricing/',
	setup: '/setup/',
	updates: '/updates/',
	faq: '/faq/',
	support: '/support/',
	undetected: '/undetected/',
	wallhack: '/wallhack/',
	radar: '/radar/',
	ricochet: '/ricochet/',
	'cheats-2026': '/2026/',
	hacks: '/cheats/',
	'cheat-download': '/download/',
	'mod-menu': '/mod/',
	'soft-aim': '/soft-aim/',
	'best-cheats': '/best/',
	'aimbot-hack': '/aimbot-hack/',
	'esp-hack': '/esp-hack/',
	'unlock-all': '/unlock/',
	privacy: '/privacy/',
	refund: '/refund/',
	terms: '/terms/',
};

/**
 * Localized URL slugs (path after /{lang}/).
 * English uses englishPaths at root; other locales use these slugs under /{lang}/.
 */
export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {
	home: {
		en: '',
		es: '',
		fr: '',
		de: '',
		pt: '',
		it: '',
		nl: '',
		pl: '',
		ru: '',
		tr: '',
		ar: '',
		ja: '',
		ko: '',
		zh: '',
		hi: '',
		id: '',
		th: '',
		vi: '',
		uk: '',
		cs: '',
		ro: '',
		sv: '',
	},
	'warzone-esp': {
		en: 'esp',
		es: 'esp',
		fr: 'esp',
		de: 'esp',
		pt: 'esp',
		it: 'esp',
		nl: 'esp',
		pl: 'esp',
		ru: 'esp',
		tr: 'esp',
		ar: 'esp',
		ja: 'esp',
		ko: 'esp',
		zh: 'esp',
		hi: 'esp',
		id: 'esp',
		th: 'esp',
		vi: 'esp',
		uk: 'esp',
		cs: 'esp',
		ro: 'esp',
		sv: 'esp',
	},
	'warzone-aimbot': {
		en: 'aimbot',
		es: 'aimbot',
		fr: 'aimbot',
		de: 'aimbot',
		pt: 'aimbot',
		it: 'aimbot',
		nl: 'aimbot',
		pl: 'aimbot',
		ru: 'aimbot',
		tr: 'aimbot',
		ar: 'aimbot',
		ja: 'aimbot',
		ko: 'aimbot',
		zh: 'aimbot',
		hi: 'aimbot',
		id: 'aimbot',
		th: 'aimbot',
		vi: 'aimbot',
		uk: 'aimbot',
		cs: 'aimbot',
		ro: 'aimbot',
		sv: 'aimbot',
	},
	features: {
		en: 'features',
		es: 'funciones',
		fr: 'fonctions',
		de: 'funktionen',
		pt: 'recursos',
		it: 'funzioni',
		nl: 'functies',
		pl: 'funkcje',
		ru: 'funkcii',
		tr: 'ozellikler',
		ar: 'features',
		ja: 'features',
		ko: 'features',
		zh: 'features',
		hi: 'features',
		id: 'features',
		th: 'features',
		vi: 'features',
		uk: 'funktsiyi',
		cs: 'funkce',
		ro: 'functii',
		sv: 'funktioner',
	},
	pricing: {
		en: 'pricing',
		es: 'precios',
		fr: 'prix',
		de: 'preise',
		pt: 'precos',
		it: 'prezzi',
		nl: 'prijzen',
		pl: 'ceny',
		ru: 'ceny',
		tr: 'fiyatlar',
		ar: 'pricing',
		ja: 'pricing',
		ko: 'pricing',
		zh: 'pricing',
		hi: 'pricing',
		id: 'pricing',
		th: 'pricing',
		vi: 'pricing',
		uk: 'tsiny',
		cs: 'ceny',
		ro: 'preturi',
		sv: 'priser',
	},
	setup: {
		en: 'setup',
		es: 'instalacion',
		fr: 'installation',
		de: 'installation',
		pt: 'instalacao',
		it: 'installazione',
		nl: 'installatie',
		pl: 'instalacja',
		ru: 'ustanovka',
		tr: 'kurulum',
		ar: 'setup',
		ja: 'setup',
		ko: 'setup',
		zh: 'setup',
		hi: 'setup',
		id: 'setup',
		th: 'setup',
		vi: 'setup',
		uk: 'vstanovka',
		cs: 'instalace',
		ro: 'instalare',
		sv: 'installation',
	},
	updates: {
		en: 'updates',
		es: 'actualizaciones',
		fr: 'maj',
		de: 'updates',
		pt: 'atualizacoes',
		it: 'aggiornamenti',
		nl: 'updates',
		pl: 'aktualizacje',
		ru: 'obnovleniya',
		tr: 'guncellemeler',
		ar: 'updates',
		ja: 'updates',
		ko: 'updates',
		zh: 'updates',
		hi: 'updates',
		id: 'updates',
		th: 'updates',
		vi: 'updates',
		uk: 'onovlennya',
		cs: 'aktualizace',
		ro: 'actualizari',
		sv: 'uppdateringar',
	},
	faq: {
		en: 'faq',
		es: 'faq',
		fr: 'faq',
		de: 'faq',
		pt: 'faq',
		it: 'faq',
		nl: 'faq',
		pl: 'faq',
		ru: 'faq',
		tr: 'sss',
		ar: 'faq',
		ja: 'faq',
		ko: 'faq',
		zh: 'faq',
		hi: 'faq',
		id: 'faq',
		th: 'faq',
		vi: 'faq',
		uk: 'faq',
		cs: 'faq',
		ro: 'faq',
		sv: 'faq',
	},
	support: {
		en: 'support',
		es: 'soporte',
		fr: 'support',
		de: 'support',
		pt: 'suporte',
		it: 'supporto',
		nl: 'support',
		pl: 'wsparcie',
		ru: 'podderzhka',
		tr: 'destek',
		ar: 'support',
		ja: 'support',
		ko: 'support',
		zh: 'support',
		hi: 'support',
		id: 'support',
		th: 'support',
		vi: 'support',
		uk: 'pidtrymka',
		cs: 'podpora',
		ro: 'suport',
		sv: 'support',
	},
	undetected: {
		en: 'undetected',
		es: 'indetectables',
		fr: 'indetectable',
		de: 'undetected',
		pt: 'indetectaveis',
		it: 'indetectabili',
		nl: 'undetected',
		pl: 'niewykrywalne',
		ru: 'undetected',
		tr: 'tespit-edilemez',
		ar: 'undetected',
		ja: 'undetected',
		ko: 'undetected',
		zh: 'undetected',
		hi: 'undetected',
		id: 'undetected',
		th: 'undetected',
		vi: 'undetected',
		uk: 'undetected',
		cs: 'undetected',
		ro: 'nedetectabile',
		sv: 'undetected',
	},
	wallhack: {
		en: 'wallhack',
		es: 'wallhack',
		fr: 'wallhack',
		de: 'wallhack',
		pt: 'wallhack',
		it: 'wallhack',
		nl: 'wallhack',
		pl: 'wallhack',
		ru: 'wallhack',
		tr: 'wallhack',
		ar: 'wallhack',
		ja: 'wallhack',
		ko: 'wallhack',
		zh: 'wallhack',
		hi: 'wallhack',
		id: 'wallhack',
		th: 'wallhack',
		vi: 'wallhack',
		uk: 'wallhack',
		cs: 'wallhack',
		ro: 'wallhack',
		sv: 'wallhack',
	},
	radar: {
		en: 'radar',
		es: 'radar',
		fr: 'radar',
		de: 'radar',
		pt: 'radar',
		it: 'radar',
		nl: 'radar',
		pl: 'radar',
		ru: 'radar',
		tr: 'radar',
		ar: 'radar',
		ja: 'radar',
		ko: 'radar',
		zh: 'radar',
		hi: 'radar',
		id: 'radar',
		th: 'radar',
		vi: 'radar',
		uk: 'radar',
		cs: 'radar',
		ro: 'radar',
		sv: 'radar',
	},
	ricochet: {
		en: 'ricochet',
		es: 'ricochet',
		fr: 'ricochet',
		de: 'ricochet',
		pt: 'ricochet',
		it: 'ricochet',
		nl: 'ricochet',
		pl: 'ricochet',
		ru: 'ricochet',
		tr: 'ricochet',
		ar: 'ricochet',
		ja: 'ricochet',
		ko: 'ricochet',
		zh: 'ricochet',
		hi: 'ricochet',
		id: 'ricochet',
		th: 'ricochet',
		vi: 'ricochet',
		uk: 'ricochet',
		cs: 'ricochet',
		ro: 'ricochet',
		sv: 'ricochet',
	},
	'cheats-2026': {
		en: '2026',
		es: '2026',
		fr: '2026',
		de: '2026',
		pt: '2026',
		it: '2026',
		nl: '2026',
		pl: '2026',
		ru: '2026',
		tr: '2026',
		ar: '2026',
		ja: '2026',
		ko: '2026',
		zh: '2026',
		hi: '2026',
		id: '2026',
		th: '2026',
		vi: '2026',
		uk: '2026',
		cs: '2026',
		ro: '2026',
		sv: '2026',
	},
	hacks: {
		en: 'cheats',
		es: 'trucos',
		fr: 'triche',
		de: 'cheats',
		pt: 'hacks',
		it: 'trucchi',
		nl: 'cheats',
		pl: 'hacks',
		ru: 'chity',
		tr: 'hile',
		ar: 'cheats',
		ja: 'cheats',
		ko: 'cheats',
		zh: 'cheats',
		hi: 'cheats',
		id: 'cheats',
		th: 'cheats',
		vi: 'cheats',
		uk: 'chity',
		cs: 'cheats',
		ro: 'cheats',
		sv: 'cheats',
	},
	'cheat-download': {
		en: 'download',
		es: 'descarga',
		fr: 'telechargement',
		de: 'download',
		pt: 'download',
		it: 'download',
		nl: 'download',
		pl: 'pobieranie',
		ru: 'skachat',
		tr: 'indir',
		ar: 'download',
		ja: 'download',
		ko: 'download',
		zh: 'download',
		hi: 'download',
		id: 'download',
		th: 'download',
		vi: 'download',
		uk: 'zavantazhennya',
		cs: 'download',
		ro: 'descarcare',
		sv: 'download',
	},
	'mod-menu': {
		en: 'mod',
		es: 'mod',
		fr: 'mod',
		de: 'mod',
		pt: 'mod',
		it: 'mod',
		nl: 'mod',
		pl: 'mod',
		ru: 'mod',
		tr: 'mod',
		ar: 'mod',
		ja: 'mod',
		ko: 'mod',
		zh: 'mod',
		hi: 'mod',
		id: 'mod',
		th: 'mod',
		vi: 'mod',
		uk: 'mod',
		cs: 'mod',
		ro: 'mod',
		sv: 'mod',
	},
	'soft-aim': {
		en: 'soft-aim',
		es: 'soft-aim',
		fr: 'soft-aim',
		de: 'soft-aim',
		pt: 'soft-aim',
		it: 'soft-aim',
		nl: 'soft-aim',
		pl: 'soft-aim',
		ru: 'soft-aim',
		tr: 'soft-aim',
		ar: 'soft-aim',
		ja: 'soft-aim',
		ko: 'soft-aim',
		zh: 'soft-aim',
		hi: 'soft-aim',
		id: 'soft-aim',
		th: 'soft-aim',
		vi: 'soft-aim',
		uk: 'soft-aim',
		cs: 'soft-aim',
		ro: 'soft-aim',
		sv: 'soft-aim',
	},
	'best-cheats': {
		en: 'best',
		es: 'mejores',
		fr: 'meilleurs',
		de: 'beste',
		pt: 'melhores',
		it: 'migliori',
		nl: 'beste',
		pl: 'najlepsze',
		ru: 'luchshie',
		tr: 'en-iyi',
		ar: 'best',
		ja: 'best',
		ko: 'best',
		zh: 'best',
		hi: 'best',
		id: 'best',
		th: 'best',
		vi: 'best',
		uk: 'naykrashchi',
		cs: 'nejlepsi',
		ro: 'cele-mai-bune',
		sv: 'basta',
	},
	'aimbot-hack': {
		en: 'aimbot-hack',
		es: 'aimbot-hack',
		fr: 'aimbot-hack',
		de: 'aimbot-hack',
		pt: 'aimbot-hack',
		it: 'aimbot-hack',
		nl: 'aimbot-hack',
		pl: 'aimbot-hack',
		ru: 'aimbot-hack',
		tr: 'aimbot-hack',
		ar: 'aimbot-hack',
		ja: 'aimbot-hack',
		ko: 'aimbot-hack',
		zh: 'aimbot-hack',
		hi: 'aimbot-hack',
		id: 'aimbot-hack',
		th: 'aimbot-hack',
		vi: 'aimbot-hack',
		uk: 'aimbot-hack',
		cs: 'aimbot-hack',
		ro: 'aimbot-hack',
		sv: 'aimbot-hack',
	},
	'esp-hack': {
		en: 'esp-hack',
		es: 'esp-hack',
		fr: 'esp-hack',
		de: 'esp-hack',
		pt: 'esp-hack',
		it: 'esp-hack',
		nl: 'esp-hack',
		pl: 'esp-hack',
		ru: 'esp-hack',
		tr: 'esp-hack',
		ar: 'esp-hack',
		ja: 'esp-hack',
		ko: 'esp-hack',
		zh: 'esp-hack',
		hi: 'esp-hack',
		id: 'esp-hack',
		th: 'esp-hack',
		vi: 'esp-hack',
		uk: 'esp-hack',
		cs: 'esp-hack',
		ro: 'esp-hack',
		sv: 'esp-hack',
	},
	'unlock-all': {
		en: 'unlock',
		es: 'unlock',
		fr: 'unlock',
		de: 'unlock',
		pt: 'unlock',
		it: 'unlock',
		nl: 'unlock',
		pl: 'unlock',
		ru: 'unlock',
		tr: 'unlock',
		ar: 'unlock',
		ja: 'unlock',
		ko: 'unlock',
		zh: 'unlock',
		hi: 'unlock',
		id: 'unlock',
		th: 'unlock',
		vi: 'unlock',
		uk: 'unlock',
		cs: 'unlock',
		ro: 'unlock',
		sv: 'unlock',
	},
	privacy: {
		en: 'privacy',
		es: 'privacidad',
		fr: 'confidentialite',
		de: 'datenschutz',
		pt: 'privacidade',
		it: 'privacy',
		nl: 'privacy',
		pl: 'prywatnosc',
		ru: 'konfidencialnost',
		tr: 'gizlilik',
		ar: 'privacy',
		ja: 'privacy',
		ko: 'privacy',
		zh: 'privacy',
		hi: 'privacy',
		id: 'privacy',
		th: 'privacy',
		vi: 'privacy',
		uk: 'konfidentsijnist',
		cs: 'soukromi',
		ro: 'confidentialitate',
		sv: 'integritet',
	},
	refund: {
		en: 'refund',
		es: 'reembolso',
		fr: 'remboursement',
		de: 'rueckerstattung',
		pt: 'reembolso',
		it: 'rimborso',
		nl: 'terugbetaling',
		pl: 'zwroty',
		ru: 'vozvrat',
		tr: 'iade',
		ar: 'refund',
		ja: 'refund',
		ko: 'refund',
		zh: 'refund',
		hi: 'refund',
		id: 'refund',
		th: 'refund',
		vi: 'refund',
		uk: 'povorennya',
		cs: 'refund',
		ro: 'rambursare',
		sv: 'aterbetalning',
	},
	terms: {
		en: 'terms',
		es: 'terminos',
		fr: 'conditions',
		de: 'nutzung',
		pt: 'termos',
		it: 'termini',
		nl: 'voorwaarden',
		pl: 'regulamin',
		ru: 'usloviya',
		tr: 'kosullar',
		ar: 'terms',
		ja: 'terms',
		ko: 'terms',
		zh: 'terms',
		hi: 'terms',
		id: 'terms',
		th: 'terms',
		vi: 'terms',
		uk: 'umovy',
		cs: 'podminky',
		ro: 'termeni',
		sv: 'villkor',
	},
};

export const pageIds = Object.keys(englishPaths) as PageId[];

export function getLocalizedPath(pageId: PageId, locale: LocaleCode): string {
	if (locale === defaultLocale) {
		return englishPaths[pageId];
	}
	const slug = localizedSlugs[pageId][locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Map English root paths to the correct locale URL (for CTAs and inline links). */
export function localizeInternalHref(href: string, locale: LocaleCode): string {
	if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
		return href;
	}
	const trimmed = href.replace(/\/+$/, '') || '/';
	const withSlash = trimmed === '/' ? '/' : `${trimmed}/`;
	if (withSlash === '/cheats/' || withSlash === '/warzone-cheats/') {
		return getLocalizedPath('hacks', locale);
	}
	if (withSlash === '/forums/') {
		return locale === defaultLocale ? '/forums/' : `/${locale}/forums/`;
	}
	if (withSlash.startsWith('/forums/') && locale !== defaultLocale) {
		return `/${locale}${withSlash}`;
	}
	if (withSlash.startsWith('/blog/') && withSlash !== '/blog/') {
		const legacySlug = withSlash.slice('/blog/'.length, -1);
		if (isBlogPostSlug(legacySlug)) {
			return locale === defaultLocale ? `/${legacySlug}/` : `/${locale}/${legacySlug}/`;
		}
	}
	const rootSlug = trimmed.replace(/^\//, '');
	if (rootSlug && isBlogPostSlug(rootSlug)) {
		return locale === defaultLocale ? `/${rootSlug}/` : `/${locale}/${rootSlug}/`;
	}
	for (const pageId of pageIds) {
		const english = englishPaths[pageId];
		if (english === withSlash || english.replace(/\/+$/, '') === trimmed) {
			const targetId = getCannibalTargetId(pageId) as PageId;
			return getLocalizedPath(targetId, locale);
		}
	}
	return href;
}

/** Canonical absolute URL — always https apex with trailing slash (matches Layout.astro). */
export function buildCanonicalUrl(path: string): string {
	const normalized =
		!path || path === '/'
			? '/'
			: path.endsWith('/') || path.includes('.')
				? path
				: `${path}/`;
	return new URL(normalized, siteConfig.url).href;
}

export function absoluteLocalizedUrl(pageId: PageId, locale: LocaleCode): string {
	return buildCanonicalUrl(getLocalizedPath(pageId, locale));
}

export type HreflangAlternate = { hreflang: string; href: string };

/** Self-referential hreflang for single-locale pages (reviews, 404). */
export function getSelfHreflangAlternates(
	path: string,
	locale: LocaleCode = defaultLocale,
): HreflangAlternate[] {
	const href = buildCanonicalUrl(path);
	return [
		{ hreflang: localeMap[locale].hreflang, href },
		{ hreflang: 'x-default', href },
	];
}

export function getHreflangAlternates(pageId: PageId, currentLocale: LocaleCode = defaultLocale) {
	const resolvedId = (isCannibalPageId(pageId) ? getCannibalTargetId(pageId) : pageId) as PageId;
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteLocalizedUrl(resolvedId, code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	const xDefault = {
		hreflang: 'x-default' as const,
		href: absoluteLocalizedUrl(resolvedId, defaultLocale),
	};
	// Self-referential hreflang first — required by Google/Seobility for the active locale.
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		xDefault,
	];
}

export function resolvePageIdFromPath(path: string): PageId | undefined {
	const normalized = path.endsWith('/') ? path : `${path}/`;
	for (const id of pageIds) {
		if (englishPaths[id] === normalized) return id;
	}
	return undefined;
}

/** Parsed locale + page from any site URL (English root or /{lang}/…). */
export type PageContext = {
	locale: LocaleCode;
	pageId?: PageId;
	isForumIndex?: boolean;
	forumSlug?: string;
	isBlogIndex?: boolean;
	blogSlug?: string;
	isReviewsIndex?: boolean;
	reviewSlug?: string;
	isFaqIndex?: boolean;
	faqSlug?: string;
};

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	if (pathname.includes('.') || pathname.endsWith('/')) return pathname;
	return `${pathname}/`;
}

/** Resolve locale and page/blog context from the current URL path. */
export function resolvePageContextFromPath(pathname: string): PageContext {
	const path = normalizePathname(pathname);

	if (path === '/') {
		return { locale: defaultLocale, pageId: 'home' };
	}

	const segments = path.split('/').filter(Boolean);
	let locale: LocaleCode = defaultLocale;
	let offset = 0;

	if (segments.length > 0 && isLocaleCode(segments[0]) && segments[0] !== defaultLocale) {
		locale = segments[0];
		offset = 1;
	}

	const rest = segments.slice(offset);

	if (rest.length === 0) {
		return { locale, pageId: 'home' };
	}

	if (rest[0] === 'forums') {
		if (rest.length === 1) {
			return { locale, isForumIndex: true };
		}
		return { locale, forumSlug: rest[1] };
	}

	if (rest[0] === 'blog') {
		if (rest.length === 1) {
			return { locale, isForumIndex: true, isBlogIndex: true };
		}
		return { locale, forumSlug: rest[1], blogSlug: rest[1] };
	}

	if (rest[0] === 'reviews') {
		if (rest.length === 1) {
			return { locale, isReviewsIndex: true };
		}
		return { locale, reviewSlug: rest[1] };
	}

	if (rest[0] === 'faq') {
		if (rest.length === 1) {
			return { locale, isFaqIndex: true };
		}
		return { locale, faqSlug: rest[1] };
	}

	if (rest[0] === 'guides') {
		return { locale, isForumIndex: true };
	}

	if (rest.length === 1 && isForumThreadSlug(rest[0])) {
		return { locale, forumSlug: rest[0], blogSlug: rest[0] };
	}

	if (locale === defaultLocale) {
		return { locale, pageId: resolvePageIdFromPath(path) };
	}

	return { locale, pageId: resolvePageFromLocalizedPath(locale, rest[0]) };
}

/** Target URL for the same page in another locale (non-blog pages). */
export function getPageLocaleSwitchHref(context: PageContext, targetLocale: LocaleCode): string {
	if (context.isReviewsIndex) {
		return targetLocale === defaultLocale ? '/reviews/' : `/${targetLocale}/reviews/`;
	}
	if (context.reviewSlug) {
		return targetLocale === defaultLocale
			? `/reviews/${context.reviewSlug}/`
			: `/${targetLocale}/reviews/${context.reviewSlug}/`;
	}
	if (context.isFaqIndex) {
		return getLocalizedPath('faq', targetLocale);
	}
	if (context.faqSlug) {
		return targetLocale === defaultLocale
			? `/faq/${context.faqSlug}/`
			: `/${targetLocale}/faq/${context.faqSlug}/`;
	}
	if (context.isForumIndex) {
		return targetLocale === defaultLocale ? '/forums/' : `/${targetLocale}/forums/`;
	}
	if (context.forumSlug) {
		return targetLocale === defaultLocale
			? `/forums/${context.forumSlug}/`
			: `/${targetLocale}/forums/${context.forumSlug}/`;
	}
	if (context.pageId) {
		return getLocalizedPath(context.pageId, targetLocale);
	}
	return getLocalizedPath('home', targetLocale);
}

export function hreflangLinksXml(pageId: PageId, escapeXml: (v: string) => string): string {
	return getHreflangAlternates(pageId)
		.map(
			(alt) =>
				`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
		)
		.join('\n');
}

export function resolvePageFromLocalizedPath(
	locale: LocaleCode,
	slug: string | undefined,
): PageId | undefined {
	if (!slug) return 'home';
	for (const pageId of pageIds) {
		if (localizedSlugs[pageId][locale] === slug) return pageId;
	}
	return undefined;
}

/** Map Accept-Language header to preferred locale (region-aware). */
export function localeFromAcceptLanguage(header: string | null): LocaleCode {
	if (!header) return defaultLocale;
	const prefs = header
		.split(',')
		.map((part) => {
			const [tag, qPart] = part.trim().split(';');
			const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
			return { tag: tag.toLowerCase(), q };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of prefs) {
		const primary = tag.split('-')[0];
		if (localeCodes.includes(primary as LocaleCode)) return primary as LocaleCode;
	}
	return defaultLocale;
}

export function getNavForLocale(locale: LocaleCode, labels: Record<string, string>) {
	const items: { label: string; href: string; pageId?: PageId }[] = [
		{ label: labels.home, href: getLocalizedPath('home', locale), pageId: 'home' },
	{ label: labels.hacks ?? 'Hacks', href: getLocalizedPath('hacks', locale), pageId: 'hacks' },
		{ label: labels.aimbot, href: getLocalizedPath('warzone-aimbot', locale), pageId: 'warzone-aimbot' },
		{ label: labels.esp, href: getLocalizedPath('warzone-esp', locale), pageId: 'warzone-esp' },
		{ label: 'Forums', href: locale === defaultLocale ? '/forums/' : `/${locale}/forums/` },
		{ label: labels.features, href: getLocalizedPath('features', locale), pageId: 'features' },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale), pageId: 'pricing' },
		{ label: labels.setup, href: getLocalizedPath('setup', locale), pageId: 'setup' },
		{ label: labels.updates, href: getLocalizedPath('updates', locale), pageId: 'updates' },
		{ label: labels.faq, href: getLocalizedPath('faq', locale), pageId: 'faq' },
	];
	return items;
}
