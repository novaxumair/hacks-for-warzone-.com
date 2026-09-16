import { customerReviews, type CustomerReview } from './site';
import { defaultLocale, localeCodes, localeMap, type LocaleCode } from './i18n/locales';
import { buildCanonicalUrl } from './i18n/routing';
import { getReviewPath } from './reviews';
import { getT } from '../i18n/server';

function reviewField(
	t: ReturnType<typeof getT>,
	slug: string,
	field: 'text' | 'short' | 'seoTitle' | 'seoDescription',
	fallback: string,
): string {
	const key = `reviews.items.${slug}.${field}`;
	const value = t(key);
	return value === key ? fallback : value;
}

function localizeReview(t: ReturnType<typeof getT>, item: CustomerReview): CustomerReview {
	return {
		...item,
		text: reviewField(t, item.slug, 'text', item.text),
		short: reviewField(t, item.slug, 'short', item.short),
		seoTitle: reviewField(t, item.slug, 'seoTitle', item.seoTitle),
		seoDescription: reviewField(t, item.slug, 'seoDescription', item.seoDescription),
	};
}

export function getLocalizedReviewBySlug(slug: string, locale: LocaleCode): CustomerReview | undefined {
	const item = customerReviews.find((review) => review.slug === slug);
	if (!item) return undefined;
	const t = getT(locale);
	return localizeReview(t, item);
}

export function getReviewHreflangAlternates(slug: string, currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: buildCanonicalUrl(getReviewPath(slug, code)),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{
			hreflang: 'x-default' as const,
			href: buildCanonicalUrl(getReviewPath(slug, defaultLocale)),
		},
	];
}
