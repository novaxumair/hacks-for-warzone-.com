import type { LocaleCode } from './locales';
import { i18nContent, type PageId } from './content.generated';

export { i18nContent };
export type { PageId, PageContent, PageSection, LocaleUi } from './content.generated';

export function getLocaleContent(locale: LocaleCode) {
	return i18nContent[locale];
}

export function getPageContent(locale: LocaleCode, pageId: PageId) {
	return i18nContent[locale].pages[pageId];
}

export function getUi(locale: LocaleCode) {
	return i18nContent[locale].ui;
}
