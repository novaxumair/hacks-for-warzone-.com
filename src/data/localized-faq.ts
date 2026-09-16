import { homeFaqs, seoFaqs, type FaqItem } from './site';
import { defaultLocale, localeCodes, localeMap, type LocaleCode } from './i18n/locales';
import { buildCanonicalUrl } from './i18n/routing';
import { getT } from '../i18n/server';
import { getFaqPath } from './faq';

function faqField(
	t: ReturnType<typeof getT>,
	slug: string,
	field: 'q' | 'a' | 'seoTitle' | 'seoDescription',
	fallback: string,
): string {
	const key = `faq.items.${slug}.${field}`;
	const value = t(key);
	return value === key ? fallback : value;
}

function localizeFaq(t: ReturnType<typeof getT>, item: FaqItem): FaqItem {
	const question = faqField(t, item.slug, 'q', item.question);
	const answer = faqField(t, item.slug, 'a', item.answer);
	return {
		...item,
		question,
		answer,
		seoTitle: faqField(t, item.slug, 'seoTitle', `${question} | FAQ`),
		seoDescription: faqField(
			t,
			item.slug,
			'seoDescription',
			answer.length > 160 ? `${answer.slice(0, 157).trim()}…` : answer,
		),
	};
}

export function getLocalizedFaqBySlug(slug: string, locale: LocaleCode): FaqItem | undefined {
	const item = seoFaqs.find((faq) => faq.slug === slug);
	if (!item) return undefined;
	const t = getT(locale);
	return localizeFaq(t, item);
}

export function getFaqHreflangAlternates(slug: string, currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: buildCanonicalUrl(getFaqPath(slug, code)),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{ hreflang: 'x-default' as const, href: buildCanonicalUrl(getFaqPath(slug, defaultLocale)) },
	];
}

/** Home FAQ accordion items with locale text when available in translation.json. */
export function getLocalizedHomeFaqs(locale: LocaleCode): FaqItem[] {
	const t = getT(locale);
	return homeFaqs.map((item) => localizeFaq(t, item));
}

/** Full FAQ list (index + schema) with locale text when available. */
export function getLocalizedFaqs(locale: LocaleCode): FaqItem[] {
	const t = getT(locale);
	return seoFaqs.map((item) => localizeFaq(t, item));
}
