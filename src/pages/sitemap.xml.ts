import type { APIRoute } from 'astro';
import { getForumSitemapEntries } from '../data/forums/helpers';
import { siteConfig } from '../data/site';
import { i18nLocaleCodes, localeSitemapUrl } from '../data/sitemap-locale';
import { latestPageLastmod } from '../data/sitemap-meta';
import { renderSitemapIndexXml, sitemapResponseHeaders } from '../data/sitemap-xml';

export const prerender = true;

/**
 * Primary sitemap index for Google Search Console — EN + 21 locale + image sitemaps.
 * Page URLs live in sitemap-en.xml (Features=/features/, Store=/pricing/, Status=/updates/).
 */
export const GET: APIRoute = () => {
	const pageLastmod = latestPageLastmod();
	// sitemap-en.xml also contains blog URLs, so its lastmod must cover the newest post update.
	const englishLastmod = getForumSitemapEntries().reduce(
		(max, entry) => (entry.lastmod > max ? entry.lastmod : max),
		pageLastmod,
	);

	const subSitemaps: { loc: string; lastmod: string }[] = [
		{ loc: new URL('/sitemap-en.xml', siteConfig.url).href, lastmod: englishLastmod },
		...i18nLocaleCodes.map((locale) => ({
			loc: localeSitemapUrl(locale),
			lastmod: pageLastmod,
		})),
		{ loc: new URL('/sitemap-images.xml', siteConfig.url).href, lastmod: pageLastmod },
	];

	const xml = renderSitemapIndexXml(subSitemaps);

	return new Response(xml, { headers: sitemapResponseHeaders });
};
