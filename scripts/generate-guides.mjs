#!/usr/bin/env node
/**
 * Generates src/data/guides/guides.generated.ts — one dedicated guide per external URL.
 * Run: node scripts/generate-guides.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IGN_SOURCE_IMAGES, gameSlug, guideImagePath } from './guide-ign-images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'guides', 'guides.generated.ts');
const URL_LIST = path.join(__dirname, 'guide-urls.raw.txt');

const RAW_URLS = (await readFile(URL_LIST, 'utf8')).trim().split(/\s+/);

const ANCHOR_TEXTS = [
	'this cheat resource',
	'more cheat information',
	'additional cheat guides',
	'related cheat resources',
];

const GAME_PROFILES = {
	'ARC Raiders': {
		genre: 'extraction shooter',
		setting: 'collapsing industrial zones and rival salvage crews',
		mechanics: ['weapon drops extraction windows', 'PvPvE patrol routes', 'gear durability'],
		antiCheat: 'kernel-level anti-cheat with frequent signature sweeps',
	},
	'Genshin Impact': {
		genre: 'action RPG',
		setting: 'Teyvat open world with elemental combat puzzles',
		mechanics: ['elemental reactions', 'domain rotations', 'world boss timers'],
		antiCheat: 'server-side validation and client integrity checks',
	},
	'Dead by Daylight': {
		genre: 'asymmetric horror',
		setting: 'trial maps with generators, hooks, and chase loops',
		mechanics: ['generator pacing', 'chase mindgames', 'perk synergies'],
		antiCheat: 'Easy Anti-Cheat with post-match replay review',
	},
	'Escape from Tarkov': {
		genre: 'hardcore extraction FPS',
		setting: 'Raid maps with Scav AI, PMC squads, and high-stakes weapon drops',
		mechanics: ['ammo types and armor classes', 'insurance and hideout', 'flea market economy'],
		antiCheat: 'BattlEye with manual ban waves after patches',
	},
	Unturned: {
		genre: 'survival sandbox',
		setting: 'zombie-infested maps with base building and PvP zones',
		mechanics: ['resource farming', 'base raids', 'vehicle logistics'],
		antiCheat: 'VAC-enabled servers with admin tooling',
	},
	'War Thunder': {
		genre: 'combined-arms simulator',
		setting: 'WWII and modern vehicle battles across air, ground, and sea',
		mechanics: ['line-of-sight spotting', 'armor weak spots', 'BR matchmaking'],
		antiCheat: 'server-side ballistics with client tamper detection',
	},
	Fortnite: {
		genre: 'battle royale builder',
		setting: '100-player island drops with storm circles and build fights',
		mechanics: ['piece control', 'edit plays', 'loadout rotations'],
		antiCheat: 'Easy Anti-Cheat plus kernel driver on PC',
	},
	Marathon: {
		genre: 'extraction shooter',
		setting: 'mysterious off-world colony runs with runner classes',
		mechanics: ['runner builds', 'contract routing', 'extraction timing'],
		antiCheat: 'planned live-service anti-cheat at launch',
	},
	Battlefield: {
		genre: 'large-scale FPS',
		setting: '64v128-player zones with vehicles and destruction',
		mechanics: ['class gadgets', 'capture point flow', 'vehicle weak points'],
		antiCheat: 'Javelin anti-cheat with kernel components',
	},
	'League of Legends': {
		genre: 'MOBA',
		setting: 'Summoners Rift with five roles and objective timers',
		mechanics: ['wave management', 'vision control', 'teamfight positioning'],
		antiCheat: 'Vanguard kernel driver on PC',
	},
	Valorant: {
		genre: 'tactical FPS',
		setting: '5v5 rounds with agent abilities and spike plants',
		mechanics: ['crosshair placement', 'ability combos', 'economy rounds'],
		antiCheat: 'Vanguard kernel driver running at boot',
	},
	'Call of Duty: Warzone': {
		genre: 'battle royale',
		setting: 'Verdansk, Rebirth, and Urzikstan drops with loadout customisation',
		mechanics: ['loadout metas', 'buy stations', 'gulag resets'],
		antiCheat: 'Ricochet anti-cheat with kernel-level monitoring',
	},
	'Gray Zone Warfare': {
		genre: 'open-world tactical FPS',
		setting: 'Lamang Island with faction missions and realistic ballistics',
		mechanics: ['extraction contracts', 'NVG night raids', 'squad comms'],
		antiCheat: 'Easy Anti-Cheat with frequent integrity updates',
	},
	'Overwatch 2': {
		genre: 'agent shooter',
		setting: '5v5 role-queue matches with ultimate combos',
		mechanics: ['cooldown tracking', 'ultimate economy', 'map control'],
		antiCheat: 'Defense Matrix with machine-learning detection',
	},
	'The Isle': {
		genre: 'dinosaur survival',
		setting: 'open island growth cycles with carnivore and herbivore paths',
		mechanics: ['nest spawning', 'pack hunting', 'growth stages'],
		antiCheat: 'EAC on official servers with admin logs',
	},
	'The Finals': {
		genre: 'destruction-based FPS',
		setting: 'game-show arenas with cash-out objectives',
		mechanics: ['environmental destruction', 'team cash-outs', 'gadget combos'],
		antiCheat: 'Easy Anti-Cheat with rebuilds after patches',
	},
	DayZ: {
		genre: 'hardcore survival',
		setting: 'Chernarus wilderness with infected, players, and base raids',
		mechanics: ['infection management', 'base building', 'coastal spawns'],
		antiCheat: 'BattlEye with server-side script limits',
	},
	'Marvel Rivals': {
		genre: 'agent shooter',
		setting: 'Marvel roster 6v6 team fights with ultimate chains',
		mechanics: ['role synergy', 'ultimate combos', 'map verticality'],
		antiCheat: 'NetEase anti-cheat with kernel module',
	},
	'Mecha BREAK': {
		genre: 'mecha agent shooter',
		setting: 'stylised mech arenas with ability cooldown duels',
		mechanics: ['mech loadouts', 'dash trades', 'ultimate timing'],
		antiCheat: 'kernel anti-cheat at launch',
	},
	Rust: {
		genre: 'survival sandbox',
		setting: 'wipe cycles with monuments, raids, and helicopter events',
		mechanics: ['raid timing', 'recycler routes', 'electricity traps'],
		antiCheat: 'Easy Anti-Cheat with server-side validation',
	},
	Palworld: {
		genre: 'creature survival',
		setting: 'Palpagos Island with base building and Pal teams',
		mechanics: ['Pal breeding', 'base raids', 'dungeon clears'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'Rainbow Six Siege': {
		genre: 'tactical FPS',
		setting: 'destructible ranked sites with operator gadgets',
		mechanics: ['reinforcement setups', 'drone clears', 'clutch rounds'],
		antiCheat: 'BattlEye with replay review on reports',
	},
	Caliber: {
		genre: 'tactical third-person shooter',
		setting: 'squad-based PvPvE missions with class roles',
		mechanics: ['operator abilities', 'mission routing', 'cover trades'],
		antiCheat: 'proprietary anti-cheat with server checks',
	},
	'Hunt: Showdown': {
		genre: 'extraction bounty hunter',
		setting: 'Louisiana bayou with boss bounties and rival hunters',
		mechanics: ['sound traps', 'boss burn timing', 'extract ambushes'],
		antiCheat: 'Easy Anti-Cheat with manual review',
	},
	'Destiny 2': {
		genre: 'weapon dropser shooter MMO',
		setting: 'strikes, raids, and Crucible PvP with buildcrafting',
		mechanics: ['build synergies', 'champion mods', 'DPS phases'],
		antiCheat: 'BattlEye on PC with activity restrictions',
	},
	Squad: {
		genre: 'military tactical FPS',
		setting: '50v50 combined-arms with logistics and comms',
		mechanics: ['FOB placement', 'squad comms', 'vehicle logistics'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'Sand Raiders': {
		genre: 'action adventure',
		setting: 'desert ruins with traversal puzzles and combat arenas',
		mechanics: ['combo routes', 'gear unlocks', 'boss patterns'],
		antiCheat: 'standard PC anti-cheat at launch',
	},
	'Arena Breakout Infinite': {
		genre: 'tactical extraction FPS',
		setting: 'high-fidelity raids with gear fear and insurance',
		mechanics: ['ammo types', 'insurance returns', 'market flipping'],
		antiCheat: 'ACE anti-cheat with kernel module',
	},
	Bodycam: {
		genre: 'realistic FPS',
		setting: 'body-worn camera perspective raids with lethal TTK',
		mechanics: ['peek timing', 'room clearing', 'recoil control'],
		antiCheat: 'Easy Anti-Cheat on multiplayer',
	},
	'Once Human': {
		genre: 'survival sandbox',
		setting: 'post-apocalyptic zones with deviants and base building',
		mechanics: ['territory control', 'deviant capture', 'season wipes'],
		antiCheat: 'NetEase anti-cheat stack',
	},
	'Arma Reforger': {
		genre: 'military sandbox',
		setting: 'Cold War Everon with combined arms and Game Master',
		mechanics: ['radio comms', 'vehicle convoys', 'sector control'],
		antiCheat: 'BattlEye with mod restrictions',
	},
	Backrooms: {
		genre: 'horror exploration',
		setting: 'liminal maze levels with entity evasion',
		mechanics: ['level routing', 'entity sound cues', 'team extraction'],
		antiCheat: 'lightweight server validation',
	},
	'ARK: Survival Ascended': {
		genre: 'survival action',
		setting: 'remastered ARK island maps with cross-platform tribes',
		mechanics: ['dino taming routes', 'base raid timing', 'boss summoning'],
		antiCheat: 'BattlEye with mod restrictions on official servers',
	},
	'ARK: Survival Evolved': {
		genre: 'survival action',
		setting: 'prehistoric island maps with tribe wars and boss arenas',
		mechanics: ['taming efficiency', 'breeding lines', 'cave artifact runs'],
		antiCheat: 'BattlEye with server-side validation',
	},
	Deadside: {
		genre: 'hardcore survival shooter',
		setting: 'post-apocalyptic open world with loot routes and base raids',
		mechanics: ['loot pathing', 'base defense', 'vehicle scouting'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	'The Front': {
		genre: 'survival sandbox shooter',
		setting: 'alternate-history frontier with base building and faction wars',
		mechanics: ['base blueprints', 'faction territory', 'vehicle convoys'],
		antiCheat: 'BattlEye with periodic integrity scans',
	},
	'Lost Ark': {
		genre: 'action MMORPG',
		setting: 'Arkesia continents with raids, islands, and Guardian hunts',
		mechanics: ['class engravings', 'raid mechanics', 'island daily routes'],
		antiCheat: 'Easy Anti-Cheat with server-side checks',
	},
	Warframe: {
		genre: 'co-op looter shooter',
		setting: 'Origin System missions with Warframe builds and open worlds',
		mechanics: ['mod polarities', 'ability duration', 'steel path scaling'],
		antiCheat: 'client integrity checks with trade restrictions',
	},
	'Naraka: Bladepoint': {
		genre: 'melee battle royale',
		setting: 'Morai arenas with weapon swaps and soul jade builds',
		mechanics: ['parry timing', 'grapple mobility', 'ultimate combos'],
		antiCheat: 'NetEase anti-cheat with replay review',
	},
	Minecraft: {
		genre: 'sandbox survival',
		setting: 'procedurally generated biomes with crafting and redstone builds',
		mechanics: ['mob farms', 'enchantment setups', 'nether routing'],
		antiCheat: 'server-side plugins on multiplayer realms',
	},
	'Path of Exile': {
		genre: 'action RPG',
		setting: 'Wraeclast leagues with skill gems and atlas mapping',
		mechanics: ['passive tree paths', 'currency crafting', 'boss invulnerability phases'],
		antiCheat: 'server-authoritative combat with trade monitoring',
	},
	Raft: {
		genre: 'co-op survival',
		setting: 'open ocean raft expansion with story islands',
		mechanics: ['resource hooks', 'island routing', 'shark bait timing'],
		antiCheat: 'lightweight validation on hosted sessions',
	},
	'Sea of Thieves': {
		genre: 'shared-world adventure',
		setting: 'pirate seas with voyages, forts, and rival crews',
		mechanics: ['ship repair loops', 'chain-shot angles', 'fort key routes'],
		antiCheat: 'kernel anti-cheat with report review',
	},
	'Delta Force': {
		genre: 'tactical military FPS',
		setting: 'large-scale operations with vehicles and extraction modes',
		mechanics: ['operator gadgets', 'armored pushes', 'extraction timing'],
		antiCheat: 'ACE anti-cheat with kernel module',
	},
	'Dune: Awakening': {
		genre: 'survival MMO',
		setting: 'Arrakis deserts with spice harvesting and faction conflict',
		mechanics: ['spice refinery runs', 'still suit upkeep', 'sandworm evasion'],
		antiCheat: 'Funcom anti-cheat stack at launch',
	},
	'Wuthering Waves': {
		genre: 'action RPG',
		setting: 'Huanglong open world with echo abilities and tower climbs',
		mechanics: ['resonator synergies', 'echo farming', 'parry counters'],
		antiCheat: 'server-side validation with client checks',
	},
	'Combat Master': {
		genre: 'fast-paced FPS',
		setting: 'mobile-style arenas with slide chains and loadout perks',
		mechanics: ['movement tech', 'loadout perk stacks', 'ranked map pools'],
		antiCheat: 'Easy Anti-Cheat on PC client',
	},
	Foxhole: {
		genre: 'persistent war MMO',
		setting: 'faction-wide fronts with logistics and player-driven offensives',
		mechanics: ['logi convoys', 'refinery timing', 'hex push coordination'],
		antiCheat: 'server-side rules with admin tooling',
	},
	Exoborne: {
		genre: 'extraction shooter',
		setting: 'storm-ravaged Earth with gravity anomalies and squad extractions',
		mechanics: ['storm timing', 'gear insurance', 'vertical grapple routes'],
		antiCheat: 'planned live-service anti-cheat at launch',
	},
	'NBA 2K26': {
		genre: 'sports simulation',
		setting: 'MyCareer, Park, and competitive Pro-Am leagues',
		mechanics: ['badge builds', 'shooting tempo', 'defensive positioning'],
		antiCheat: '2K anti-cheat with online validation',
	},
	'Team Fortress 2': {
		genre: 'class-based shooter',
		setting: 'payload, control point, and Mann vs Machine modes',
		mechanics: ['class counters', 'uber timing', 'rocket jump routes'],
		antiCheat: 'VAC with community server plugins',
	},
	Enlisted: {
		genre: 'squad-based WWII shooter',
		setting: 'historical battles with infantry squads and vehicles',
		mechanics: ['squad orders', 'vehicle spawns', 'capture point flanks'],
		antiCheat: 'Easy Anti-Cheat with server checks',
	},
	SCUM: {
		genre: 'hardcore survival',
		setting: 'open-world prison island with metabolism and base raids',
		mechanics: ['metabolism tuning', 'base raid prep', 'vehicle maintenance'],
		antiCheat: 'Easy Anti-Cheat on official servers',
	},
	Grounded: {
		genre: 'co-op survival',
		setting: 'backyard scale maps with insect threats and base building',
		mechanics: ['armor tiers', 'base defense layouts', 'boss weak points'],
		antiCheat: 'Easy Anti-Cheat on multiplayer',
	},
	'Dota 2': {
		genre: 'MOBA',
		setting: 'Ancient Defense with five roles and item timings',
		mechanics: ['lane equilibrium', 'Roshan control', 'vision wards'],
		antiCheat: 'VAC with overwatch review',
	},
	'Civilization VI': {
		genre: 'turn-based strategy',
		setting: 'historical empires from ancient era to information age',
		mechanics: ['district adjacency', 'tech/civic paths', 'diplomatic victory routes'],
		antiCheat: 'server-side validation in ranked multiplayer',
	},
	'Call of Duty': {
		genre: 'arcade military FPS',
		setting: 'multiplayer playlists across modern and classic CoD maps',
		mechanics: ['loadout tuning', 'movement tech', 'scorestreak timing'],
		antiCheat: 'Ricochet anti-cheat with kernel-level monitoring',
	},
};

function normalizeUrl(raw) {
	return raw.trim().replace(/^http:/i, 'https:').replace(/\/$/, '');
}

function hostname(url) {
	return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
}

function classifyGame(host) {
	const h = host;
	if (h.includes('arkascended')) return 'ARK: Survival Ascended';
	if (h.includes('arkcheat')) return 'ARK: Survival Evolved';
	if (h.includes('arcraider')) return 'ARC Raiders';
	if (h.includes('genshin')) return 'Genshin Impact';
	if (h.includes('dbd')) return 'Dead by Daylight';
	if (h.includes('cheatsfortarkov') || h.includes('tarkov') || h.includes('eft')) return 'Escape from Tarkov';
	if (h.includes('unturned')) return 'Unturned';
	if (h.includes('warthunder')) return 'War Thunder';
	if (h.includes('fortnite') || h === 'fncheats.net' || h === 'fncheat.com') return 'Fortnite';
	if (h.includes('marathon')) return 'Marathon';
	if (h.includes('battlefield')) return 'Battlefield';
	if (h.includes('lol')) return 'League of Legends';
	if (h.includes('valorant') || h.includes('valo')) return 'Valorant';
	if (h.includes('warzone')) return 'Call of Duty: Warzone';
	if (h.includes('codhack') || h.includes('codcheat')) return 'Call of Duty';
	if (h.includes('grayzone')) return 'Gray Zone Warfare';
	if (h.includes('overwatch')) return 'Overwatch 2';
	if (h.includes('theisle') || h.includes('islecheat')) return 'The Isle';
	if (h.includes('thefinal')) return 'The Finals';
	if (h.includes('dayz')) return 'DayZ';
	if (h.includes('marvelrival') || h.includes('rivalshack') || h.includes('rivalscheat')) return 'Marvel Rivals';
	if (h.includes('mecca') || h.includes('meccha')) return 'Mecha BREAK';
	if (h.includes('rust')) return 'Rust';
	if (h.includes('palworld')) return 'Palworld';
	if (h.includes('r6') || h.includes('siege')) return 'Rainbow Six Siege';
	if (h.includes('caliber')) return 'Caliber';
	if (h.includes('hunt')) return 'Hunt: Showdown';
	if (h.includes('destiny')) return 'Destiny 2';
	if (h.includes('squad')) return 'Squad';
	if (h.includes('sandraid') || h.includes('sophie') || h === 'sandhacks.com') return 'Sand Raiders';
	if (h.includes('abi')) return 'Arena Breakout Infinite';
	if (h.includes('bodycam')) return 'Bodycam';
	if (h.includes('oncehuman')) return 'Once Human';
	if (h.includes('reforger')) return 'Arma Reforger';
	if (h.includes('backroom')) return 'Backrooms';
	if (h.includes('deadside')) return 'Deadside';
	if (h.includes('thefront')) return 'The Front';
	if (h.includes('lostark')) return 'Lost Ark';
	if (h.includes('warframe')) return 'Warframe';
	if (h.includes('naraka')) return 'Naraka: Bladepoint';
	if (h.includes('minecraft')) return 'Minecraft';
	if (h.includes('poe')) return 'Path of Exile';
	if (h.includes('raft')) return 'Raft';
	if (h.includes('seaofthieves')) return 'Sea of Thieves';
	if (h.includes('deltaforce')) return 'Delta Force';
	if (h.includes('dune')) return 'Dune: Awakening';
	if (h.includes('wuthering')) return 'Wuthering Waves';
	if (h.includes('combatmaster')) return 'Combat Master';
	if (h.includes('foxhole')) return 'Foxhole';
	if (h.includes('exoborne')) return 'Exoborne';
	if (h.includes('nba2k26')) return 'NBA 2K26';
	if (h.includes('tf2')) return 'Team Fortress 2';
	if (h.includes('enlisted')) return 'Enlisted';
	if (h.includes('scum')) return 'SCUM';
	if (h.includes('grounded')) return 'Grounded';
	if (h.includes('dota2')) return 'Dota 2';
	if (h.includes('civ6')) return 'Civilization VI';
	return 'PC Gaming';
}

function shortHostSlug(host) {
	return host
		.replace(/^www\./, '')
		.replace(/\.(com|net|org|co|xyz|io|gg|cc|uk|de|fr|es|it|pt|pl|ru|tr|nl|se|eu|info|biz|me|tv|us|ca|au|jp|kr|cn|in|br|mx|ch|at|be|nz|za|hk|sg|my|ph|id|th|vn|ua|cz|ro|sk|hu|fi|no|dk|ie|gr|il|ae|sa|pk|bd|lk|np)$/i, '')
		.replace(/\./g, '');
}

function hashString(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
	return h;
}

function pick(arr, seed) {
	return arr[seed % arr.length];
}

function buildGuide(url, index, usedSlugs) {
	const externalUrl = normalizeUrl(url);
	const host = hostname(externalUrl);
	const game = classifyGame(host);
	const profile = GAME_PROFILES[game] ?? {
		genre: 'online multiplayer',
		setting: 'competitive PC matches',
		mechanics: ['map awareness', 'loadout tuning', 'team coordination'],
		antiCheat: 'platform anti-cheat with periodic updates',
	};
	const seed = hashString(externalUrl);
	const anchorText = pick(ANCHOR_TEXTS, seed);
	let slug = shortHostSlug(host);
	if (usedSlugs.has(slug)) {
		let n = 2;
		while (usedSlugs.has(`${slug}-${n}`)) n++;
		slug = `${slug}-${n}`;
	}
	usedSlugs.add(slug);
	if (!IGN_SOURCE_IMAGES[game]) throw new Error(`Missing IGN source image for game: ${game}`);
	const imageUrl = guideImagePath(game);

	const angles = [
		'ESP and wallhack setup',
		'aimbot configuration',
		'radar overlay tuning',
		'undetected cheat selection',
		'soft aim vs hard lock',
		'menu and loader setup',
		'patch-day cheat safety',
		'ranked cheat loadouts',
	];
	const angle = pick(angles, seed);
	const mechanic = pick(profile.mechanics, seed + 3);
	const mechanic2 = pick(profile.mechanics, seed + 7);

	const title = `${game} Cheat Guide: ${angle.replace(/\b\w/g, (c) => c.toUpperCase())} (2026)`;
	const h1 = `${game} ${angle.replace(/\b\w/g, (c) => c.toUpperCase())} Cheat Guide`;
	const metaDescription = `${game} cheat guide for PC — ${angle}, ESP, aimbot, radar, and undetected setup tips for ${profile.setting}. Updated 2026.`;

	const intro = `${game} cheat users need more than a download link. This cheat guide covers ${angle} for ${profile.genre} sessions in ${profile.setting}: which features matter first, how overlays behave in live matches, and why ${mechanic} still affects whether ESP and aim assist feel useful instead of noisy.`;

	const sections = [
		{
			h2: `${game} cheat features that matter first`,
			paragraphs: [
				`Most ${game} cheat menus bundle ESP, aimbot, radar, and misc toggles. Start with player ESP and box settings before stacking extras — in ${profile.setting}, clean information beats a crowded overlay that blocks ${mechanic} reads.`,
				`Wallhack and skeleton ESP should match your FOV and resolution. Test in a private lobby or low-stakes mode first so you can tune distance filters, team checks, and visibility rules without fighting ${profile.genre} chaos on day one.`,
			],
		},
		{
			h2: `Aimbot, soft aim, and ${mechanic2}`,
			paragraphs: [
				`Aimbot strength in ${game} should respect weapon TTK and crosshair placement habits. Use smoothing, FOV caps, and bone priority so assist looks like strong aim rather than snap locks — especially when ${mechanic2} forces fast target swaps.`,
				`Pair aim settings with radar or ESP so you are not locking through walls blindly. Good ${game} cheat configs treat aimbot as confirmation after ESP gives you the angle, not as a replacement for ${mechanic}.`,
			],
		},
		{
			h2: 'Undetected use and anti-cheat context',
			paragraphs: [
				`${game} runs ${profile.antiCheat}. No cheat stays undetected forever — patch days and ban waves are normal. Avoid public menus, keep loaders updated, and do not stream or clip obvious overlay footage if account safety matters.`,
				`Use a spare account for testing new ${game} cheat builds. Kernel or external options differ by provider; read loader notes after every update and disable features that feel unstable in ${profile.setting}.`,
			],
		},
		{
			h2: 'Next steps and external cheat resources',
			paragraphs: [
				`Save one preset for ranked or high-stakes ${game} sessions and a looser preset for warmup. Change one variable at a time — ESP distance, aim smoothing, or radar scale — so you know what broke when ${profile.antiCheat} updates land.`,
				`For provider-specific downloads, pricing, and feature lists, see <a href="${externalUrl}" target="_blank" rel="noopener noreferrer">${anchorText}</a>.`,
			],
		},
	];

	const published = `2026-0${1 + (index % 8)}-${String(5 + (index % 20)).padStart(2, '0')}`;
	const updated = '2026-03-15';

	return {
		id: slug,
		slug,
		game,
		gameSlug: gameSlug(game),
		externalUrl,
		anchorText,
		published,
		updated,
		title,
		metaDescription,
		h1,
		intro,
		imageUrl,
		imageAlt: `${game} gameplay — IGN screenshot`,
		sections,
	};
}

function uniqueUrls(urls) {
	const seen = new Set();
	const out = [];
	for (const raw of urls) {
		const norm = normalizeUrl(raw);
		if (seen.has(norm)) continue;
		seen.add(norm);
		out.push(norm);
	}
	return out;
}

function serializeGuide(guide) {
	return JSON.stringify(guide, null, '\t').replace(/"([^"]+)":/g, '$1:');
}

async function main() {
	const urls = uniqueUrls(RAW_URLS);
	const expectedUnique = uniqueUrls(RAW_URLS).length;

	if (urls.length !== expectedUnique) {
		throw new Error(`URL dedupe mismatch: got ${urls.length}`);
	}

	const usedSlugs = new Set();
	const guides = urls.map((url, i) => buildGuide(url, i, usedSlugs));
	const slugs = new Set();
	const urlSet = new Set(urls);
	for (const g of guides) {
		if (slugs.has(g.slug)) throw new Error(`Duplicate slug: ${g.slug}`);
		slugs.add(g.slug);
		if (!urlSet.has(g.externalUrl)) throw new Error(`Guide URL not in input set: ${g.externalUrl}`);
	}

	const body = `/** Auto-generated by scripts/generate-guides.mjs — do not edit by hand. */\nimport type { GuideDefinition } from './types';\n\nexport const guides: GuideDefinition[] = [\n${guides.map((g) => `\t${serializeGuide(g)},`).join('\n')}\n];\n`;

	await writeFile(OUT, body, 'utf8');
	console.log(`Generated ${guides.length} guides → ${OUT}`);
	console.log(`Total provided (raw): ${RAW_URLS.length}`);
	console.log(`Unique URLs: ${urls.length}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
