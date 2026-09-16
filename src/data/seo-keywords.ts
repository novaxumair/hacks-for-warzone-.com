import type { PageId } from './i18n/routing';

export const primarySeoKeyword = 'warzone cheats';

export const globalSeoKeywords = [
	'warzone cheats',
	'warzone hack',
	'warzone hacks',
	'warzone aimbot',
	'warzone esp',
	'warzone wallhack',
	'warzone triggerbot',
	'warzone radar hack',
	'warzone no recoil',
	'warzone mod menu',
	'warzone cheat software',
	'warzone cheats pc',
	'warzone cheats 2026',
	'undetected warzone cheats',
	'best warzone cheats',
	'warzone ranked cheats',
	'warzone competitive cheats',
	'warzone unlock tool',
	'warzone soft aim',
	'warzone silent aim',
	'warzone esp overlay',
	'warzone wallhack pc',
	'warzone aimbot pc',
	'warzone cheat menu',
	'warzone game cheats',
	'warzone pc cheats',
	'warzone cheats windows 11',
	'warzone latest cheats 2026',
] as const;

export const pageSeoKeywords: Partial<Record<PageId, readonly string[]>> = {
	home: [
		'warzone cheats',
		'warzone cheats 2026',
		'undetected warzone cheats',
		'best warzone cheats',
		'warzone esp',
		'warzone aimbot',
	],
	hacks: [
		'warzone cheats',
		'warzone hacks',
		'warzone cheat software',
		'undetected warzone cheats',
		'warzone esp',
		'warzone aimbot',
	],
	'warzone-esp': [
		'warzone esp',
		'warzone esp cheat',
		'warzone wallhack',
		'warzone player esp',
		'warzone enemy esp',
		'warzone esp overlay',
	],
	wallhack: [
		'warzone wallhack',
		'warzone wall hacks',
		'warzone wallhack cheat',
		'warzone enemy wallhack',
		'warzone esp',
	],
	'warzone-aimbot': [
		'warzone aimbot',
		'warzone aimbot cheat',
		'warzone legit aimbot',
		'warzone smooth aimbot',
		'warzone headshot aimbot',
	],
	'aimbot-hack': ['warzone aimbot hack', 'warzone aimbot', 'warzone rage aimbot', 'warzone auto aim'],
	'soft-aim': ['warzone soft aim', 'warzone silent aim', 'warzone auto targeting', 'warzone aimbot settings'],
	radar: ['warzone radar hack', 'warzone radar overlay', 'warzone minimap hack', 'warzone live radar'],
	'esp-hack': ['warzone esp hack', 'warzone esp', 'warzone wallhack', 'warzone agent esp'],
	features: [
		'warzone cheat features',
		'warzone esp',
		'warzone aimbot',
		'warzone wallhack',
		'warzone mod menu',
		'warzone streamproof',
	],
	pricing: [
		'buy warzone cheats',
		'warzone cheats price',
		'warzone cheats monthly',
		'warzone cheats lifetime',
	],
	setup: ['warzone cheats setup', 'warzone cheat download', 'install warzone cheats'],
	'cheat-download': ['warzone cheat download', 'warzone cheats download', 'warzone cheat windows 10'],
	updates: [
		'undetected warzone cheats',
		'warzone cheats status',
		'ricochet update',
		'warzone cheats undetected',
	],
	undetected: ['undetected warzone cheats', 'warzone cheats undetected', 'ricochet undetected'],
	ricochet: [
		'ricochet bypass',
		'warzone ricochet bypass',
		'warzone anti cheat bypass',
		'warzone ranked cheats',
	],
	'cheats-2026': [
		'warzone cheats 2026',
		'warzone hacks 2026',
		'best warzone cheats 2026',
		'warzone aimbot 2026',
	],
	'best-cheats': [
		'best warzone cheats',
		'best warzone hacks',
		'warzone cheat comparison',
		'warzone cheat review 2026',
	],
	'mod-menu': ['warzone mod menu', 'warzone cheat menu', 'warzone tools'],
	'unlock-all': ['warzone unlock tool', 'warzone unlock all', 'warzone skin unlock tool'],
	faq: ['warzone cheats faq', 'warzone cheat guide', 'undetected warzone cheats'],
	support: ['warzone cheats support', 'warzone cheat setup help'],
};

export const reviewsSeoKeywords = [
	'warzone cheats reviews',
	'warzone hack review',
	'warzone cheat review',
	'warzone esp review',
	'warzone aimbot review',
	'warzone wallhack review',
	'undetected warzone cheats',
	'warzone ranked cheats',
] as const;

export function getPageSeoKeywords(pageId?: PageId): string[] {
	if (!pageId) return [...globalSeoKeywords];
	const pageKeywords = pageSeoKeywords[pageId];
	return pageKeywords?.length ? [...pageKeywords] : [...globalSeoKeywords];
}
