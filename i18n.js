import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './public/locales/en/translation.json';

export const supportedLngs = [
	'en',
	'es',
	'fr',
	'de',
	'pt',
	'it',
	'nl',
	'pl',
	'ru',
	'tr',
	'ar',
	'ja',
	'ko',
	'zh',
	'hi',
	'id',
	'th',
	'vi',
	'uk',
	'cs',
	'ro',
	'sv',
];

/** Lazy locale chunks — one JSON file per language instead of one 400KB+ bundle. */
const localeModules = import.meta.glob('./public/locales/*/translation.json');

const loadedLocales = new Set(['en']);

export async function ensureLocale(locale) {
	const lng = locale?.split('-')[0] || 'en';
	if (loadedLocales.has(lng)) return lng;

	const loader = localeModules[`./public/locales/${lng}/translation.json`];
	if (!loader) return 'en';

	const mod = await loader();
	i18n.addResourceBundle(lng, 'translation', mod.default, true, true);
	loadedLocales.add(lng);
	return lng;
}

if (!i18n.isInitialized) {
	i18n
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			resources: {
				en: { translation: enTranslation },
			},
			fallbackLng: 'en',
			supportedLngs,
			nonExplicitSupportedLngs: true,
			load: 'languageOnly',
			interpolation: {
				escapeValue: false,
			},
			detection: {
				order: ['cookie', 'navigator', 'htmlTag'],
				lookupCookie: 'vc_locale',
				caches: ['cookie'],
				cookieMinutes: 525600,
				cookieOptions: { path: '/', sameSite: 'lax' },
			},
			react: {
				useSuspense: false,
			},
		});
}

export default i18n;
