#!/usr/bin/env node
/**
 * Generates public/locales/{locale}/translation.json for all 22 locales.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES } from './i18n-data/constants.mjs';
import { allUiStrings } from './i18n-data/ui-strings.mjs';
import { buildLocaleOverlay } from './i18n-data/locale-overlays.mjs';
import { FAQ_I18N } from './i18n-data/faq-i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EN_FILE = path.join(ROOT, 'public', 'locales', 'en', 'translation.json');
const ES_FILE = path.join(ROOT, 'public', 'locales', 'es', 'translation.json');

function deepMerge(base, overlay) {
	const out = structuredClone(base);
	for (const [key, value] of Object.entries(overlay)) {
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			out[key] = deepMerge(out[key] ?? {}, value);
		} else if (value !== undefined) {
			out[key] = value;
		}
	}
	return out;
}

function flattenExternalResources(ext) {
	if (!ext) return {};
	const { title, lede, pillsTitle, pillsLabel, steam, patch, official, wiki, community, ...rest } = ext;
	return {
		title,
		lede,
		pillsTitle,
		pillsLabel,
		steam,
		patch,
		official,
		wiki,
		community,
		...rest,
	};
}

function buildFaqOverlay(locale, enFaq) {
	const map = FAQ_I18N[locale];
	if (!map) return {};
	return { items: map };
}

/** English FAQ seed for translation.json */
const EN_FAQ_ITEMS = {
	'what-are-warzone-cheats': {
		q: 'What is Warzone Cheats?',
		a: 'Warzone Cheats is an undetected warzone cheats package for Call of Duty: Warzone on Windows PC. It includes ESP wallhack, 2D radar, and aimbot controls, with Ricochet maintenance and setup support.',
	},
	'are-warzone-cheats-undetected-in-2026': {
		q: 'Are warzone cheats undetected in 2026?',
		a: 'Warzone Cheats is maintained for Call of Duty: Warzone with rebuilds after Ricochet and game patches. Check the Status page before you queue. No cheat can guarantee permanent undetected status — maintenance and responsible use matter.',
	},
	'solo-farmer-and-raider-sessions': {
		q: 'Does this work in Battle Royale rounds and Battle Royale matches?',
		a: 'Yes. ESP, radar, and aimbot are built for Call of Duty: Warzone match flow — reading enemy squads, tracking loot and loadouts, and staying aware near hot zones and buy stations.',
	},
	'esp-wallhack-radar-or-aimbot': {
		q: 'What is included — ESP, wallhack, radar, or Aimbot?',
		a: 'Warzone Cheats bundles ESP wallhack, operator markers, 2D radar cues, and configurable Aimbot in one license. See Features for the full list.',
	},
	'how-are-licenses-delivered': {
		q: 'How are licenses delivered?',
		a: 'After payment is confirmed, Warzone Cheats license details are delivered digitally through checkout. Timing can vary by payment method and order review. Keep your order confirmation ready if you contact support.',
	},
	'where-to-check-updates': {
		q: 'Where do I check updates after a Call of Duty: Warzone or Ricochet patch?',
		a: 'Maintenance notes are posted on the Status page when a Call of Duty: Warzone or Ricochet update affects the package. That is the fastest place to confirm whether a new Warzone Cheats build is live.',
	},
	'how-to-contact-support': {
		q: 'How do I contact support?',
		a: 'Use the Support page or email support@cheatsforwarzone.com. Include your order details, package length, and a clear description of the setup issue so replies can be faster.',
	},
	'what-is-a-warzone-wallhack': {
		q: 'What is a Call of Duty: Warzone wallhack?',
		a: 'A Call of Duty: Warzone wallhack is an ESP overlay that shows enemy operators through terrain. Warzone Cheats includes distance readouts, loadout and streak cues, and toggleable categories.',
	},
	'does-warzone-cheats-include-radar-hack': {
		q: 'Does Warzone Cheats include a radar hack?',
		a: 'Yes. Warzone Cheats includes 2D radar overlays that highlight nearby threats outside your view — useful for flanks and buy stations.',
	},
	'ricochet-anti-cheat-and-warzone-cheats': {
		q: 'How does Ricochet affect warzone cheats?',
		a: 'Ricochet monitors Call of Duty: Warzone on Windows PC. Warzone Cheats posts maintenance notes after patches that may need a rebuild. Check Status before you queue.',
	},
	'buy-undetected-warzone-cheats-windows-pc': {
		q: 'Can I buy undetected Warzone cheats for Windows PC?',
		a: 'Yes — Warzone Cheats sells monthly and lifetime licenses for Windows PC with ESP, radar, and aimbot in one stack. Compare plans on Store before checkout.',
	},
	'how-much-do-warzone-cheats-cost': {
		q: 'How much do warzone cheats cost in 2026?',
		a: 'Warzone Cheats is $35 per month or $150 lifetime USD on Windows PC. Both plans include ESP wallhack, 2D radar, soft aim, and Ricochet maintenance rebuilds. See Pricing for the latest plan details before checkout.',
	},
	'what-is-warzone-esp-hack': {
		q: 'What is a Call of Duty: Warzone ESP hack?',
		a: 'A Call of Duty: Warzone ESP hack is a visibility overlay that shows enemy operators, weapons, and weapon drops through walls. Warzone Cheats ESP includes player boxes, distance tags, loadout and streak cues, and toggleable categories for Battle Royale and Resurgence.',
	},
	'what-is-warzone-aimbot-hack': {
		q: 'What is a Call of Duty: Warzone aimbot hack?',
		a: 'A Call of Duty: Warzone aimbot hack provides aim assist with configurable FOV, smoothing, and bone priority. Warzone Cheats uses soft aim profiles designed to feel natural in team fights and duels — tune settings in the mod menu before Battle Royale queues.',
	},
	'how-to-install-warzone-cheats': {
		q: 'How do I install warzone cheats on Windows PC?',
		a: 'After checkout, follow the Setup guide: download the loader, disable conflicting overlays, launch Warzone Cheats, and enable ESP, radar, or aimbot toggles in the mod menu. Most buyers finish first launch in under 15 minutes. Email support@cheatsforwarzone.com if activation fails.',
	},
	'best-warzone-cheats-in-2026': {
		q: 'What are the best warzone cheats in 2026?',
		a: 'Top warzone cheats in 2026 combine undetected ESP, soft aim, 2D radar, and fast Ricochet maintenance after patches. Warzone Cheats bundles all three in one license with status notes, setup support, and monthly or lifetime pricing — compare Features and Reviews before you buy.',
	},
	'monthly-vs-lifetime-warzone-cheats': {
		q: 'Should I buy monthly or lifetime warzone cheats?',
		a: 'Choose monthly ($35) if you want a lower entry cost or only play a few seasons. Choose lifetime ($150) if you plan long-term Call of Duty: Warzone play and want one payment for ESP, radar, aimbot, and future maintenance rebuilds. Both plans ship the same feature set.',
	},
	'warzone-cheats-windows-11': {
		q: 'Do warzone cheats work on Windows 11?',
		a: 'Yes. Warzone Cheats supports Windows 10 and Windows 11 on PC. Use a clean install path from the Setup guide, keep Ricochet status green on the Updates page, and avoid running outdated builds after major patches.',
	},
	'what-is-warzone-soft-aim': {
		q: 'What is Call of Duty: Warzone soft aim?',
		a: 'Call of Duty: Warzone soft aim gently guides aim toward targets inside a set FOV instead of snapping instantly. Warzone Cheats lets you adjust smoothing, bone priority, and per-weapon-type profiles so assist feels controlled in Battle Royale and Resurgence.',
	},
	'free-warzone-cheat-download': {
		q: 'Is there a free Call of Duty: Warzone hack download?',
		a: 'Warzone Cheats is a paid license — there is no official free download. Avoid random “free warzone cheat” sites; they often ship malware or detected loaders. Compare monthly and lifetime plans on Pricing for legitimate ESP, radar, and aimbot access with support.',
	},
	'warzone-ricochet-bypass': {
		q: 'How does Ricochet bypass work for warzone cheats?',
		a: 'There is no permanent Ricochet bypass. Warzone Cheats is maintained with rebuilds after Call of Duty: Warzone and Ricochet patches — check the Updates page before you queue. Responsible settings and loading the latest build matter more than any “bypass” claim.',
	},
	'warzone-cheats-for-ranked': {
		q: 'Do warzone cheats work in ranked competitive?',
		a: 'Yes. ESP, radar, and soft aim are built for Battle Royale and Resurgence Call of Duty: Warzone on Windows PC. Use conservative overlay settings, read maintenance notes after patches, and confirm undetected status on the Updates page before competitive queues.',
	},
	'what-is-warzone-mod-menu': {
		q: 'What is a Call of Duty: Warzone mod menu?',
		a: 'A Call of Duty: Warzone mod menu is an in-game overlay to toggle ESP wallhack, radar, aimbot, and visual settings without alt-tabbing. Warzone Cheats ships a lightweight mod menu for Windows PC — see Features for the full toggle list.',
	},
	'external-vs-internal-warzone-cheats': {
		q: 'What is the difference between external and internal warzone cheats?',
		a: 'External hacks read game memory from outside the client; internal hooks run inside the process. Warzone Cheats is built as an external-style package for easier setup on Windows PC, bundling ESP, radar, and soft aim with Ricochet maintenance after patches.',
	},
	'how-long-warzone-cheat-setup-takes': {
		q: 'How long does warzone cheats setup take?',
		a: 'Most buyers finish Warzone Cheats setup in 10–20 minutes on Windows PC: install the loader, activate the license, and enable ESP or aimbot in the mod menu. If Windows Defender or another AV blocks the loader, follow Setup troubleshooting or email support@cheatsforwarzone.com with your order ID.',
	},
	'does-warzone-cheats-include-triggerbot': {
		q: 'Does Warzone Cheats include triggerbot?',
		a: 'Warzone Cheats focuses on ESP wallhack, 2D radar, and soft aim profiles. Triggerbot is not advertised as a standalone module — review the Features page for the current toggle list before checkout.',
	},
};

FAQ_I18N.en = EN_FAQ_ITEMS;

async function main() {
	const en = JSON.parse(await readFile(EN_FILE, 'utf8'));
	en.faq = { items: EN_FAQ_ITEMS };
	en.media = {
		demoVideoTitle: 'Warzone Cheats ESP, aimbot and radar demo',
		playVideo: 'Play video',
	};
	const enUi = allUiStrings.en;
	en.hero = {
		...enUi.hero,
		priceFrom: en.hero?.priceFrom ?? 'from',
		imageAlt: en.hero?.imageAlt ?? '{{brand}} — Call of Duty: Warzone ESP and aimbot overlay',
		chipEsp: en.hero?.chipEsp ?? 'ESP / wallhack',
		chipAim: en.hero?.chipAim ?? 'Soft aim',
		chipRadar: en.hero?.chipRadar ?? '2D radar',
		chipUpdates: en.hero?.chipUpdates ?? 'Patch updates',
	};
	en.trust = { ...enUi.trust };
	en.agent = {
		...enUi.hero,
		title: enUi.hero.title,
		priceFrom: en.hero?.priceFrom ?? 'from',
		imageAlt: en.hero?.imageAlt ?? '{{brand}} — Call of Duty: Warzone ESP and aimbot overlay',
		chipEsp: en.hero?.chipEsp ?? 'ESP / wallhack',
		chipAim: en.hero?.chipAim ?? 'Soft aim',
		chipRadar: en.hero?.chipRadar ?? '2D radar',
		chipUpdates: en.hero?.chipUpdates ?? 'Patch updates',
	};
	en.nav = { ...en.nav, ...enUi.nav, preview: enUi.nav.hacks, store: enUi.nav.pricing, status: enUi.nav.updates };
	en.externalResources = {
		title: 'Official game guides & resources',
		lede: 'We link to trusted third-party sources so you can verify patch notes, player stats, and map info outside our site.',
		pillsTitle: 'Official guides',
		pillsLabel: 'Official Call of Duty: Warzone guides',
		steam: { label: 'Call of Duty: Warzone on PC', note: 'Official store page, system requirements, and player reviews.' },
		patch: { label: 'Call of Duty: Warzone patch notes & news', note: 'Read official update posts before you change your loadout.' },
		official: { label: 'Official Call of Duty: Warzone website', note: 'Game overview from Activision.' },
		wiki: { label: 'Call of Duty: Warzone Wiki (Fandom)', note: 'Player stats, maps, and operator loadouts.' },
		community: { label: 'Call of Duty: Warzone community hub', note: 'Announcements and community discussions.' },
	};
	en.internalLinks = {
		relatedLede: 'Explore more Warzone Cheats guides — the same topics covered on other cheat sites, mapped to our canonical pages.',
		topicsTitle: 'Product guides',
		topicsLabel: 'Product topic guides',
		topicsLede: 'Jump to the main Warzone Cheats pages for ESP, aimbot, radar, setup, and status.',
		overview: 'Warzone Cheats overview',
		esp: 'ESP & wallhack',
		aimbot: 'Aimbot & soft aim',
		radar: 'Radar hack',
		features: 'Full feature list',
		pricing: 'Store & pricing',
		setup: 'Setup guide',
		status: 'Live status',
		faq: 'FAQ',
		support: 'Support',
		blog: 'Blog',
		reviews: 'Buyer reviews',
		hacks: 'Warzone Cheats pillar',
		undetected: 'Undetected status',
	};
	en.images = { ...en.images, ...enUi.images };
	en.gallery = {
		eyebrow: 'Warzone Cheats',
		title: 'Warzone Cheats gallery',
		subtitle: 'Warzone Cheats visuals — ESP, wallhack, aimbot, and radar for Call of Duty: Warzone on PC.',
		lead: 'Warzone Cheats helps you spot enemy operators, weapon drops, and high-traffic POIs with ESP, aimbot, and radar in one license.',
		highlightEspTitle: 'Warzone Cheats ESP',
		highlightEspCopy: 'See enemy operators through walls with Warzone Cheats ESP and wallhack overlays.',
		highlightRadarTitle: 'Warzone Cheats radar',
		highlightRadarCopy: 'Track nearby threats with Warzone Cheats radar before you push or rotate.',
		highlightAimbotTitle: 'Warzone Cheats aimbot',
		highlightAimbotCopy: 'Use soft aim and aimbot controls tuned for Call of Duty: Warzone matches on Windows PC.',
		updatesLabel: 'Warzone Cheats updates',
		updatesShort: 'Updates',
	};
	en.home = {
		...en.home,
		aboutTitle: 'undetected cheats for Call of Duty: Warzone',
		aboutP1:
			'Warzone Cheats is an undetected warzone cheats package for Call of Duty: Warzone on Windows PC. One license includes ESP wallhack, soft aim, and 2D radar, with Ricochet rebuilds after game patches. Check Status before you queue.',
		volumeLabel: 'Volume',
		seekLabel: 'Video progress',
		muteVideo: 'Mute video',
		unmuteVideo: 'Unmute video',
	};
	en.homeSeo = {
		...en.homeSeo,
		linkFinalsCheats: 'Warzone Cheats',
	};
	en.common = {
		...en.common,
		refundPolicy: 'Refund policy',
		guides: 'Guides',
		home: 'Home',
	};
	en.reviews = {
		...(en.reviews ?? {}),
		eyebrow: 'Warzone Cheats',
		homeTitle: 'Warzone Cheats reviews',
		subtitle: 'Recent feedback from Warzone Cheats buyers',
		buyerReviews: '{{count}} Warzone Cheats buyer reviews',
		averageAria: '{{rating}} average from {{count}} Warzone Cheats buyer reviews',
		readAll: 'Read all Warzone Cheats reviews →',
	};
	en.blog = {
		...(en.blog ?? {}),
		blogTitle: 'Warzone Cheats Blog | Guides & Patch Tips',
		blogDescription:
			'Call of Duty: Warzone guides — competitive tips, ESP, aimbot notes, loadout drop routes, and Ricochet update coverage. English blog at cheatsforwarzone.com/blog/.',
		blogH1: 'Warzone Cheats Intel',
		blogIntro:
			'Actionable Call of Duty: Warzone guides for Battle Royale and Resurgence — meta breakdowns, loadout routes, weapon tiers, and warmup routines. Pair these tips with our Warzone Cheats pages for ESP, soft aim, and radar when you need in-match tools.',
	};

	let es;
	try {
		es = JSON.parse(await readFile(ES_FILE, 'utf8'));
		es.faq = { items: FAQ_I18N.es };
		es.home = {
			...(es.home ?? {}),
			aboutTitle: 'cheats indetectables para Call of Duty: Warzone',
		};
	} catch {
		es = en;
	}

	for (const locale of LOCALES) {
		const dir = path.join(ROOT, 'public', 'locales', locale);
		await mkdir(dir, { recursive: true });

		let translation = en;
		if (locale === 'es') {
			translation = deepMerge(en, es);
		} else if (locale !== 'en') {
			const ui = allUiStrings[locale];
			const overlay = buildLocaleOverlay(locale, ui);
			const faqOverlay = buildFaqOverlay(locale);
			translation = deepMerge(en, {
				...overlay,
				externalResources: flattenExternalResources(overlay.externalResources),
				faq: faqOverlay,
			});
		}

		const ui = allUiStrings[locale];
		if (ui?.nav?.hacks) {
			translation.nav = {
				...translation.nav,
				hacks: ui.nav.hacks,
				preview: ui.nav.hacks,
			};
		}

		const out = path.join(dir, 'translation.json');
		await writeFile(out, `${JSON.stringify(translation, null, 2)}\n`, 'utf8');
		console.log('✓', out);
	}

	// Refresh canonical EN with faq/media keys
	await writeFile(EN_FILE, `${JSON.stringify(en, null, 2)}\n`, 'utf8');
	console.log(`Generated ${LOCALES.length} locale translation files.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
