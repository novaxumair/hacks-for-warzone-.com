/**
 * Responsive image helpers — prefer compressed WebP for LCP and below-fold media.
 */

export interface ResponsiveWidth {
	src: string;
	width: number;
}

/** Build a srcset string from width-tagged image paths. */
export function buildSrcSet(widths: ResponsiveWidth[]): string {
	return widths.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

/** True when the filename already ends with a responsive width tag (e.g. -1870w). */
function hasWidthSuffix(name: string): boolean {
	return /-\d+w$/i.test(name);
}

/**
 * Product screenshots and reviews banner ship with -480w / -960w variants.
 * Other assets (agent banners, feature art) do not — skip srcset for those.
 */
function hasContentVariants(name: string): boolean {
	return /^(warzone-screenshot-\d{2}|reviews-banner)$/i.test(name);
}

/** Build srcset for content images that have -480w / -960w variants. */
export function contentSrcSet(baseSrc: string): string | undefined {
	const match = baseSrc.match(/^(.+\/)(.+)\.webp$/i);
	if (!match) return undefined;

	const [, dir, name] = match;
	if (hasWidthSuffix(name) || !hasContentVariants(name)) {
		return undefined;
	}

	return buildSrcSet(
		contentWidths.map((width) => ({
			src: `${dir}${name}-${width}w.webp`,
			width,
		})),
	);
}

/**
 * Homepage / banner agent — wide banner (~2.37:1); LCP uses the 1199w WebP variant.
 */
export const heroResponsive: ResponsiveWidth[] = [
	{ src: '/images/warzone-cheats-hero-480w.webp', width: 480 },
	{ src: '/images/warzone-cheats-hero-640w.webp', width: 640 },
	{ src: '/images/warzone-cheats-hero-1024w.webp', width: 1024 },
	{ src: '/images/warzone-cheats-hero-1199w.webp', width: 1199 },
];

export const heroDesktopResponsive: ResponsiveWidth[] = heroResponsive;

/** Default LCP src — full native-width WebP for retina desktops. */
export const heroSrc = '/images/warzone-cheats-hero-1199w.webp';
export const heroSrcSet = buildSrcSet(heroResponsive);
export const heroSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1199px';

/** LCP preload — same compressed WebP. */
export const heroPreloadSrc = heroSrc;
export const heroMimeType = 'image/webp';

/** Intrinsic dimensions of the default LCP asset (1199w variant). */
export const heroWidth = 1199;
export const heroHeight = 380;

/** Responsive widths for below-fold content images. */
export const contentWidths = [480, 960] as const;

/** Canonical screenshot path — responsive variants use -480w / -960w suffixes. */
export { screenshotSrc } from '../data/product-images';

export const galleryFeaturedSizes = '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 640px';
export const galleryTileSizes = '(max-width: 560px) 100vw, (max-width: 900px) 45vw, 320px';
export const productMainSizes = '(max-width: 900px) 100vw, 640px';
export const productThumbSizes = '160px';
