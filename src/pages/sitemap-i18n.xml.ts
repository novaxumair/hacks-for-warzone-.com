import type { APIRoute } from 'astro';

import {
	buildAllI18nSitemapEntries,
	renderLocaleSitemapUrlBlock,
} from '../data/sitemap-locale';
import { renderUrlsetXml, sitemapResponseHeaders } from '../data/sitemap-xml';

export const prerender = true;

/**
 * Combined localized sitemap (525 URLs) — kept for backward compatibility.
 * Prefer sitemap.xml → sitemap-{locale}.xml for regional Search Console submission.
 */
export const GET: APIRoute = () => {
	const entries = buildAllI18nSitemapEntries();
	const xml = renderUrlsetXml(entries.map(renderLocaleSitemapUrlBlock));

	return new Response(xml, { headers: sitemapResponseHeaders });
};
