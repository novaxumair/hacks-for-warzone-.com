/** Shared constants for i18n content generation. */

export const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

export const PAGE_IDS = [
	'home', 'warzone-esp', 'warzone-aimbot', 'features', 'pricing', 'setup',
	'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'ricochet',
	'cheats-2026', 'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all', 'privacy', 'refund', 'terms',
];

/** Agent image per page — simple warzone cheats keyword filenames. */
export const HERO_IMAGES = {
	home: '/images/warzone-screenshot-01.webp',
	'warzone-esp': '/images/warzone-screenshot-01.webp',
	'warzone-aimbot': '/images/warzone-screenshot-02.webp',
	features: '/images/warzone-screenshot-03.webp',
	pricing: '/images/warzone-screenshot-04.webp',
	setup: '/images/warzone-screenshot-05.webp',
	updates: '/images/warzone-screenshot-06.webp',
	faq: '/images/warzone-screenshot-07.webp',
	support: '/images/warzone-screenshot-07.webp',
	undetected: '/images/warzone-screenshot-01.webp',
	wallhack: '/images/warzone-screenshot-02.webp',
	radar: '/images/warzone-screenshot-03.webp',
	ricochet: '/images/warzone-screenshot-04.webp',
	'cheats-2026': '/images/warzone-screenshot-05.webp',
	hacks: '/images/warzone-screenshot-06.webp',
	'cheat-download': '/images/warzone-screenshot-07.webp',
	'mod-menu': '/images/warzone-screenshot-02.webp',
	'soft-aim': '/images/warzone-screenshot-01.webp',
	'best-cheats': '/images/warzone-screenshot-02.webp',
	'aimbot-hack': '/images/warzone-screenshot-03.webp',
	'esp-hack': '/images/warzone-screenshot-04.webp',
	'unlock-all': '/images/warzone-screenshot-05.webp',
	privacy: '/images/warzone-screenshot-06.webp',
	refund: '/images/warzone-screenshot-07.webp',
	terms: '/images/warzone-screenshot-03.webp',
};

export const TS_HEADER = `import type { LocaleCode } from './locales';

export type PageSection = { h2: string; paragraphs: string[]; list?: string[] };
export type PageContent = {
\ttitle: string;
\tdescription: string;
\th1: string;
\tintro: string;
\timageAlt: string;
\tgalleryTitle: string;
\theroImage: string;
\tsections: PageSection[];
\tctaPrimary: string;
\tctaSecondary?: string;
\tctaSecondaryHref?: string;
};
export type LocaleUi = {
\tnav: { home: string; hacks: string; aimbot: string; esp: string; features: string; pricing: string; setup: string; updates: string; faq: string; buyNow: string };
\thero: { accent: string; accentShort: string; subtitle: string; subtitleShort: string; buyNow: string; seeFeatures: string };
\ttrust: { status: string; statusNote: string; statusShort: string; delivery: string; platform: string; antiCheat: string; antiCheatShort: string };
\tproduct: { title: string; addToCart: string; monthly: string; lifetime: string; available: string; gameBadge: string; platformBadge: string; statusBadge: string };
\treviews: { title: string; subtitle: string; outOf: string; countLabel: string };
\tcommon: { buyNow: string; readGuide: string; language: string; officialLanguageNote: string; relatedPages: string };
\tfooter: { explore: string; help: string; tagline: string };
\timages: {
\t\thero: string; espWallhack: string; aimbotCombat: string; squadFight: string; playerEsp: string;
\t\theaderArt: string; hacksPackage: string; matchFight: string; battleRoyale: string; matchMap: string;
\t};
};
export type PageId = 'home' | 'warzone-esp' | 'warzone-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'ricochet' | 'cheats-2026' | 'hacks' | 'cheat-download' | 'mod-menu' | 'soft-aim' | 'best-cheats' | 'aimbot-hack' | 'esp-hack' | 'unlock-all' | 'privacy' | 'refund' | 'terms';
`;

/** Clamp meta strings to SEO limits without ugly ellipsis. */
export function clampTitle(s) {
	if (s.length <= 60) return s;
	const trimmed = s.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export function clampDesc(s) {
	let text = s.trim();
	const MIN = 140;
	const MAX = 160;
	if (text.length < MIN) {
		const pad = text.toLowerCase().includes('cheatsforwarzone.com')
			? ' Windows PC license with Ricochet maintenance after patches.'
			: ' Compare plans and guides at cheatsforwarzone.com.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= MAX) return text;
	const trimmed = text.slice(0, MAX);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, MAX);
}

/** Remove checkout from meta title/description strings only. */
export function stripcheckoutFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*checkout via checkout\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en checkout\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout über checkout\.?/gi, '.')
		.replace(/\s*with secure checkout\.?/gi, '.')
		.replace(/\s*via secure checkout\.?/gi, '.')
		.replace(/\s*Checkout via checkout\.?/gi, '')
		.replace(/\s*secure checkout,?\s*/gi, ' ')
		.replace(/\s*checkout delivery\.?/gi, ' instant digital delivery.')
		.replace(/\s*and checkout delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant checkout Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy on checkout/g, 'Buy Warzone Cheats')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

/** Build a page section. Pass 2+ paragraph strings; optional trailing string[] becomes list. */
export function section(h2, ...args) {
	let list;
	const paragraphs = [...args];
	if (paragraphs.length && Array.isArray(paragraphs[paragraphs.length - 1])) {
		list = paragraphs.pop();
	}
	if (paragraphs.length < 2) {
		throw new Error(`section "${h2}" needs at least 2 paragraphs`);
	}
	const sec = { h2, paragraphs };
	if (list?.length) sec.list = list;
	return sec;
}

/** Authoritative external citation helpers (open in new tab). */
export const EXT = {
	activision:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone</a>',
	rust:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone</a>',
	finals:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone</a>',
	naraka:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone</a>',
	warzone:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone</a>',
	status:
		'<a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">Call of Duty: Warzone on PC</a>',
	eac:
		'<a href="https://www.callofduty.com/warzone/news" target="_blank" rel="noopener noreferrer">Ricochet anti-cheat</a>',
	ricochet:
		'<a href="https://www.callofduty.com/warzone/news" target="_blank" rel="noopener noreferrer">Ricochet anti-cheat</a>',
};
