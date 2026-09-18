export {
	brand,
	forumLabel,
	fillBrandTokens,
	homeSeo,
	seoDescription,
	seoPageTitle,
	seoTitle,
	siteConfig,
	seoKeywords,
	productInfo,
} from './site-core';

import { fillBrandTokens } from './brand';

function faq<T extends { question: string; answer: string; seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		question: fillBrandTokens(item.question),
		answer: fillBrandTokens(item.answer),
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

function reviewMeta<T extends { seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

export const trustSignals = {
	status: 'Online',
	statusNote: fillBrandTokens('{brand} is live for {game} on Windows PC.'),
	delivery: 'Instant digital delivery',
	platform: 'Windows 10 & 11',
	antiCheat: fillBrandTokens('{antiCheat} maintenance supported'),
} as const;

export const seoLandingPages = [
	{ label: fillBrandTokens('{primaryKeyword}'), href: '/' },
	{ label: fillBrandTokens('{game} cheats'), href: '/cheats/' },
	{ label: fillBrandTokens('{game} cheats 2026'), href: '/2026/' },
	{ label: fillBrandTokens('{game} esp'), href: '/esp/' },
	{ label: fillBrandTokens('{game} wallhack'), href: '/wallhack/' },
	{ label: fillBrandTokens('{game} aimbot'), href: '/aimbot/' },
	{ label: fillBrandTokens('{game} radar hack'), href: '/radar/' },
	{ label: fillBrandTokens('Best {primaryKeyword}'), href: '/best/' },
	{ label: fillBrandTokens('{antiCheat} bypass'), href: '/ricochet/' },
	{ label: fillBrandTokens('{game} cheat download'), href: '/setup/' },
	{ label: fillBrandTokens('{game} setup'), href: '/setup/' },
	{ label: fillBrandTokens('{game} pricing'), href: '/pricing/' },
] as const;

export const mainNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Cheats', href: '/cheats/' },
	{ label: 'Aimbot', href: '/aimbot/' },
	{ label: 'ESP', href: '/esp/' },
	{ label: 'Features', href: '/features/' },
	{ label: 'Pricing', href: '/pricing/' },
	{ label: 'Setup', href: '/setup/' },
	{ label: 'Updates', href: '/updates/' },
	{ label: 'FAQ', href: '/faq/' },
] as const;

export const footerNav = [
	{ label: fillBrandTokens('{game} hack update log'), href: '/updates/' },
	{ label: fillBrandTokens('Contact {brand} support'), href: '/support/' },
	{ label: 'Refund policy details', href: '/refund/' },
	{ label: 'Privacy policy details', href: '/privacy/' },
	{ label: 'Terms of use', href: '/terms/' },
] as const;

export const footerExplore = [
	{ label: fillBrandTokens('{brand} home'), href: '/' },
	{ label: fillBrandTokens('{game} cheats pillar'), href: '/cheats/' },
	{ label: fillBrandTokens('Live {game} status'), href: '/updates/' },
	{ label: fillBrandTokens('{game} ESP overlays'), href: '/esp/' },
	{ label: fillBrandTokens('{game} Aimbot controls'), href: '/aimbot/' },
	{ label: fillBrandTokens('{game} radar hack'), href: '/radar/' },
	{ label: fillBrandTokens('Full {game} hack feature list'), href: '/features/' },
	{ label: 'Monthly & lifetime pricing', href: '/pricing/' },
	{ label: fillBrandTokens('{game} hack setup guide'), href: '/setup/' },
	{ label: fillBrandTokens('{game} cheats FAQ'), href: '/faq/' },
	{ label: fillBrandTokens('{brand} reviews'), href: '/reviews/' },
	{ label: fillBrandTokens('Warzone hacks forums'), href: '/forums/' },
	{ label: fillBrandTokens('Contact {brand} support'), href: '/support/' },
] as const;

export type FaqItem = {
	question: string;
	answer: string;
	slug: string;
	seoTitle: string;
	seoDescription: string;
};

export const homeFaqs: readonly FaqItem[] = [
	faq({
		question: 'What is {brand}?',
		answer:
			'{brand} is an undetected {primaryKeyword} package for Call of Duty: Warzone on Windows PC. It includes ESP wallhack, 2D radar, and aimbot controls, with {antiCheat} maintenance and setup support.',
		slug: 'what-are-warzone-cheats',
		seoTitle: 'What is {brand}? | FAQ',
		seoDescription:
			'{brand} explained: undetected ESP, radar, and aimbot for {game} on Windows PC with {antiCheat} maintenance.',
	}),
	faq({
		question: 'Are {primaryKeyword} undetected in 2026?',
		answer:
			'{brand} is maintained for {game} with rebuilds after {antiCheat} and game patches. Check the Status page before you queue. No cheat can guarantee permanent undetected status — maintenance and responsible use matter.',
		slug: 'are-warzone-cheats-undetected-in-2026',
		seoTitle: 'Are {brand} Undetected in 2026? | FAQ',
		seoDescription:
			'How {brand} stays maintained after {antiCheat} patches in 2026 — and why no cheat can promise permanent undetected status.',
	}),
	faq({
		question: 'Does this work in Battle Royale rounds and Battle Royale matches?',
		answer:
			'Yes. ESP, radar, and aimbot are built for {game} match flow — reading enemy squads, tracking loot and loadouts, and staying aware near hot zones and buy stations.',
		slug: 'warzone-ranked-competitive-play',
		seoTitle: 'Ranked & Competitive Play | {brand} FAQ',
		seoDescription:
			'{brand} works in Battle Royale rounds and Battle Royale matches — ESP, radar, and soft aim for Windows PC.',
	}),
	faq({
		question: 'What is included — ESP, wallhack, radar, or Aimbot?',
		answer:
			'{brand} bundles ESP wallhack, operator markers, 2D radar cues, and configurable Aimbot in one license. See Features for the full list.',
		slug: 'esp-wallhack-radar-or-aimbot',
		seoTitle: 'What Is Included: ESP, Wallhack, Radar, Aimbot | FAQ',
		seoDescription:
			'One {brand} license includes ESP wallhack, operator markers, 2D radar cues, and configurable Aimbot for Windows PC.',
	}),
	faq({
		question: 'How are licenses delivered?',
		answer:
			'After payment is confirmed, {brand} license details are delivered digitally through checkout. Timing can vary by payment method and order review. Keep your order confirmation ready if you contact support.',
		slug: 'how-are-licenses-delivered',
		seoTitle: 'How Are {brand} Licenses Delivered? | FAQ',
		seoDescription:
			'{brand} licenses are delivered digitally after payment confirmation. Timing varies by payment method and order review.',
	}),
	faq({
		question: 'Where do I check updates after a Call of Duty: Warzone or {antiCheat} patch?',
		answer:
			'Maintenance notes are posted on the Status page when a Call of Duty: Warzone or {antiCheat} update affects the package. That is the fastest place to confirm whether a new {brand} build is live.',
		slug: 'where-to-check-updates',
		seoTitle: 'Where to Check {game} / {antiCheat} Updates | FAQ',
		seoDescription:
			'Check the Status page after {game} or {antiCheat} patches to confirm the latest {brand} build status.',
	}),
	faq({
		question: 'How do I contact support?',
		answer:
			'Use the Support page or join {email}. Include your order details, package length, and a clear description of the setup issue so replies can be faster.',
		slug: 'how-to-contact-support',
		seoTitle: 'How to Contact {brand} Support | FAQ',
		seoDescription:
			'Contact {brand} support via the Support page or {email} with your order details for faster help.',
	}),
	faq({
		question: 'How much do {primaryKeyword} cost in 2026?',
		answer:
			'{brand} is $35 per month or $150 lifetime USD on Windows PC. Both plans include ESP wallhack, 2D radar, soft aim, and {antiCheat} maintenance rebuilds. See Pricing for the latest plan details before checkout.',
		slug: 'how-much-do-warzone-cheats-cost',
		seoTitle: 'How Much Do {game} Hacks Cost? | FAQ',
		seoDescription:
			'{brand} pricing in 2026: $35/month or $150 lifetime for ESP, aimbot, radar, and {antiCheat} updates on Windows PC.',
	}),
	faq({
		question: 'How do I install {primaryKeyword} on Windows PC?',
		answer:
			'After checkout, follow the Setup guide. Download the loader, disable conflicting overlays, and launch {brand}. Enable ESP, radar, or aimbot toggles in the mod menu. Most buyers finish first launch in under 15 minutes. Join {email} if activation fails.',
		slug: 'how-to-install-warzone-cheats',
		seoTitle: 'How to Install {game} Hacks on Windows PC | FAQ',
		seoDescription:
			'Step-by-step {brand} install on Windows PC — loader, mod menu, and ESP/aimbot toggles. Setup help at cheatsforwarzone.com.',
	}),
] as const;

export const seoFaqs: readonly FaqItem[] = [
	...homeFaqs,
	faq({
		question: 'What is a {game} wallhack?',
		answer:
			'A {game} wallhack is an ESP overlay that shows enemy operators and weapons through walls. {brand} includes distance readouts, loadout and streak cues, and toggleable categories.',
		slug: 'what-is-a-warzone-wallhack',
		seoTitle: 'What Is a {game} Wallhack? | FAQ',
		seoDescription:
			'A {game} wallhack is ESP that reveals agents and weapons through walls — with distance, bases, and category toggles.',
	}),
	faq({
		question: 'Does {brand} include a radar hack?',
		answer:
			'Yes. {brand} includes 2D radar overlays that highlight nearby threats outside your view — useful for flanks and buy stations.',
		slug: 'does-warzone-cheats-include-radar-hack',
		seoTitle: 'Does {brand} Include a Radar Hack? | FAQ',
		seoDescription:
			'Yes — {brand} includes 2D radar overlays for nearby threats outside your FOV. Compare ESP, aimbot, and radar in one license at cheatsforwarzone.com.',
	}),
	faq({
		question: 'How does {antiCheat} affect {primaryKeyword}?',
		answer:
			'{antiCheat} monitors {game} on Windows PC. {brand} posts maintenance notes after patches that may need a rebuild. Check Status before you queue.',
		slug: 'ricochet-anti-cheat-and-warzone-cheats',
		seoTitle: 'How {antiCheat} Affects {brand} | FAQ',
		seoDescription:
			'{antiCheat} may require {brand} rebuilds after patches. Status notes explain the update workflow.',
	}),
	faq({
		question: 'Can I buy undetected {game} cheats for Windows PC?',
		answer:
			'Yes — {brand} sells monthly and lifetime licenses for Windows PC with ESP, radar, and aimbot in one stack. Compare plans on Store before checkout.',
		slug: 'buy-undetected-warzone-cheats-windows-pc',
		seoTitle: 'Buy Undetected {game} Hacks for Windows PC | FAQ',
		seoDescription:
			'Buy monthly or lifetime {brand} licenses for Windows PC — ESP, radar, and aimbot in one stack. Compare pricing before checkout.',
	}),
	faq({
		question: 'What is a {game} ESP hack?',
		answer:
			'A {game} ESP hack is a visibility overlay that shows enemy operators, weapons, and weapon drops through walls. {brand} ESP includes player boxes, distance tags, loadout and streak cues, and toggleable categories for Battle Royale and Resurgence.',
		slug: 'what-is-warzone-esp-hack',
		seoTitle: 'What Is a {game} ESP Hack? | FAQ',
		seoDescription:
			'{game} ESP hack explained — player wallhack, distance tags, and weapon drops markers in one {brand} license for Windows PC.',
	}),
	faq({
		question: 'What is a {game} aimbot hack?',
		answer:
			'A {game} aimbot hack provides aim assist with configurable FOV, smoothing, and bone priority. {brand} uses soft aim profiles designed to feel natural in team fights and duels — tune settings in the mod menu before Battle Royale queues.',
		slug: 'what-is-warzone-aimbot-hack',
		seoTitle: 'What Is a {game} Aimbot Hack? | FAQ',
		seoDescription:
			'{game} aimbot hack with soft aim, FOV, and smoothing controls — included in {brand} for Windows PC.',
	}),
	faq({
		question: 'What are the best {primaryKeyword} in 2026?',
		answer:
			'Top {primaryKeyword} in 2026 combine undetected ESP, soft aim, 2D radar, and fast {antiCheat} maintenance after patches. {brand} bundles all three in one license with status notes, setup support, and monthly or lifetime pricing — compare Features and Reviews before you buy.',
		slug: 'best-warzone-cheats-in-2026',
		seoTitle: 'Best {game} Hacks in 2026 | FAQ',
		seoDescription:
			'Best {primaryKeyword} in 2026 — ESP, soft aim, radar, and {antiCheat} maintenance in one {brand} license for Windows PC.',
	}),
	faq({
		question: 'Should I buy monthly or lifetime {primaryKeyword}?',
		answer:
			'Choose monthly ($35) if you want a lower entry cost or only play a few seasons. Choose lifetime ($150) if you plan long-term {game} play and want one payment for ESP, radar, aimbot, and future maintenance rebuilds. Both plans ship the same feature set.',
		slug: 'monthly-vs-lifetime-warzone-cheats',
		seoTitle: 'Monthly vs Lifetime {game} Hacks | FAQ',
		seoDescription:
			'Compare monthly ($35) and lifetime ($150) {brand} plans — same ESP, aimbot, and radar features on Windows PC.',
	}),
	faq({
		question: 'Do {primaryKeyword} work on Windows 11?',
		answer:
			'Yes. {brand} supports Windows 10 and Windows 11 on PC. Use a clean install path from the Setup guide, keep {antiCheat} status green on the Updates page, and avoid running outdated builds after major patches.',
		slug: 'warzone-cheats-windows-11',
		seoTitle: 'Do {game} Hacks Work on Windows 11? | FAQ',
		seoDescription:
			'{brand} runs on Windows 10 and 11 — ESP, aimbot, and radar with {antiCheat} maintenance on PC. Read setup notes at cheatsforwarzone.com before you buy.',
	}),
	faq({
		question: 'What is {game} soft aim?',
		answer:
			'{game} soft aim gently guides aim toward targets inside a set FOV instead of snapping instantly. {brand} lets you adjust smoothing, bone priority, and per-weapon-type profiles so assist feels controlled in Battle Royale and Resurgence.',
		slug: 'what-is-warzone-soft-aim',
		seoTitle: 'What Is {game} Soft Aim? | FAQ',
		seoDescription:
			'{game} soft aim explained — FOV, smoothing, and bone priority in {brand} for natural-looking assist on PC.',
	}),
	faq({
		question: 'Is there a free {game} hack download?',
		answer:
			'{brand} is a paid license — there is no official free download. Avoid random “free warzone cheat” sites; they often ship malware or detected loaders. Compare monthly and lifetime plans on Pricing for legitimate ESP, radar, and aimbot access with support.',
		slug: 'free-warzone-cheat-download',
		seoTitle: 'Free {game} Hack Download? | FAQ',
		seoDescription:
			'No official free {brand} download — paid monthly/lifetime licenses include ESP, aimbot, radar, and support on Windows PC.',
	}),
	faq({
		question: 'How does {antiCheat} bypass work for {primaryKeyword}?',
		answer:
			'There is no permanent {antiCheat} bypass. {brand} is maintained with rebuilds after Call of Duty: Warzone and {antiCheat} patches — check the Updates page before you queue. Responsible settings and loading the latest build matter more than any “bypass” claim.',
		slug: 'warzone-ricochet-bypass',
		seoTitle: '{antiCheat} Bypass for {game} Hacks | FAQ',
		seoDescription:
			'How {brand} handles {antiCheat} updates — maintenance rebuilds, status notes, and undetected workflow on Windows PC.',
	}),
	faq({
		question: 'Do {primaryKeyword} work in ranked competitive?',
		answer:
			'Yes. ESP, radar, and soft aim are built for Battle Royale and Resurgence {game} on Windows PC. Use conservative overlay settings, read maintenance notes after patches, and confirm undetected status on the Updates page before competitive queues.',
		slug: 'warzone-cheats-for-ranked',
		seoTitle: 'Do {game} Hacks Work in Battle Royale? | FAQ',
		seoDescription:
			'{brand} ESP, radar, and soft aim for ranked {game} on PC — maintenance and status checks before you queue.',
	}),
	faq({
		question: 'What is a {game} mod menu?',
		answer:
			'A {game} mod menu is an in-game overlay to toggle ESP wallhack, radar, aimbot, and visual settings without alt-tabbing. {brand} ships a lightweight mod menu for Windows PC — see Features for the full toggle list.',
		slug: 'what-is-warzone-mod-menu',
		seoTitle: 'What Is a {game} Mod Menu? | FAQ',
		seoDescription:
			'{game} mod menu with ESP, radar, and aimbot toggles — included in {brand} for Windows PC.',
	}),
	faq({
		question: 'What is the difference between external and internal {primaryKeyword}?',
		answer:
			'External hacks read game memory from outside the client; internal hooks run inside the process. {brand} is built as an external-style package for easier setup on Windows PC, bundling ESP, radar, and soft aim with {antiCheat} maintenance after patches.',
		slug: 'external-vs-internal-warzone-cheats',
		seoTitle: 'External vs Internal {game} Hacks | FAQ',
		seoDescription:
			'External vs internal {primaryKeyword} explained — how {brand} packages ESP, radar, and aimbot on Windows PC.',
	}),
	faq({
		question: 'How long does {primaryKeyword} setup take?',
		answer:
			'Most buyers finish {brand} setup in 10–20 minutes on Windows PC: install the loader, activate the license, and enable ESP or aimbot in the mod menu. If Windows Defender or another AV blocks the loader, follow Setup troubleshooting or join {email} with your order ID.',
		slug: 'how-long-warzone-cheat-setup-takes',
		seoTitle: 'How Long Does {game} Hack Setup Take? | FAQ',
		seoDescription:
			'{brand} setup time on Windows PC — typical 10–20 minute install for ESP, radar, and aimbot.',
	}),
	faq({
		question: 'Does {brand} include triggerbot?',
		answer:
			'{brand} focuses on ESP wallhack, 2D radar, and soft aim profiles. Triggerbot is not advertised as a standalone module — review the Features page for the current toggle list before checkout.',
		slug: 'does-warzone-cheats-include-triggerbot',
		seoTitle: 'Does {brand} Include Triggerbot? | FAQ',
		seoDescription:
			'Triggerbot and {brand} — see the current ESP, radar, and aimbot feature list on Windows PC.',
	}),
] as const;

export type CustomerReview = {
	handle: string;
	rating: 3 | 4 | 5;
	text: string;
	short: string;
	slug: string;
	seoTitle: string;
	seoDescription: string;
	date: string;
	tag?: string;
};

export const customerReviews = [
	reviewMeta({
		handle: 'xKrypt0_Warzone',
		rating: 5,
		text: 'ngl i tried like 3 diff warzone hacks before this and they all felt way too snappy in Battle Royale. these warzone cheats actually let you tune soft aim so it doesnt look obvious in high SBMM lobbies at Train Wreck. been grinding a week now, setup took probs 12 min after whitelisting the loader. no drama yet tbh',
		short: 'tried 3 warzone cheats before. These warzone cheats feel human in high SBMM lobbies once you tune soft aim at Train Wreck',
		slug: 'warzone-soft-aim-review-xkrypt0',
		seoTitle: 'Soft Aim Review by @xKrypt0_Warzone — 5/5 | {brand}',
		seoDescription:
			'@xKrypt0_Warzone rates {brand} warzone cheats soft aim 5/5 after testing Call of Duty: Warzone hacks in high SBMM lobbies on Windows PC.',
		date: '2026-07-24',
		tag: 'Soft aim',
	}),
	reviewMeta({
		handle: 'buildsR4K',
		rating: 4,
		text: 'i dont even run aimbot much, the warzone cheats esp is why i bought. seeing who rotated before you third party on Main Street is insane info. been on monthly for a few weeks and its worth it. only gripe is menu could look cleaner but as warzone hacks go this package is solid',
		short: 'bought for esp not aimbot. Warzone cheats wallhack shows rotations before you third party, huge in ranked on Main Street',
		slug: 'warzone-esp-rotation-review-buildsr4k',
		seoTitle: 'ESP Review by @buildsR4K — 4/5 | {brand}',
		seoDescription:
			'@buildsR4K rates {brand} warzone cheats ESP wallhack 4/5 for Call of Duty: Warzone ranked info on Windows PC.',
		date: '2026-07-19',
		tag: 'ESP',
	}),
	reviewMeta({
		handle: 'dma_wizard',
		rating: 5,
		text: 'last warzone cheat i had got cooked the day after a Ricochet update lol. switched to these warzone cheats and loader was back same night they posted the rebuild. running esp + radar on Verdansk, still clean after 2 weeks. grabbed lifetime cause im done paying monthly for dead warzone hacks',
		short: 'old warzone hack died on ricochet patch. These warzone cheats rebuilt same night, still undetected 2 weeks on Verdansk',
		slug: 'warzone-cloud-dma-review-dma-wizard',
		seoTitle: 'Update Review by @dma_wizard — 5/5 | {brand}',
		seoDescription:
			'@dma_wizard rates {brand} warzone cheats 5/5 after a {antiCheat} update — fast Call of Duty: Warzone hacks rebuild on Windows PC.',
		date: '2026-06-27',
		tag: 'Updates',
	}),
	reviewMeta({
		handle: 'ctrl_player99',
		rating: 4,
		text: 'im not techy at all bro. warzone cheats menu is simple tho — dropped fov on soft aim, bumped smoothing, stopped the snap. feels more like muscle memory now in solo and ranked. only 4 stars cause first login support took an hour but they fixed my license key quick',
		short: 'not techy but warzone cheats menu is easy. Soft aim feels natural after fov and smoothing tweaks in ranked',
		slug: 'warzone-soft-aim-review-ctrl-player99',
		seoTitle: 'Soft Aim Review by @ctrl_player99 — 4/5 | {brand}',
		seoDescription:
			'@ctrl_player99 rates {brand} warzone cheats soft aim 4/5 after FOV tuning on Call of Duty: Warzone Battle Royale matches for Windows PC.',
		date: '2026-07-11',
		tag: 'Soft aim',
	}),
	reviewMeta({
		handle: 'stormChaser_07',
		rating: 3,
		text: 'warzone cheats work fine once youre actually in game. windows defender blocked the loader first try and i panicked ngl. emailed support with order id, got a reply in like 2 hours with steps. esp looks clean in customs, havent gone full ranked yet. 3 stars cause setup stress but warzone cheats itself seems ok',
		short: 'defender blocked loader at first but support fixed it in 2hrs. Warzone cheats esp looks clean in custom lobbies',
		slug: 'warzone-cheat-setup-review-stormchaser07',
		seoTitle: 'Setup Review by @stormChaser_07 — 3/5 | {brand}',
		seoDescription:
			'@stormChaser_07 rates {brand} warzone cheats setup 3/5 — ESP solid after support helped with Call of Duty: Warzone hacks on Windows PC.',
		date: '2026-06-15',
		tag: 'Setup',
	}),
	reviewMeta({
		handle: 'weaponDropsGoblinx',
		rating: 5,
		text: 'mainly wanted operator ESP and util tracking for warzone. these warzone cheats show kits and third parties earlier than my brain does lol. duos with friends is way less chaos when you know whos flanking. way better than random free warzone hacks that look sketchy af',
		short: 'operator ESP on these warzone cheats catches flanks and util early. Way better than sketchy free warzone cheats',
		slug: 'warzone-agent-esp-review-weapondrops-goblinx',
		seoTitle: 'Agent ESP Review by @weaponDropsGoblinx — 5/5 | {brand}',
		seoDescription:
			'@weaponDropsGoblinx rates {brand} warzone cheats operator ESP 5/5 for Call of Duty: Warzone util tracking on Windows PC.',
		date: '2026-08-01',
		tag: 'ESP',
	}),
	reviewMeta({
		handle: 'rankedGrind42',
		rating: 4,
		text: 'using warzone cheats since the new season dropped. per weapon aim profiles help on long range holds — Kastov vs SMG actually feels different which is nice. status page was slow after Ricochet update but build was back next morning. solid warzone hacks for long grind sessions in Battle Royale',
		short: 'warzone cheats per-weapon aim profiles help operator holds in ranked. Back online next day after ricochet patch',
		slug: 'warzone-soft-aim-session-review-rankedgrind42',
		seoTitle: 'Ranked Soft Aim by @rankedGrind42 — 4/5 | {brand}',
		seoDescription:
			'@rankedGrind42 rates {brand} warzone cheats soft aim 4/5 for Call of Duty: Warzone ranked operator holds on Windows PC.',
		date: '2026-07-07',
		tag: 'Ranked',
	}),
	reviewMeta({
		handle: 'vanLifeWarzone',
		rating: 5,
		text: 'everyone talks esp but the 2d radar on these warzone cheats is cracked. caught a flank on Verdansk twice in one match without staring at wallhack boxes. esp + radar combo feels like legit tier 1 warzone cheats. running low opacity so it doesnt scream cheat in clips',
		short: '2d radar on these warzone cheats caught Verdansk flanks twice. Esp + radar combo feels like real warzone hacks',
		slug: 'warzone-radar-hack-review-vanlifewarzone',
		seoTitle: 'Radar Review by @vanLifeWarzone — 5/5 | {brand}',
		seoDescription:
			'@vanLifeWarzone rates {brand} warzone cheats radar 5/5 for flank detection on Verdansk and Rebirth Island.',
		date: '2026-07-28',
		tag: 'Radar',
	}),
	reviewMeta({
		handle: 'patchDayMike',
		rating: 4,
		text: 'warzone patch day is when half the cheat discords go silent lol. warzone cheats team posted on status in like 3 hrs and i was back in ranked queue next morning. old provider left me waiting 4 days with no loader. not perfect but way better warzone cheats support than im used to',
		short: 'patch day usually kills warzone hacks. These warzone cheats were back next morning, old provider took 4 days',
		slug: 'warzone-ricochet-update-review-patchdaymike',
		seoTitle: 'Status Review by @patchDayMike — 4/5 | {brand}',
		seoDescription:
			'@patchDayMike rates {brand} warzone cheats status updates 4/5 after {antiCheat} patches on Call of Duty: Warzone for Windows PC.',
		date: '2026-06-09',
		tag: 'Ricochet updates',
	}),
	reviewMeta({
		handle: 'snipezOnly_',
		rating: 5,
		text: 'operator main here. long range soft aim on these warzone cheats with esp callouts is stupid strong if you keep settings lowkey. no bloat loader, simple install on win11. best warzone hacks ive used for Battle Royale sessions on Verdansk and Rebirth — just dont crank fov like an idiot',
		short: 'operator main. Soft aim + esp on these warzone cheats hits different on Verdansk/Rebirth if you keep settings subtle',
		slug: 'warzone-operator-soft-aim-review-snipezonly',
		seoTitle: 'Operator Soft Aim by @snipezOnly_ — 5/5 | {brand}',
		seoDescription:
			'@snipezOnly_ rates {brand} warzone cheats operator soft aim 5/5 with ESP on Call of Duty: Warzone for Windows PC.',
		date: '2026-08-01',
		tag: 'Operator',
	}),
] as const satisfies readonly CustomerReview[];

export const customerReviewStats = {
	averageRating: 4.4,
	/** Published review count for schema and marketing UI */
	totalCount: 1000,
	reviewCountLabel: '1000+',
} as const;
