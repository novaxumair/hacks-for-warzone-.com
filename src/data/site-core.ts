import { brand, fillBrandTokens, seoDescription, seoTitle } from './brand';
import { globalSeoKeywords } from './seo-keywords';

/**
 * Title clamp lives here — NOT in brand.ts.
 * Brand Studio rewrites brand.ts on every save; helpers here stay stable.
 */
export function seoPageTitle(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 30) {
		text = `${text} | Warzone Hacks PC`;
	}
	/** Google SERP titles typically display ~50–60 chars; clamp at 60. */
	if (text.length <= 60) return text;
	const trimmed = text.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export { brand, fillBrandTokens, seoDescription, seoTitle };

const copyDefaults = {
	tagline: '{primaryKeyword} — ESP, aimbot, and wallhack for PC',
	summary:
		'{brand} is a {game} hack package for Windows PC. Includes ESP, aimbot, wallhack, and radar, with {antiCheat} maintenance after patches.',
	heroLede: 'ESP, aimbot, and wallhack for Call of Duty: Warzone on Windows PC.',
	forumLabel: 'Warzone Forums',
	ctaBuy: 'Buy now',
	ctaBuyShort: 'Buy',
	featuresIntro: 'Everything included in one license for {game} on Windows PC.',
	storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
	statusIntro: 'Check here after a {game} or {antiCheat} patch before you play.',
	previewIntro: 'A quick look at {brand} — ESP, aimbot, radar, and updates after patches.',
	setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
	supportIntro: 'Need help with {brand}? Join {email} with your order ID.',
	faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
	reviewsIntro:
		'Real feedback on Warzone cheats and Call of Duty: Warzone hacks — ESP, soft aim, radar, and support from {brand} buyers.',
	chipEsp: 'ESP / wallhack',
	chipAim: 'Soft aim',
	chipRadar: '2D radar',
	chipUpdates: 'Patch updates',
	navPreview: 'Preview',
	navFeatures: 'Features',
	navStore: 'Store',
	navStatus: 'Status',
	navReviews: 'Reviews',
} as const;

const seoDefaults = {
	homeTitle: 'Warzone Esp, Aimbot & Wallhack',
	homeDescription:
		'Warzone cheats with ESP, aimbot and wallhack for Battle Royale on PC. Player ESP, loot tags, soft aim, and radar with Ricochet maintenance after patches.',
	featuresTitle: 'Warzone Hacks Features | ESP, Aimbot & Wallhack',
	featuresDescription:
		'Full warzone hack feature list — aimbot sliders, player ESP, bots ESP, item ESP, radar, color options, and config profiles for PC.',
	storeTitle: 'Warzone Hacks Pricing | $35/mo or $150 Lifetime',
	storeDescription:
		'Warzone hacks — $35/month or $150 lifetime. ESP, aimbot and wallhack on PC. Same features, instant delivery.',
	statusTitle: 'Call of Duty: Warzone Status | {antiCheat} Updates',
	statusDescription:
		'Live status after {game} and {antiCheat} patches. Check ESP, aimbot and wallhack rebuilds on PC before you queue.',
	previewTitle: 'Warzone Hacks | ESP, Aimbot & Wallhack Guide',
	previewDescription:
		'Warzone hacks guide — ESP wallhack, aimbot, radar and {antiCheat} rebuilds for Battle Royale on PC. Plans from $35.',
	setupTitle: 'Warzone Hacks Setup | Windows PC Install Guide',
	setupDescription:
		'Install {brand} on PC — activate ESP, aimbot and wallhack step by step. Check {antiCheat} status before your first match.',
	supportTitle: 'Warzone Hacks Support | License & Setup Help',
	supportDescription:
		'Support for license delivery, ESP setup and billing on PC. Join {email} with your order ID.',
	faqTitle: 'Warzone Hacks FAQ | ESP, Aimbot & {antiCheat}',
	faqDescription:
		'FAQ for warzone hacks — delivery, setup, Battle Royale use, {antiCheat} updates and pricing on PC.',
	reviewsTitle: 'Warzone Hacks Reviews | ESP, Aimbot & Wallhack',
	reviewsDescription:
		'Real buyer reviews for warzone hacks — ESP, aimbot, wallhack and {antiCheat} maintenance on PC.',
	forumTitle: 'Warzone Hacks Forums | Setup, ESP & Aimbot Discussions',
	forumDescription:
		'Warzone hacks forums — setup instructions, aimbot settings, ESP configs, and post-patch checklists for PC.',
} as const;

type SeoShape = typeof seoDefaults;
type CopyShape = typeof copyDefaults;

/** Always-safe copy/seo — Brand Studio saves must never crash the site. */
const brandExtra = brand as typeof brand & { seo?: Partial<SeoShape>; copy?: Partial<CopyShape> };
export const brandSeo: SeoShape = { ...seoDefaults, ...brandExtra.seo };
export const brandCopy: CopyShape = { ...copyDefaults, ...brandExtra.copy };

/** Resolved EN home meta */
export function homeSeo() {
	return {
		title: seoPageTitle(brandSeo.homeTitle),
		description: seoDescription(brandSeo.homeDescription),
	};
}

/** Site config derived from brand — import this in layouts/components. */
export const siteConfig = {
	name: brand.name,
	url: brand.url,
	locale: brand.locale,
	market: brand.market,
	supportEmail: brand.supportEmail,
	supportUrl: brand.supportUrl,
	supportLabel: brand.supportLabel,
	logo: brand.logo,
	logoRaster: brand.logoRaster,
	logoRasterWidth: brand.logoRasterWidth,
	logoRasterHeight: brand.logoRasterHeight,
	logoAlt: brand.logoAlt,
	checkoutUrl: brand.checkoutUrl,
	gameUrl: brand.gameUrl,
	defaultOgImage: brand.defaultOgImage,
	heroImage: brand.heroImage,
	demoVideoPoster: brand.demoVideoPoster,
	demoScreenshot: brand.demoScreenshot,
	twitterSite: brand.social.twitterSite,
	socialSameAs: [...brand.social.sameAs],
} as const;

/** Prefer brand.keywords — kept for Layout meta keywords. */
export const seoKeywords = globalSeoKeywords;

/** Forum eyebrow / title suffix */
export const forumLabel = fillBrandTokens(brandCopy.forumLabel);

export const productInfo = {
	name: brand.name,
	shortName: brand.game,
	brand: brand.name,
	tagline: fillBrandTokens(brandCopy.tagline),
	summary: fillBrandTokens(brandCopy.summary),
	game: brand.game,
	delivery: 'Digital license delivery after purchase confirmation',
	platforms: [...brand.platforms],
	updateCadence: fillBrandTokens(
		'Updates are published when {game} or {antiCheat} patches need a rebuild',
	),
	supportHours: 'Support requests are reviewed daily',
	plans: brand.plans.map((p) => ({ ...p })),
	currency: brand.currency,
	heroLede: fillBrandTokens(brandCopy.heroLede),
	features: {
		aimbot: [
			'Enable Aimbot',
			'Field Of View Slider',
			'Smoothness Slider',
			'Max. Distance Slider',
			'Ignored Knocked Players',
			'Save Target',
			'Aim Lock',
			'Visibility Check',
			'Humanized Smoothness',
			'Humanized Smoothness Percent Slider',
			'Select Custom Hitbox',
			'Draw FOV',
			'Draw Crosshair',
			'Draw Target',
			'Draw Target Type',
			'Aimbot Draw Thickness Slider',
		],
		esp: [
			'Enable',
			'Max Distance Slider',
			'Font Size Slider',
			'Nickname',
			'Distance',
			'Box',
			'Box Thickness Slider',
			'Lines',
			'Lines Thickness Slider',
			'Custom Lines Position',
			'Skeleton',
			'Skeleton Thickness Slider',
		],
		bots: ['Health', 'Health Thickness Slider', 'Custom Health Position'],
		items: [
			'Font Scale Slider',
			'Assault Rifle Ammo',
			'Pistol Ammo',
			'SMG Ammo',
			'Shotgun Ammo',
			'Sniper Ammo',
			'Rocket Ammo',
			'Cash',
			'Armor',
			'Perks',
			'Crates',
			'Boxes',
			'Missions',
			'Grenades',
			'Knifes',
			'Stim',
		],
		colors: [
			'Custom Crosshair (Aimbot) Color',
			'Custom FOV (Aimbot) Color',
			'Custom Target (Aimbot) Color',
			'Custom Distance (Players) Color',
			'Custom Nickname (Players) Color',
			'Custom Non Visible (Players) Color',
			'Custom Visible (Players) Color',
			'Custom Distance (Bots) Color',
			'Custom Nickname (Bots) Color',
			'Custom Non Visible (Bots) Color',
			'Custom Visible (Bots) Color',
			'Custom Closest (Radar) Color',
			'Custom Enemies (Radar) Color',
			'Custom Visible (Radar) Color',
		],
		keybinds: [
			'Custom Menu Key Bind',
			'Custom Hold Primary Key Bind',
			'Custom Hold Secondary Key Bind',
			'Custom Hold Bots Key Bind',
			'Custom Switch To Head Key Bind',
			'Custom Toggle Key Bind',
			'Custom Toggle Players Key Bind',
			'Custom Toggle Radar Key Bind',
			'Custom Toggle Items Key Bind',
		],
		config: ['Select Your Custom Config', 'Create New Config Name', 'Add New Config'],
		general: [
			fillBrandTokens('{antiCheat} maintenance after patches'),
			'2D radar overlay',
			'Digital delivery after checkout',
		],
	},
} as const;
