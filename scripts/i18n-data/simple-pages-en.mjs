/**
 * English simple-page overrides — mirrors src/data/i18n/simple-pages.ts (resolved tokens).
 * Used as canonical EN content for features, pricing, updates, hacks, warzone-esp, warzone-aimbot, radar, setup, support, faq.
 */
export const SIMPLE_PAGE_IDS = [
	'features',
	'pricing',
	'updates',
	'hacks',
	'warzone-esp',
	'warzone-aimbot',
	'radar',
	'setup',
	'support',
	'faq',
];

export const simplePagesEn = {
	features: {
		title: 'Warzone Cheats Features | ESP, Aimbot & Wallhack',
		description:
			'Full warzone cheats feature list — ESP wallhack, aimbot, triggerbot, radar and streamproof toggles for Battle Royale on PC. See every control at cheatsforwarzone.com.',
		h1: 'Warzone Cheats Features — Full Control List',
		intro: 'Everything included in one license for Call of Duty: Warzone on Windows PC — aimbot, ESP, wallhack, radar, and streamproof options.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'View store',
		ctaSecondaryHref: '/pricing/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Aimbot options',
				paragraphs: [
					'Precision aim assistance with full control over how targets are tracked in ranked and unrated matches.',
					'Toggle aimbot on or off, tune FOV and smoothness, and pick hitbox priority before you queue.',
				],
				list: [
					'Enable Aimbot',
					'Customizable FOV',
					'Draw FOV',
					'Smoothness',
					'Hitbox Selection (Head / Chest / Stomach / Pelvis)',
					'Draw Target Line',
					'Color Target Line',
				],
			},
			{
				h2: 'ESP options',
				paragraphs: [
					'See enemies through walls with skeleton, box, and snapline overlays tuned for competitive Call of Duty: Warzone.',
					'Adjust line thickness, colours, and ESP type so the overlay stays readable on every map.',
				],
				list: [
					'Enable ESP',
					'Skeleton — Normal / Outline / Glow / RGB',
					'Skeleton Line Thickness',
					'Player Name',
					'Head Circle',
					'View Line',
					'Box — Normal / Cornered / 3D',
					'Box Line Type (Full / Outline)',
					'Box Line Thickness',
					'Snapline — Top / Bottom / Middle',
					'Snapline Thickness',
					'Feet Circle',
				],
			},
			{
				h2: 'Gadget ESP options',
				paragraphs: [
					'Track utility, loadout drops, and operator loadouts through walls for better round reads.',
					'Filter gadget ESP categories so only the markers you need stay on screen.',
				],
				list: [
					'Attacker Gadgets',
					'ESP',
					'Agents',
					'Spike',
					'Skeleton',
					'Health',
					'Rank',
				],
			},
			{
				h2: 'Utility & config',
				paragraphs: [
					'Streamproof mode, config save/load, and radar overlays ship in the same license.',
					'Check Status after Ricochet patches before loading into ranked.',
				],
				list: [
					'Aimbot profiles per weapon',
					'Streamproof',
					'Save Config',
					'Load Config',
					'2D radar overlay',
					'In-client mod menu toggles',
				],
			},
			{
				h2: 'Explore related topics',
				paragraphs: [
					'Most warzone cheat sites cover ESP, aimbot, radar, setup, and status on separate pages. Use these guides next:',
					'Each guide covers one part of the match stack so you can compare controls before checkout.',
				],
				list: [
					'<a href="/warzone-esp/">Call of Duty: Warzone ESP & wallhack guide</a>',
					'<a href="/warzone-aimbot/">Call of Duty: Warzone aimbot settings</a>',
					'<a href="/warzone-radar-hack/">Call of Duty: Warzone radar hack overlay</a>',
					'<a href="/warzone-wallhack/">Call of Duty: Warzone wallhack features</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/updates/">Live status</a>',
					'<a href="/blog/">Warzone Intel blog</a>',
				],
			},
		],
	},
	pricing: {
		title: 'Warzone Cheats Pricing | $35/mo or $150',
		description:
			'Buy Warzone cheats — $35/month or $150 lifetime. ESP, aimbot & radar for Battle Royale and Resurgence on PC. Same features, instant delivery.',
		h1: 'Warzone Cheats Pricing — Monthly & Lifetime',
		intro: 'Monthly and lifetime plans with the same ESP, soft aim, and radar stack.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Setup guide',
		ctaSecondaryHref: '/setup/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'What you get',
				paragraphs: [
					'Full package access for Windows 10 / 11.',
					'Same ESP, soft aim, and radar on monthly and lifetime plans.',
				],
				list: ['ESP, aimbot, and radar', 'Patch rebuilds while active', 'Digital delivery after checkout'],
			},
			{
				h2: 'Plans',
				paragraphs: [
					'Pick monthly to try first, or lifetime for one payment.',
					'Both plans unlock the same features after checkout.',
				],
				list: ['Monthly — 30 days', 'Lifetime — one-time', 'Instant license by email'],
			},
			{
				h2: 'Before you buy',
				paragraphs: [
					'Read the refund policy if you need it. Contact support with your order ID for help.',
					'Prices are listed in USD for Windows 10 and 11 PCs worldwide.',
				],
				list: [
					'<a href="/refund-policy/">Refund policy</a>',
					'<a href="/faq/">FAQ</a>',
					'<a href="/support/">Support</a>',
				],
			},
		],
	},
	updates: {
		title: 'Call of Duty: Warzone Status | Ricochet Updates | Warzone Cheats',
		description:
			'Live status after Call of Duty: Warzone & Ricochet patches. Check undetected ESP, aimbot & radar rebuilds on PC before you queue. cheatsforwarzone.com.',
		h1: 'Status',
		intro: 'Check maintenance notes before you load in after a Call of Duty: Warzone or Ricochet patch.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Warzone Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Current status',
				paragraphs: [
					'As of 13 Aug 2026 the package is online for Call of Duty: Warzone on Windows PC. We post a new note here when a game or Ricochet patch needs a rebuild.',
					'If Status is green, you can match. If we are rebuilding, wait for the next note.',
				],
				list: [
					'Check this page before every match after a patch',
					'Monthly and lifetime licenses get rebuilds while active',
					'No cheat stays undetected forever — status first, then play',
				],
			},
			{
				h2: 'After a patch',
				paragraphs: [
					'Wait for our rebuild note, then launch. Do not play on an old build after a big update.',
					'Follow setup if something fails and email support with your order ID.',
				],
				list: ['Read the latest status note', 'Follow setup if something fails', 'Email support with your order ID'],
			},
			{
				h2: 'Important',
				paragraphs: [
					'No cheat is 100% safe forever. Stay updated and use safe settings.',
					'Check this page before every match after a patch day.',
				],
				list: ['Status first, then play', '<a href="/support/">Support</a> for license help'],
			},
		],
	},
	hacks: {
		title: 'Warzone Cheats Guide | ESP, Aimbot & Radar',
		description:
			'Warzone cheats guide — undetected ESP wallhack, soft aim, radar & Ricochet rebuilds for Battle Royale and Resurgence on PC. Buy from $35 at cheatsforwarzone.com.',
		h1: 'Warzone Cheats — Full Guide',
		intro:
			'Warzone cheats add ESP, radar, and soft aim on top of the base game. This page explains what warzone cheats are, what Warzone Cheats includes, how Ricochet maintenance works, and where to go next before you buy.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'View features',
		ctaSecondaryHref: '/features/',
		galleryTitle: 'Warzone cheats in action',
		sections: [
			{
				h2: 'What are warzone cheats?',
				paragraphs: [
					'Warzone cheats are third-party tools that give you extra information and combat assist during matches. Most players search for warzone cheats when they want player ESP, weapon drops visibility, off-screen radar, or smoother aim under pressure.',
					'Warzone Cheats bundles those tools in one license for Windows PC — no stacking separate downloads for wallhack, radar, and aimbot.',
				],
			},
			{
				h2: 'What Warzone Cheats includes',
				paragraphs: [
					'One license covers the full match stack: player ESP with distance, operator markers, 2D radar for flanks, and configurable soft aim profiles per weapon.',
					'Monthly and lifetime plans include the same feature stack with Ricochet rebuilds.',
				],
				list: [
					'ESP / wallhack with distance readouts',
					'Weapon drops and resource markers',
					'2D radar for off-screen threats',
					'Soft aim & aimbot profiles',
					'Ricochet rebuilds after patches',
				],
			},
			{
				h2: 'Module guides',
				paragraphs: [
					'Each tool has its own deep-dive page if you want details before checkout.',
					'Read ESP, aimbot, radar, and feature guides before you buy.',
				],
				list: [
					'<a href="/warzone-esp/">Call of Duty: Warzone ESP & wallhack</a>',
					'<a href="/warzone-aimbot/">Call of Duty: Warzone Aimbot & soft aim</a>',
					'<a href="/warzone-radar-hack/">Radar hack overlay</a>',
					'<a href="/features/">Full feature list</a>',
				],
			},
			{
				h2: 'Undetected status & patches',
				paragraphs: [
					'Call of Duty: Warzone uses Ricochet. No cheat stays undetected forever — maintenance after patches is what matters. Check the Status page after every Call of Duty: Warzone or Ricochet update before you load in.',
					'Read the undetected cheats guide and Ricochet maintenance notes for the full workflow.',
				],
				list: [
					'<a href="/updates/">Live status & patch notes</a>',
					'<a href="/updates/">Undetected cheats guide</a>',
					'<a href="/ricochet-bypass/">Ricochet maintenance</a>',
					'<a href="/faq/">FAQ before you buy</a>',
				],
			},
			{
				h2: 'How to get started',
				paragraphs: [
					'Pick monthly ($35) or lifetime ($150) on the store — same features on both. After checkout you receive license details by email. Follow the setup guide, then check status after major patches.',
					'Compare plans, complete setup, and bookmark support for license questions.',
				],
				list: [
					'<a href="/pricing/">Compare plans</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/support/">Contact support</a>',
				],
			},
		],
	},
	'warzone-esp': {
		title: 'Call of Duty: Warzone ESP | Wallhack & Player Boxes',
		description:
			'Call of Duty: Warzone ESP wallhack — player boxes, operator markers & distance for Battle Royale and Resurgence on PC. Bundled with aimbot & radar at cheatsforwarzone.com.',
		h1: 'Call of Duty: Warzone ESP — Player Boxes & Wallhack',
		intro: 'See players and weapon drops through walls during Call of Duty: Warzone matches. Part of the same Warzone Cheats license.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Warzone Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'ESP in match',
		sections: [
			{
				h2: 'What ESP shows',
				paragraphs: [
					'Boxes, distance, and filters for players, objects, and weapon drops.',
					'Toggle categories so only match-critical overlays stay active during rotations.',
				],
				list: ['Player ESP', 'Weapon drops markers', 'Objective and vehicle filters'],
			},
			{
				h2: 'When to use it',
				paragraphs: [
					'Clear high-traffic POIs and loadout drop routes without flooding the screen.',
					'Tune opacity and filters for arena zones, spike sectors, and high-traffic PvP areas.',
				],
				list: ['Tune opacity', 'Filter noise', 'Pair with radar'],
			},
			{
				h2: 'Next steps',
				paragraphs: [
					'ESP is included with aimbot and radar in one plan.',
					'Compare monthly and lifetime options on the store before checkout.',
				],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	},
	'warzone-aimbot': {
		title: 'Call of Duty: Warzone Aimbot | Soft Aim & FOV Settings',
		description:
			'Call of Duty: Warzone aimbot with soft aim, FOV & bone priority for ranked operator fights on PC. Undetected package with ESP & radar at cheatsforwarzone.com.',
		h1: 'Call of Duty: Warzone Aimbot — Soft Aim for Windows PC',
		intro: 'Soft aim and aim assist you can tune for Call of Duty: Warzone. Included in the same Warzone Cheats license.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Warzone Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Aimbot view',
		sections: [
			{
				h2: 'Controls',
				paragraphs: [
					'Set FOV, smoothness, and bone priority before you queue.',
					'Save per-weapon profiles for ARs, SMGs, and long-range rifles.',
				],
				list: ['Soft aim strength', 'Bone priority', 'Hotkeys mid-match'],
			},
			{
				h2: 'Play styles',
				paragraphs: [
					'Keep settings subtle for longer matches. Raise strength only when you accept more risk.',
					'Soft aim works alongside ESP and radar in the same license.',
				],
				list: ['Legit soft aim', 'Per-weapon profiles', 'Works with ESP'],
			},
			{
				h2: 'Next steps',
				paragraphs: [
					'Aimbot ships with ESP and radar in one license.',
					'Read the full feature list and compare plans on the store.',
				],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	},
	radar: {
		title: 'Call of Duty: Warzone Radar Hack | 2D Threat Map',
		description:
			'2D radar hack for flank reads in Call of Duty: Warzone Battle Royale and Resurgence on PC. Bundled with ESP wallhack & soft aim in one license at cheatsforwarzone.com.',
		h1: 'Call of Duty: Warzone Radar Hack — 2D Threat Awareness',
		intro: 'A simple 2D radar for threats outside your view. Included in the same Warzone Cheats license.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Warzone Cheats overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Radar overlay',
		sections: [
			{
				h2: 'What it shows',
				paragraphs: [
					'Nearby enemy cues with adjustable range for solo farmers and matchers.',
					'Directional threat cues for players outside your line of sight.',
				],
				list: ['Flank awareness', 'Base approaches', 'Adjustable range'],
			},
			{
				h2: 'With ESP',
				paragraphs: [
					'Use radar for threats you cannot see yet. Use ESP when you push.',
					'Radar complements ESP markers during squad pushes and zone fights.',
				],
				list: [
					'<a href="/warzone-esp/">ESP guide</a>',
					'<a href="/">Full product</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	},
	setup: {
		title: 'Warzone Cheats Setup | Windows PC Install Guide',
		description:
			'Install Warzone Cheats on PC — activate ESP, soft aim & radar step by step. Setup guide at cheatsforwarzone.com. Check Ricochet status first.',
		h1: 'Setup',
		intro: 'Install and activate your license on Windows 10 or 11 before your first match.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Check status',
		ctaSecondaryHref: '/updates/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Before you install',
				paragraphs: [
					'Buy a plan first. You get a license by email.',
					'Have your order email ready before you start installation.',
					'Warzone Cheats runs on Windows 10 or 11 (64-bit) with administrator rights for the loader. Close conflicting overlays and aim for 8 GB RAM minimum (16 GB recommended) for smooth ESP in busy competitive fights.',
				],
				list: ['Windows 10 / 11 PC', 'Disable conflicting overlays', 'Have your order email ready'],
			},
			{
				h2: 'Install steps',
				paragraphs: [
					'Run the loader as admin, paste your license, then launch Call of Duty: Warzone.',
					'Download the loader from your delivery email and follow the steps in order.',
				],
				list: ['Download the loader from your delivery email', 'Paste license key', 'Launch the game'],
			},
			{
				h2: 'If something fails',
				paragraphs: [
					'Check Status after a patch. Email support@cheatsforwarzone.com with your order ID.',
					'Include your Windows version and what you already tried for faster replies.',
				],
				list: ['<a href="/updates/">Status page</a>', '<a href="/support/">Support</a>', '<a href="/faq/">FAQ</a>'],
			},
		],
	},
	support: {
		title: 'Warzone Cheats Support | License & Setup Help',
		description:
			'Support for license delivery, ESP setup & billing on PC. Email support@cheatsforwarzone.com with your order ID. cheatsforwarzone.com/support.',
		h1: 'Support',
		intro: 'Get help with licenses, setup, and billing for Warzone Cheats on Windows PC.',
		ctaPrimary: 'Email support',
		ctaSecondary: 'FAQ',
		ctaSecondaryHref: '/faq/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'How to contact us',
				paragraphs: [
					'Email support@cheatsforwarzone.com. Include your order ID and a short note about the issue.',
					'We review support requests daily for delivery, billing, and setup issues.',
				],
				list: ['Order ID from your receipt', 'Windows version', 'What you already tried'],
			},
			{
				h2: 'Faster answers',
				paragraphs: [
					'Check FAQ and Status before you write. Many setup questions are already covered.',
					'Self-service guides often resolve activation issues faster than a new ticket. For patch timing, follow official Call of Duty: Warzone channels on Activision and the <a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer">official site</a>.',
				],
				list: ['<a href="/faq/">FAQ</a>', '<a href="/updates/">Status</a>', '<a href="/setup/">Setup</a>'],
			},
		],
	},
	faq: {
		title: 'Warzone Cheats FAQ | ESP, Aimbot & Ricochet',
		description:
			'FAQ for Warzone cheats — delivery, setup, Battle Royale and Resurgence use, Ricochet updates & pricing on PC. Answers at cheatsforwarzone.com before you buy.',
		h1: 'Warzone Cheats FAQ — Common Questions',
		intro: 'Common questions about Warzone Cheats — delivery, setup, updates, and refunds.',
		ctaPrimary: 'Get Access',
		ctaSecondary: 'Support',
		ctaSecondaryHref: '/support/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Buying & delivery',
				paragraphs: [
					'You get a digital license by email after payment.',
					'Keep your order confirmation email for support and activation.',
				],
				list: ['Instant delivery after checkout', 'Keep your order email', 'One license per purchase'],
			},
			{
				h2: 'Setup & updates',
				paragraphs: [
					'Follow Setup after you buy. Check Status after big Call of Duty: Warzone or Ricochet patches.',
					'Maintenance rebuilds publish on the Status page when patches require updates.',
				],
				list: ['<a href="/setup/">Setup guide</a>', '<a href="/updates/">Status</a>'],
			},
			{
				h2: 'Refunds',
				paragraphs: [
					'Read the refund policy before you buy if you need details.',
					'Contact support with your order ID for billing or delivery questions.',
				],
				list: ['<a href="/refund-policy/">Refund policy</a>', '<a href="/support/">Support</a>'],
			},
		],
	},
};
