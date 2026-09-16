import type { APIRoute } from 'astro';
import { absolutePageUrl, pageSitemapEntries } from '../data/page-sitemap';
import { defaultCrawlImageSrc } from '../data/page-images';
import { siteConfig } from '../data/site';
import { getForumSitemapEntries } from '../data/forums/helpers';
import { getReviewSitemapEntries } from '../data/reviews';
import { getFaqSitemapEntries } from '../data/faq';
import { standaloneEnSitemapEntries } from '../data/standalone-sitemap';
import { hreflangLinksXml, resolvePageIdFromPath } from '../data/i18n/routing';
import { escapeXml, renderImageExtension, renderUrlsetXml, sitemapResponseHeaders } from '../data/sitemap-xml';

export const prerender = true;

const defaultSitemapImage = {
	url: new URL(defaultCrawlImageSrc, siteConfig.url).href,
	title: `${siteConfig.name} — Warzone hacks`,
	caption: 'Warzone hacks ESP, aimbot, and wallhack for Windows PC',
};

/** English page urlset (listed under sitemap.xml index). */
export const GET: APIRoute = () => {
	const blogEntries = getForumSitemapEntries()
		.filter((entry) => !entry.path.match(/^\/[a-z]{2}\//))
		.map((entry) => ({
			path: entry.path,
			lastmod: entry.lastmod,
			changefreq: entry.changefreq,
			priority: entry.priority,
			images: entry.images,
		}));

	const reviewEntries = getReviewSitemapEntries();
	const faqEntries = getFaqSitemapEntries();
	const standaloneEntries = standaloneEnSitemapEntries;

	const urls = [
		...pageSitemapEntries,
		...blogEntries,
		...reviewEntries,
		...faqEntries,
		...standaloneEntries,
	].map((entry) => {
		const images =
			'images' in entry && entry.images?.length
				? entry.images
				: [defaultSitemapImage];
		const imageXml = images
			.map((image) => renderImageExtension(image, entry.path))
			.join('\n');

		const imageBlock = imageXml ? `\n${imageXml}` : '';
		const pageId = resolvePageIdFromPath(entry.path);
		const hreflangBlock = pageId ? `\n${hreflangLinksXml(pageId, escapeXml)}` : '';

		return `  <url>
    <loc>${escapeXml(absolutePageUrl(entry.path))}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>${hreflangBlock}${imageBlock}
  </url>`;
	});

	const xml = renderUrlsetXml(urls);

	return new Response(xml, { headers: sitemapResponseHeaders });
};
