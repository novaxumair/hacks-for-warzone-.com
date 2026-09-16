import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { supportedLngs } from '../../i18n.js';

type LocaleMeta = {
	code: string;
	name: string;
	nativeName: string;
	region: string;
};

type Props = {
	currentLocale: string;
	locales: LocaleMeta[];
	pageSlugs: Record<string, string>;
	defaultLocale?: string;
};

function detectPreferredLocale(locales: LocaleMeta[], defaultLocale: string): string {
	const cookie = document.cookie.match(/(?:^|;\s*)vc_locale=([^;]+)/)?.[1];
	if (cookie && locales.some((l) => l.code === cookie)) return cookie;

	const detected = i18n.services.languageDetector?.detect?.();
	const raw = Array.isArray(detected) ? detected[0] : detected;
	if (typeof raw === 'string') {
		const primary = raw.toLowerCase().split('-')[0];
		if (locales.some((l) => l.code === primary) && supportedLngs.includes(primary)) {
			return primary;
		}
	}

	const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
	for (const tag of langs) {
		const primary = tag.toLowerCase().split('-')[0];
		if (locales.some((l) => l.code === primary)) return primary;
	}
	return defaultLocale;
}

function pathForLocale(locale: string, pageSlugs: Record<string, string>) {
	const slug = pageSlugs[locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/**
 * Uses i18next-browser-languagedetector to switch visitors to their browser language
 * (redirect to the matching SEO locale URL). Soft banner if redirect was dismissed.
 */
export default function LocaleSuggest({
	currentLocale,
	locales,
	pageSlugs,
	defaultLocale = 'en',
}: Props) {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [target, setTarget] = useState<LocaleMeta | null>(null);
	const [href, setHref] = useState('');

	useEffect(() => {
		if (currentLocale !== defaultLocale) return;
		if (sessionStorage.getItem('vc_locale_dismissed')) return;

		const run = () => {
			const preferred = detectPreferredLocale(locales, defaultLocale);
			if (preferred === defaultLocale || preferred === currentLocale) return;

			const meta = locales.find((l) => l.code === preferred);
			if (!meta) return;

			const nextHref = pathForLocale(preferred, pageSlugs);

			// Banner only — never auto-redirect (protects crawl equity on EN).
			setTarget(meta);
			setHref(nextHref);
			setVisible(true);
		};

		if ('requestIdleCallback' in window) {
			const id = requestIdleCallback(run, { timeout: 3000 });
			return () => cancelIdleCallback(id);
		}
		const timer = window.setTimeout(run, 1);
		return () => window.clearTimeout(timer);
	}, [currentLocale, defaultLocale, locales, pageSlugs]);

	if (!visible || !target) return null;

	return (
		<div className="locale-suggest" role="region" aria-label={t('common.languageSuggestion')}>
			<p className="locale-suggest__text">
				{t('common.localeSuggestLead', {
					nativeName: target.nativeName,
					region: target.region,
				})}
				<a
					href={href}
					onClick={() => {
						document.cookie = `vc_locale=${target.code};path=/;max-age=31536000;SameSite=Lax`;
					}}
				>
					{t('common.localeVersion', { name: target.name })}
				</a>
			</p>
			<button
				type="button"
				className="locale-suggest__dismiss"
				aria-label={t('common.dismiss')}
				onClick={() => {
					sessionStorage.setItem('vc_locale_dismissed', '1');
					setVisible(false);
				}}
			>
				×
			</button>
		</div>
	);
}
