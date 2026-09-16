import { seoFaqs, siteConfig, type FaqItem } from './site';
import { defaultLocale, type LocaleCode } from './i18n/locales';
import { crawlPhotoMeta } from './page-images';

export const faqBasePath = '/faq/';

export function getFaqPath(slug: string, locale: LocaleCode = defaultLocale): string {
	if (locale === defaultLocale) {
		return `${faqBasePath}${slug}/`;
	}
	return `/${locale}/faq/${slug}/`;
}

export function absoluteFaqUrl(slug?: string): string {
	return new URL(slug ? getFaqPath(slug) : faqBasePath, siteConfig.url).href;
}

export function getFaqBySlug(slug: string): FaqItem | undefined {
	return seoFaqs.find((item) => item.slug === slug);
}

/** Neighbouring FAQ items for internal linking on answer pages. */
export function getRelatedFaqs(slug: string, count = 4): FaqItem[] {
	const index = seoFaqs.findIndex((item) => item.slug === slug);
	if (index < 0) return seoFaqs.slice(0, count);

	const related: FaqItem[] = [];
	for (let offset = 1; related.length < count && offset < seoFaqs.length; offset += 1) {
		related.push(seoFaqs[(index + offset) % seoFaqs.length]);
	}
	return related;
}

export function getFaqCrawlImage(item: FaqItem) {
	return crawlPhotoMeta(item.slug, item.question, item.seoDescription);
}

/** English FAQ answer routes for sitemap-en.xml — every URL includes a crawl photo. */
export function getFaqSitemapEntries() {
	const lastmod = '2026-08-25';

	return seoFaqs.map((item) => {
		const photo = getFaqCrawlImage(item);
		return {
			path: getFaqPath(item.slug),
			lastmod,
			priority: 0.72,
			changefreq: 'monthly' as const,
			images: [
				{
					url: photo.url,
					title: photo.title,
					caption: photo.caption,
				},
			],
		};
	});
}
