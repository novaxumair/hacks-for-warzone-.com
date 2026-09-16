/** Shared XML helpers for sitemap endpoints. */
export function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

/** Guardrail — never emit broken image locs into crawlable sitemaps. */
export function assertCrawlableAssetUrl(url: string, context: string): string {
	if (!url || url.includes('undefined') || url.includes('null')) {
		throw new Error(`[sitemap] Invalid asset URL for ${context}: ${url}`);
	}
	if (!/^https:\/\/[^/]+\//.test(url)) {
		throw new Error(`[sitemap] Asset URL must be absolute https for ${context}: ${url}`);
	}
	return url;
}

export function renderUrlsetXml(urlBlocks: string[]): string {
	const urls = urlBlocks.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export const sitemapResponseHeaders = {
	'Content-Type': 'application/xml; charset=utf-8',
	'Cache-Control': 'public, max-age=3600',
} as const;

export function renderSitemapIndexXml(subSitemaps: { loc: string; lastmod: string }[]): string {
	const entries = subSitemaps
		.map(
			({ loc, lastmod }) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </sitemap>`,
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
}

/** Render one image extension block; throws if URL is uncrawlable. */
export function renderImageExtension(
	image: {
		url: string;
		title: string;
		caption: string;
	},
	context: string,
): string {
	const url = assertCrawlableAssetUrl(image.url, context);
	return `    <image:image>
      <image:loc>${escapeXml(url)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`;
}
