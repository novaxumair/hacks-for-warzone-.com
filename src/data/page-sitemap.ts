import { siteConfig } from './site';
import { englishPaths, pageIds, type PageId } from './i18n/routing';
import { pageSitemapMeta } from './sitemap-meta';
import { resolvedSitemapImages, sitemapLastmod } from './brand-sitemap';
import { sitemapExcludedPageIds } from './seo-canonical';
import { getPageCrawlImage } from './page-images';

export type SitemapImage = {
	url: string;
	title: string;
	caption: string;
};

export type PageSitemapEntry = {
	path: string;
	priority: number;
	changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
	lastmod: string;
	images: SitemapImage[];
};

const abs = (path: string) => new URL(path, siteConfig.url).href;

const img = (path: string, title: string, caption: string): SitemapImage => ({
	url: abs(path),
	title,
	caption,
});

/**
 * Canonical English sitemap entries — excludes URLs that 301 to a stronger pillar
 * (avoids Search Console “Submitted URL has redirect” noise).
 */
export const pageSitemapEntries: PageSitemapEntry[] = pageIds
	.filter((pageId) => !sitemapExcludedPageIds.has(pageId))
	.map((pageId) => {
		const meta = pageSitemapMeta[pageId];
		const crawl = getPageCrawlImage(pageId);
		return {
			path: englishPaths[pageId],
			priority: meta.priority,
			changefreq: meta.changefreq,
			lastmod: sitemapLastmod(meta.lastmod),
			images: [{ url: crawl.url, title: crawl.title, caption: crawl.caption }],
		};
	});

/** Unique keyword images for the dedicated image sitemap (editable in Brand Studio). */
export const imageSitemapEntries: SitemapImage[] = resolvedSitemapImages().map((entry) =>
	img(entry.src, entry.title, entry.caption),
);

export function absolutePageUrl(path: string): string {
	return abs(path);
}

export function absoluteAssetUrl(path: string): string {
	return abs(path);
}
