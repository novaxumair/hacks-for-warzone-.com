import { siteConfig } from './site';

/** User-provided Warzone gameplay screenshots (7 unique). */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'user:bader-warzone-01-coal-depot-scope.jpg',
	'user:bader-warzone-02-coal-depot-esp-box.jpg',
	'user:bader-warzone-03-coal-depot-balcony.jpg',
	'user:bader-warzone-04-coal-depot-aimbot.jpg',
	'user:bader-warzone-05-research-center-esp.jpg',
	'user:bader-warzone-06-goal-depot-rails.jpg',
	'user:bader-warzone-07-vondel-indoor-esp.png',
] as const;

export const PRODUCT_SCREENSHOT_COUNT = PRODUCT_SCREENSHOT_SOURCES.length;

export type ProductScreenshotMeta = {
	id: number;
	src: string;
	url: string;
	sourceUrl: string;
	sourceKey: string;
	alt: string;
	title: string;
	caption: string;
};

const alts: Record<number, { alt: string; title: string; caption: string }> = {
	1: {
		alt: 'Warzone aimbot scope view at Coal Depot with green AN-94 and HUD markers',
		title: 'Warzone aimbot scope at Coal Depot',
		caption: 'Warzone aimbot through optic with Coal Depot buildings and Battle Royale HUD on PC',
	},
	2: {
		alt: 'Warzone ESP box overlay on Coal Depot stairs with colorful weapon skin',
		title: 'Warzone box ESP at Coal Depot',
		caption: 'Warzone wallhack player box ESP and enemy highlight on stairs at Coal Depot',
	},
	3: {
		alt: 'Warzone player ESP tags on Coal Depot balcony with colorful weapon view',
		title: 'Warzone ESP tags at Coal Depot',
		caption: 'Warzone ESP distance markers and player overlay on balcony walkway at Coal Depot',
	},
	4: {
		alt: 'Warzone aimbot lock and box ESP on enemy at Coal Depot with Dead Flip skin',
		title: 'Warzone aimbot and box ESP at Coal Depot',
		caption: 'Warzone cheats aimbot target box and visibility ESP during rooftop fight on PC',
	},
	5: {
		alt: 'Warzone player ESP distance tags at Research Center through gas with AK-47',
		title: 'Warzone ESP at Research Center',
		caption: 'Warzone wallhack distance ESP and red player tags through gas zone on PC',
	},
	6: {
		alt: 'Warzone combat at Goal Depot rail yard with ESP overlay and colorful weapon',
		title: 'Warzone ESP at Goal Depot',
		caption: 'Warzone player ESP and aimbot overlay at Goal Depot train tracks on PC',
	},
	7: {
		alt: 'Warzone ESP player overlay in Vondel indoor hallway with distance tags',
		title: 'Warzone indoor ESP at Vondel',
		caption: 'Warzone ESP wallhack with player boxes, distance readouts and tactical HUD indoors',
	},
};

export function normalizeScreenshotId(n: number): number {
	return ((n - 1) % PRODUCT_SCREENSHOT_COUNT) + 1;
}

export function screenshotSourceKey(id: number): string {
	return PRODUCT_SCREENSHOT_SOURCES[normalizeScreenshotId(id) - 1]!;
}

export function screenshotsShareSource(a: number, b: number): boolean {
	return screenshotSourceKey(a) === screenshotSourceKey(b);
}

export function screenshotIdFromSrc(src: string): number | undefined {
	const match = src.match(/warzone-screenshot-(\d{2})\.webp/i);
	return match ? parseInt(match[1]!, 10) : undefined;
}

/** Cinematic hero art — homepage banner only; never reuse in galleries or in-game blocks. */
export const HERO_IMAGE_PREFIXES = ['/images/warzone-cheats-hero', '/images/warzone-hero-poster'] as const;

export function isHeroMarketingImage(src: string): boolean {
	return HERO_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix));
}

export function screenshotSrc(n: number): string {
	const id = normalizeScreenshotId(n);
	return `/images/warzone-screenshot-${String(id).padStart(2, '0')}.webp`;
}

export function absoluteScreenshotUrl(n: number): string {
	return new URL(screenshotSrc(n), siteConfig.url).href;
}

export function getProductScreenshot(n: number): ProductScreenshotMeta {
	const id = normalizeScreenshotId(n);
	const meta = alts[id] ?? {
		alt: `Warzone hacks gameplay screenshot ${id}`,
		title: `Warzone hacks screenshot ${id}`,
		caption: `Warzone hacks screenshot ${id} for Call of Duty Warzone on Windows PC`,
	};
	const src = screenshotSrc(id);
	const sourceKey = screenshotSourceKey(id);
	return {
		id,
		src,
		url: new URL(src, siteConfig.url).href,
		sourceUrl: sourceKey,
		sourceKey,
		...meta,
	};
}

/** Pick N screenshots with unique source assets — skips duplicate visuals. */
export function pickUniqueScreenshotIds(options: {
	count: number;
	excludeKeys?: Iterable<string>;
	startOffset?: number;
	stride?: number;
}): number[] {
	const { count, excludeKeys = [], startOffset = 0, stride = 2 } = options;
	const usedKeys = new Set(excludeKeys);
	const result: number[] = [];

	for (
		let step = 0;
		result.length < count && step < PRODUCT_SCREENSHOT_COUNT * 3;
		step += 1
	) {
		const id = normalizeScreenshotId(startOffset + step * stride + 1);
		const key = screenshotSourceKey(id);
		if (usedKeys.has(key)) continue;
		usedKeys.add(key);
		result.push(id);
	}

	return result;
}

export const productScreenshots: ProductScreenshotMeta[] = Array.from(
	{ length: PRODUCT_SCREENSHOT_COUNT },
	(_, i) => getProductScreenshot(i + 1),
);

/** JSON-LD ImageObject nodes for gallery / sitemap parity. */
export function screenshotImageObjects(limit = PRODUCT_SCREENSHOT_COUNT) {
	return productScreenshots.slice(0, limit).map((shot) => ({
		'@type': 'ImageObject' as const,
		'@id': `${shot.url}#image`,
		url: shot.url,
		contentUrl: shot.url,
		name: shot.title,
		description: shot.caption,
		thumbnailUrl: shot.url,
	}));
}
