import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import I18nProvider from './I18nProvider';
import LanguageSwitcher, { type LocaleMeta } from './LanguageSwitcher';
import BrandLogo from './BrandLogo';

type NavLink = {
	id: string;
	labelKey: string;
	edit?: string;
	href: string;
};

type Props = {
	locale: string;
	checkoutUrl: string;
	homeHref: string;
	logoAlt: string;
	currentPath: string;
	reviewsBasePath: string;
	locales: LocaleMeta[];
	hrefForLocale: Record<string, string>;
	links: NavLink[];
};

const icons: Record<string, string> = {
	home: 'M4.5 10.8 12 4.5l7.5 6.3V19a1 1 0 01-1 1h-4.5v-5.5H10V20H5.5a1 1 0 01-1-1v-8.2z',
	hacks:
		'M12 3.5l7.5 4.2v8.6L12 20.5l-7.5-4.2V7.7L12 3.5zm0 2.2L6.8 8.5v6.9L12 18.3l5.2-2.9V8.5L12 5.7z',
	esp: 'M12 5a7 7 0 100 14 7 7 0 000-14zm0 2.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zM12 10.2v2.4l1.8 1.1',
	pricing:
		'M7.5 7.2h9M7.5 12h9M7.5 16.8H14M5 4.8h14a1.2 1.2 0 011.2 1.2v12a1.2 1.2 0 01-1.2 1.2H5A1.2 1.2 0 013.8 18V6A1.2 1.2 0 015 4.8z',
	updates:
		'M12 4.2v3.2M12 16.6v3.2M4.2 12h3.2M16.6 12h3.2M7.1 7.1l2.3 2.3M14.6 14.6l2.3 2.3M16.9 7.1l-2.3 2.3M9.4 14.6l-2.3 2.3',
	reviews:
		'M12 4.5l1.8 4.9H19l-4.1 3.2 1.6 5L12 14.9 7.5 17.6l1.6-5L5 9.4h5.2L12 4.5z',
};

function NavbarInner({
	locale,
	checkoutUrl,
	homeHref,
	logoAlt,
	currentPath,
	reviewsBasePath,
	locales,
	hrefForLocale,
	links,
}: Props) {
	const { t } = useTranslation();
	const headerRef = useRef<HTMLElement>(null);

	const isActive = (href: string) => {
		const localeHome = `/${locale}/`;
		if (href === '/' || href === localeHome) {
			return currentPath === '/' || currentPath === localeHome;
		}
		if (href === reviewsBasePath) return currentPath === href || currentPath.startsWith(href);
		return currentPath === href || currentPath.startsWith(href);
	};

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		const onScroll = () => {
			header.classList.toggle('is-scrolled', window.scrollY > 8);
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const navLinks = useMemo(
		() =>
			links.map((item) => ({
				...item,
				label: t(item.labelKey),
				active: isActive(item.href),
			})),
		[links, t, currentPath, locale, reviewsBasePath],
	);

	const openMenuLabel = t('nav.openMenu');
	const closeMenuLabel = t('nav.closeMenu');

	return (
		<header ref={headerRef} className="site-header" data-nav>
			<div className="shell site-header__bar">
				<a href={homeHref} className="site-brand" aria-label={logoAlt}>
					<BrandLogo className="site-brand__mark" alt={logoAlt} />
				</a>

				<nav className="site-nav" aria-label={t('nav.primaryAria')}>
					{navLinks.map((item) => (
						<a key={item.id} href={item.href} className={item.active ? 'is-active' : undefined}>
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d={icons[item.id]}
									stroke="currentColor"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span data-edit={item.edit}>{item.label}</span>
						</a>
					))}
				</nav>

				<div className="site-tools">
					<div className="site-tools__lang">
						<LanguageSwitcher
							currentLocale={locale}
							locales={locales}
							hrefForLocale={hrefForLocale}
						/>
					</div>
					<a
						href={checkoutUrl}
						className="site-tools__buy"
						rel="noopener noreferrer"
						aria-label={t('cta.buyShort')}
					>
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M4.5 6.5h2.1l1.2 9.2h9.4l1.8-6.6H8.1M9.2 19.2a.9.9 0 100-1.8.9.9 0 000 1.8zm7.4 0a.9.9 0 100-1.8.9.9 0 000 1.8z"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span data-edit="ctaBuyShort">{t('cta.buyShort')}</span>
					</a>
					<button
						type="button"
						className="site-menu"
						aria-expanded="false"
						aria-controls="site-nav-panel"
						aria-label={openMenuLabel}
						data-label-open={openMenuLabel}
						data-label-close={closeMenuLabel}
					>
						<span className="site-menu__bars" aria-hidden="true">
							<span />
							<span />
							<span />
						</span>
					</button>
				</div>
			</div>

			<div className="site-panel" id="site-nav-panel">
				<div className="shell site-panel__inner">
					<nav className="site-panel__nav" aria-label={t('nav.mobileAria')}>
						{navLinks.map((item) => (
							<a
								key={item.id}
								href={item.href}
								className={item.active ? 'is-active' : undefined}
								data-nav-close
							>
								<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path
										d={icons[item.id]}
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span>{item.label}</span>
							</a>
						))}
					</nav>
					<div className="site-panel__foot">
						<div className="site-panel__lang">
							<LanguageSwitcher
								currentLocale={locale}
								locales={locales}
								hrefForLocale={hrefForLocale}
							/>
						</div>
						<a href={checkoutUrl} className="site-panel__buy" rel="noopener noreferrer" data-nav-close>
							<span data-edit="ctaBuy">{t('cta.buy')}</span>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

export default function NavbarApp(props: Props) {
	return (
		<I18nProvider locale={props.locale}>
			<NavbarInner {...props} />
		</I18nProvider>
	);
}
