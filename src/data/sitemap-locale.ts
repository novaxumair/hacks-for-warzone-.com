import { getPageContent } from './i18n';
import { getLocalizedPath, hreflangLinksXml, pageIds, type PageId } from './i18n/routing';
import { defaultLocale, localeCodes, type LocaleCode } from './i18n/locales';
import { siteConfig } from './site';
import { pageSitemapMeta } from './sitemap-meta';
import { escapeXml, assertCrawlableAssetUrl } from './sitemap-xml';
import { sitemapLastmod } from './brand-sitemap';
import { getPageCrawlImage } from './page-images';
import { sitemapExcludedPageIds } from './seo-canonical';

export type LocaleSitemapEntry = {
	path: string;
	pageId?: PageId;
	lastmod: string;
	priority: number;
	changefreq: string;
	image?: { url: string; title: string; caption: string };
};

/** Non-English locale codes included in regional sitemaps. */
export const i18nLocaleCodes = localeCodes.filter((code) => code !== defaultLocale);

import { getForumSitemapEntriesForLocale } from './forums/helpers';

/** Forum index + threads per locale sitemap. */
export const FORUM_PAGES_PER_LOCALE = 13;

/** Build sitemap entries for one non-English locale (product pages + forum URLs). */
export function buildLocaleSitemapEntries(locale: LocaleCode): LocaleSitemapEntry[] {
	if (locale === defaultLocale) {
		throw new Error(`English pages belong in sitemap-en.xml, not sitemap-${locale}.xml`);
	}

	const productEntries: LocaleSitemapEntry[] = pageIds
		.filter((pageId) => !sitemapExcludedPageIds.has(pageId))
		.map((pageId) => {
		const meta = pageSitemapMeta[pageId];
		const page = pageId === 'home' ? null : getPageContent(locale, pageId);
		const crawl = getPageCrawlImage(pageId);
		const imageSrc =
			pageId === 'home'
				? crawl.src
				: page?.heroImage && !page.heroImage.includes('undefined')
					? page.heroImage
					: crawl.src;

		return {
			path: getLocalizedPath(pageId, locale),
			pageId,
			lastmod: sitemapLastmod(meta.lastmod),
			priority: meta.i18nPriority,
			changefreq: meta.changefreq,
			image: {
				url: new URL(imageSrc, siteConfig.url).href,
				title: pageId === 'home' ? crawl.title : page?.title ?? crawl.title,
				caption: pageId === 'home' ? crawl.caption : page?.imageAlt ?? crawl.caption,
			},
		};
	});

	const blogEntries: LocaleSitemapEntry[] = getForumSitemapEntriesForLocale(locale).map((entry) => ({
		path: entry.path,
		lastmod: entry.lastmod,
		priority: entry.priority,
		changefreq: entry.changefreq,
		image: entry.images[0],
	}));

	return [...productEntries, ...blogEntries];
}

export function localeSitemapFilename(locale: LocaleCode): string {
	return `sitemap-${locale}.xml`;
}

export function localeSitemapUrl(locale: LocaleCode): string {
	return new URL(`/${localeSitemapFilename(locale)}`, siteConfig.url).href;
}

export function renderLocaleSitemapUrlBlock(entry: LocaleSitemapEntry): string {
	const loc = new URL(entry.path, siteConfig.url).href;
	const hreflangBlock = entry.pageId ? `\n${hreflangLinksXml(entry.pageId, escapeXml)}` : '';
	if (!entry.image) {
		throw new Error(`[sitemap] Missing image for locale URL ${entry.path}`);
	}
	const imageUrl = assertCrawlableAssetUrl(entry.image.url, entry.path);
	const imageBlock = `\n    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(entry.image.title)}</image:title>
      <image:caption>${escapeXml(entry.image.caption)}</image:caption>
    </image:image>`;

	return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>${hreflangBlock}${imageBlock}
  </url>`;
}

/** Combined i18n entries (all 21 locales) — used by sitemap-i18n.xml for backward compatibility. */
export function buildAllI18nSitemapEntries(): LocaleSitemapEntry[] {
	return i18nLocaleCodes.flatMap((locale) => buildLocaleSitemapEntries(locale));
}
