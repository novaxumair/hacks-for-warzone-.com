import { brand } from './brand';
import type { PageId } from './i18n/routing';

export type ExternalResource = {
	id: string;
	label: string;
	href: string;
	note?: string;
};

export type GuideCta = {
	label: string;
	href: string;
};

/** Canonical outbound URLs — single source for CTAs, pills, and resource blocks. */
export const externalUrls = {
	steam: brand.gameUrl,
	steamNews: 'https://www.callofduty.com/warzone/news',
	officialSite: 'https://www.callofduty.com/warzone',
	wiki: 'https://callofduty.fandom.com/wiki/Call_of_Duty:_Warzone',
	steamCommunity: 'https://www.reddit.com/r/Warzone/',
} as const;

/** Authoritative third-party guides — cite official game sources for readers and search engines. */
export const externalResources: ExternalResource[] = [
	{
		id: 'steam',
		label: 'Call of Duty: Warzone on PC',
		href: externalUrls.steam,
		note: 'Official store page, system requirements, and player reviews.',
	},
	{
		id: 'patch',
		label: 'Call of Duty: Warzone patch notes & news',
		href: externalUrls.steamNews,
		note: 'Read official update posts before you change your loadout.',
	},
	{
		id: 'official',
		label: 'Official Call of Duty: Warzone website',
		href: externalUrls.officialSite,
		note: 'Game overview from Activision.',
	},
	{
		id: 'wiki',
		label: 'Call of Duty: Warzone Wiki (Fandom)',
		href: externalUrls.wiki,
		note: 'Player stats, maps, and survival mechanics.',
	},
	{
		id: 'community',
		label: 'Call of Duty: Warzone Community hub',
		href: externalUrls.steamCommunity,
		note: 'Announcements and community discussions.',
	},
];

/** Compact above-the-fold guide links for blogs and page banners. */
export const featuredGuidePills: GuideCta[] = [
	{ label: 'Call of Duty: Warzone on PC', href: externalUrls.steam },
	{ label: 'Official patch notes', href: externalUrls.steamNews },
	{ label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
];

/**
 * Secondary banner buttons that should point to official guides — not internal sales pages.
 * Keeps primary Buy CTAs while giving Google clear outbound citations.
 */
export const externalSecondaryByPageId: Partial<Record<PageId, GuideCta>> = {
	features: { label: 'Official patch notes', href: externalUrls.steamNews },
	updates: { label: 'Call of Duty: Warzone patch notes', href: externalUrls.steamNews },
	hacks: { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'warzone-esp': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'warzone-aimbot': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	radar: { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	setup: { label: 'Official game site', href: externalUrls.officialSite },
	support: { label: 'Call of Duty: Warzone community', href: externalUrls.steamCommunity },
	faq: { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	undetected: { label: 'Call of Duty: Warzone patch notes', href: externalUrls.steamNews },
	wallhack: { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	ricochet: { label: 'Official patch notes', href: externalUrls.steamNews },
	'cheats-2026': { label: 'Call of Duty: Warzone on PC', href: externalUrls.steam },
	'cheat-download': { label: 'Official game site', href: externalUrls.officialSite },
	'mod-menu': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'soft-aim': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'best-cheats': { label: 'Call of Duty: Warzone community', href: externalUrls.steamCommunity },
	'aimbot-hack': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'esp-hack': { label: 'Call of Duty: Warzone Wiki', href: externalUrls.wiki },
	'unlock-all': { label: 'Official game site', href: externalUrls.officialSite },
	pricing: { label: 'Call of Duty: Warzone on PC', href: externalUrls.steam },
};

export function getExternalSecondaryCta(pageId: PageId): GuideCta | undefined {
	return externalSecondaryByPageId[pageId];
}

export function isExternalHref(href: string): boolean {
	return href.startsWith('http');
}
