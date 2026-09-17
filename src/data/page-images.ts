import { siteConfig } from './site';
import { pageIds, type PageId } from './i18n/routing';
import { pageSitemapImageLabels } from './brand-sitemap';

import { buildSrcSet } from '../lib/responsive-images';
import {
	screenshotSrc,
	PRODUCT_SCREENSHOT_COUNT,
	getProductScreenshot,
	screenshotSourceKey,
	screenshotIdFromSrc,
	pickUniqueScreenshotIds,
	isHeroMarketingImage,
} from './product-images';

const shot = screenshotSrc;

/** Blurred banner photo for Cheats / Features / Store / Status tabs. */
export const pillarTabHeroSrc = '/images/pillar-tab-hero.webp';
export const pillarTabHeroSrcSet = buildSrcSet([
	{ src: '/images/pillar-tab-hero-640w.webp', width: 640 },
	{ src: '/images/pillar-tab-hero-960w.webp', width: 960 },
	{ src: '/images/pillar-tab-hero.webp', width: 1024 },
	{ src: '/images/pillar-tab-hero-1920w.webp', width: 1920 },
]);
export const pillarTabHeroSizes = '100vw';
export const pillarTabHeroWidth = 1024;
export const pillarTabHeroHeight = 576;

const PILLAR_TAB_HERO_PAGE_IDS = new Set<PageId>(['hacks', 'features', 'pricing', 'updates']);

export function usesPillarTabHero(pageId: PageId): boolean {
	return PILLAR_TAB_HERO_PAGE_IDS.has(pageId);
}

/** Rotating product screenshots for FAQ / review detail URLs. */
export const crawlPhotoPool = Array.from({ length: PRODUCT_SCREENSHOT_COUNT }, (_, i) => shot(i + 1));

/** Coprime with 7 — keeps horizontal grid neighbors visually distinct. */
const GRID_IMAGE_STRIDE = 2;
const BLOG_GRID_COLUMNS = 3;

function buildPageImageMap(): Record<PageId, string> {
	const map = {} as Record<PageId, string>;
	map.home = '/images/warzone-screenshot-01.webp';
	const contentIds = pageIds.filter((id) => id !== 'home');
	for (const [index, pageId] of contentIds.entries()) {
		map[pageId] = shot((index % PRODUCT_SCREENSHOT_COUNT) + 1);
	}
	return map;
}

/**
 * One primary crawl/OG photo per product page.
 * Prefer compressed WebP screenshots so Google can fetch them quickly.
 */
export const pageImageSrcById: Record<PageId, string> = buildPageImageMap();

for (const pageId of pageIds) {
	if (!pageImageSrcById[pageId]) {
		throw new Error(`[page-images] No image path configured for pageId: ${pageId}`);
	}
}

export function absoluteImageUrl(path: string): string {
	return new URL(path, siteConfig.url).href;
}

export function getPageImageSrc(pageId: PageId): string {
	return pageImageSrcById[pageId];
}

export function getPageCrawlImage(pageId: PageId): {
	src: string;
	url: string;
	title: string;
	caption: string;
} {
	const src = pageImageSrcById[pageId];
	const labels = pageSitemapImageLabels(pageId);
	return {
		src,
		url: absoluteImageUrl(src),
		title: labels.title,
		caption: labels.caption,
	};
}

/** Grid-safe screenshot id — unique horizontal neighbors in 3-column layouts. */
export function getGridScreenshotId(displayIndex: number): number {
	return ((displayIndex * GRID_IMAGE_STRIDE) % PRODUCT_SCREENSHOT_COUNT) + 1;
}

export function getGridScreenshotSrc(displayIndex: number): string {
	return shot(getGridScreenshotId(displayIndex));
}

export function getGridScreenshotMeta(displayIndex: number) {
	return getProductScreenshot(getGridScreenshotId(displayIndex));
}

/** Unique gallery shots per page — never repeats hero art, page duplicates, or adjacent twins. */
export function getPageGalleryImages(
	pageId: PageId,
	count = 3,
): Array<{ src: string; alt: string; url: string }> {
	const heroSrc = getPageImageSrc(pageId);
	const heroId = screenshotIdFromSrc(heroSrc) ?? 1;
	const heroKey = screenshotSourceKey(heroId);
	const startIndex = pageIds.indexOf(pageId);

	const ids = pickUniqueScreenshotIds({
		count,
		excludeKeys: [heroKey],
		startOffset: startIndex + 1,
		stride: GRID_IMAGE_STRIDE,
	});

	const seenSrc = new Set<string>([heroSrc]);

	return ids
		.map((id) => {
			const meta = getProductScreenshot(id);
			return { src: meta.src, alt: meta.alt, url: meta.url };
		})
		.filter((item) => {
			if (isHeroMarketingImage(item.src)) return false;
			if (item.src === heroSrc || seenSrc.has(item.src)) return false;
			seenSrc.add(item.src);
			return true;
		});
}

/** Stable screenshot for a single blog post (OG / article hero). */
export function getBlogPostImageId(postIndex: number): number {
	return getGridScreenshotId(postIndex);
}

export function getBlogPostImageSrc(postIndex: number): string {
	return getGridScreenshotSrc(postIndex);
}

export function getBlogPostImageMeta(postIndex: number) {
	return getGridScreenshotMeta(postIndex);
}

/** Blog index cards — position in the visible grid, not raw post array index. */
export function getBlogCardImageSrc(displayIndex: number): string {
	return getGridScreenshotSrc(displayIndex);
}

export function getBlogCardImageMeta(displayIndex: number) {
	return getGridScreenshotMeta(displayIndex);
}

/** Stable pick from the photo pool (FAQ answers, reviews, etc.). */
export function pickCrawlPhoto(seed: string): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) {
		hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
	}
	return crawlPhotoPool[hash % crawlPhotoPool.length];
}

export function crawlPhotoMeta(
	seed: string,
	title: string,
	caption: string,
): { src: string; url: string; title: string; caption: string } {
	const src = pickCrawlPhoto(seed);
	return {
		src,
		url: absoluteImageUrl(src),
		title,
		caption,
	};
}

/** Default large social / SERP image when a page has no specific asset. */
export const defaultCrawlImageSrc = pageImageSrcById.home;

/** Reviews schema/OG only — Call of Duty: Warzone gameplay screenshot (not shown on reviews page). */
export const reviewsImageSrc = shot(3);

export { BLOG_GRID_COLUMNS, GRID_IMAGE_STRIDE };
