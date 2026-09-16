import { siteConfig } from '../site';
import {
	defaultLocale,
	localeCodes,
	localeMap,
	type LocaleCode,
} from '../i18n/locales';
import { resolvePageContextFromPath } from '../i18n/routing';
import type { ForumThreadDefinition, ForumTranslation, ResolvedForumThread } from './types';
import { getBlogPostImageMeta, getBlogPostImageSrc, getBlogCardImageSrc } from '../page-images';
import { forumThreads as rawForumThreads } from './threads.generated';

function expandTranslations(
	translations: Partial<Record<LocaleCode, ForumTranslation>> & { en: ForumTranslation },
): Record<LocaleCode, ForumTranslation> {
	const en = translations.en;
	const full = {} as Record<LocaleCode, ForumTranslation>;
	for (const code of localeCodes) {
		full[code] = translations[code] ?? { ...en };
	}
	return full;
}

export const forumThreads: ForumThreadDefinition[] = rawForumThreads.map((thread) => ({
	...thread,
	translations: expandTranslations(
		thread.translations as Partial<Record<LocaleCode, ForumTranslation>> & { en: ForumTranslation },
	),
}));

export function getForumBasePath(locale: LocaleCode): string {
	return locale === defaultLocale ? '/forums/' : `/${locale}/forums/`;
}

export function isForumPath(pathname: string): boolean {
	const context = resolvePageContextFromPath(pathname);
	return Boolean(context.isForumIndex || context.forumSlug || context.isBlogIndex || context.blogSlug);
}

export function findThreadBySlug(slug: string, locale?: LocaleCode): ForumThreadDefinition | undefined {
	return forumThreads.find((thread) => {
		if (locale) {
			return thread.translations[locale]?.slug === slug;
		}
		return localeCodes.some((code) => thread.translations[code]?.slug === slug);
	});
}

export function getForumLocaleSwitchHref(pathname: string, targetLocale: LocaleCode): string {
	const context = resolvePageContextFromPath(pathname);

	if (context.forumSlug) {
		const thread = findThreadBySlug(context.forumSlug, context.locale) ?? findThreadBySlug(context.forumSlug);
		if (thread) {
			const translation = thread.translations[targetLocale] ?? thread.translations[defaultLocale];
			return getForumThreadPath(targetLocale, translation.slug);
		}
	}

	return getForumBasePath(targetLocale);
}

export function getForumThreadPath(locale: LocaleCode, slug: string): string {
	if (locale === defaultLocale) {
		return `/forums/${slug}/`;
	}
	return `/${locale}/forums/${slug}/`;
}

export function absoluteForumUrl(locale: LocaleCode, slug?: string): string {
	const path = slug ? getForumThreadPath(locale, slug) : getForumBasePath(locale);
	return new URL(path, siteConfig.url).href;
}

export function resolveThread(thread: ForumThreadDefinition, locale: LocaleCode): ResolvedForumThread {
	const threadIndex = forumThreads.findIndex((item) => item.id === thread.id);
	const translation = thread.translations[locale];
	const meta = getBlogPostImageMeta(threadIndex >= 0 ? threadIndex : 0);
	return {
		...thread,
		locale,
		translation: {
			...translation,
			imageAlt: translation.imageAlt || meta.alt,
		},
		imageSrc: getBlogPostImageSrc(threadIndex >= 0 ? threadIndex : 0),
		canonicalPath: getForumThreadPath(locale, translation.slug),
	};
}

export function getAllThreadsForLocale(locale: LocaleCode): ResolvedForumThread[] {
	return forumThreads
		.map((thread) => resolveThread(thread, locale))
		.sort((a, b) => (a.published < b.published ? 1 : -1));
}

export const FORUM_FEATURED_COUNT = 4;

export function getFeaturedThreads(locale: LocaleCode, limit = FORUM_FEATURED_COUNT): ResolvedForumThread[] {
	const all = getAllThreadsForLocale(locale);
	const featured = all.filter((t) => t.featured);
	return (featured.length >= limit ? featured : all).slice(0, limit);
}

export function getForumListThreads(locale: LocaleCode): ResolvedForumThread[] {
	const all = getAllThreadsForLocale(locale);
	const featuredIds = new Set(getFeaturedThreads(locale, FORUM_FEATURED_COUNT).map((thread) => thread.id));
	return all.filter((thread) => !featuredIds.has(thread.id));
}

/** Stable pseudo view counts for forum index cards (not stored in CMS). */
export function getThreadViewCount(thread: ForumThreadDefinition): number {
	let hash = 0;
	for (const char of thread.id) {
		hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
	}
	const replyBoost = (thread.translations.en?.comments.length ?? 0) * 140;
	return 3_200 + (hash % 9_800) + replyBoost;
}

export function formatForumStat(value: number): string {
	return value.toLocaleString('en-US');
}

export function getRelatedThreadsByCategory(thread: ResolvedForumThread, limit = 3): ResolvedForumThread[] {
	const all = getAllThreadsForLocale(thread.locale).filter((item) => item.id !== thread.id);
	const sameCategory = all.filter((item) => item.category === thread.category);
	const otherCategories = all.filter((item) => item.category !== thread.category);
	return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function getThreadBySlug(locale: LocaleCode, slug: string): ResolvedForumThread | undefined {
	const thread = forumThreads.find((t) => t.translations[locale]?.slug === slug);
	return thread ? resolveThread(thread, locale) : undefined;
}

export function getForumThreadHreflangAlternates(
	thread: ForumThreadDefinition,
	currentLocale: LocaleCode = defaultLocale,
) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteForumUrl(code, thread.translations[code].slug),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{
			hreflang: 'x-default' as const,
			href: absoluteForumUrl(defaultLocale, thread.translations[defaultLocale].slug),
		},
	];
}

export function getForumIndexHreflangAlternates(currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteForumUrl(code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{ hreflang: 'x-default' as const, href: absoluteForumUrl(defaultLocale) },
	];
}

export function getAllForumStaticPaths(): { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] {
	const paths: { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] = [];

	for (const locale of localeCodes) {
		for (const thread of forumThreads) {
			const slug = thread.translations[locale].slug;
			if (locale === defaultLocale) {
				paths.push({ params: { slug }, props: { locale } });
			} else {
				paths.push({ params: { lang: locale, slug }, props: { locale } });
			}
		}
	}

	return paths;
}

export function getForumSitemapEntriesForLocale(locale: LocaleCode) {
	const indexLastmod = forumThreads.reduce(
		(max, thread) => (thread.updated > max ? thread.updated : max),
		forumThreads[0]?.updated ?? new Date().toISOString().slice(0, 10),
	);

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: getForumBasePath(locale),
			lastmod: indexLastmod,
			priority: 0.92,
			changefreq: 'daily',
			images: [
				{
					url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
					title: 'Warzone Hacks Forums',
					caption: 'Community discussions about warzone hacks and ESP settings',
				},
			],
		},
	];

	for (const [index, thread] of forumThreads.entries()) {
		const t = thread.translations[locale];
		const meta = getBlogPostImageMeta(index);
		entries.push({
			path: getForumThreadPath(locale, t.slug),
			lastmod: thread.updated,
			priority: 0.9,
			changefreq: 'weekly',
			images: [
				{
					url: new URL(meta.url, siteConfig.url).href,
					title: t.title,
					caption: t.imageAlt || meta.alt,
				},
			],
		});
	}

	return entries;
}

export function getForumSitemapEntries() {
	return getForumSitemapEntriesForLocale(defaultLocale);
}

export { getBlogCardImageSrc as getForumCardImageSrc } from '../page-images';
