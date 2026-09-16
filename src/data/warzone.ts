import { siteConfig } from './site';
import {
	getProductScreenshot,
	productScreenshots,
	PRODUCT_SCREENSHOT_COUNT,
	screenshotSrc,
} from './product-images';

/** @deprecated Use screenshotSrc from product-images */
export const rustScreenshot = screenshotSrc;

export const rustScreenshotAlts: Record<number, string> = Object.fromEntries(
	productScreenshots.map((s) => [s.id, s.alt]),
);

export function rustScreenshotAlt(n: number): string {
	return getProductScreenshot(n).alt;
}

/** Screenshots used across product pages. Agent uses brand.ts heroVideo — not these. */
export const warzoneImages = {
	hero: screenshotSrc(1),
	espWallhack: screenshotSrc(2),
	aimbotCombat: screenshotSrc(4),
	aimbotSkeleton: screenshotSrc(5),
	playerEsp: screenshotSrc(3),
	hacksCombat: screenshotSrc(6),
	logo: siteConfig.logo,
	cover: screenshotSrc(4),
	baseBuilder: screenshotSrc(5),
	squadFight: screenshotSrc(6),
	hacksPackage: screenshotSrc(7),
	headerArt: screenshotSrc(2),
	raidCombat: screenshotSrc(6),
	extractFight: screenshotSrc(7),
	raidFight: screenshotSrc(7),
	farmingRunCombat: screenshotSrc(2),
	farmingRunMode: screenshotSrc(1),
	raidMap: screenshotSrc(5),
	sessionMap: screenshotSrc(6),
	product: productScreenshots.map((s) => ({ src: s.src, alt: s.alt, url: s.url })),
	gallery: productScreenshots.map((s, i) => ({
		src: s.src,
		alt: s.alt,
		url: s.url,
		featured: i === 0,
	})),
	sitemap: productScreenshots.map((s) => ({
		src: s.src,
		url: s.url,
		title: s.title,
		caption: s.caption,
	})),
} as const;

export { PRODUCT_SCREENSHOT_COUNT };
