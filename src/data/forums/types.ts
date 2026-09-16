import type { LocaleCode } from '../i18n/locales';

export type ForumSection = {
	h2: string;
	paragraphs: string[];
};

export type ForumComment = {
	author: string;
	date: string;
	body: string;
	/** positive | mixed | negative */
	sentiment?: 'positive' | 'mixed' | 'negative';
};

export type ForumTranslation = {
	slug: string;
	title: string;
	metaDescription: string;
	h1: string;
	intro: string;
	keywords: string[];
	imageAlt: string;
	sections: ForumSection[];
	comments: ForumComment[];
};

export type ForumThreadDefinition = {
	id: string;
	published: string;
	updated: string;
	category: string;
	featured?: boolean;
	translations: Partial<Record<LocaleCode, ForumTranslation>> & { en: ForumTranslation };
};

export type ResolvedForumThread = ForumThreadDefinition & {
	locale: LocaleCode;
	translation: ForumTranslation;
	imageSrc: string;
	canonicalPath: string;
};
