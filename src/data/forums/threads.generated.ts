import type { ForumThreadDefinition } from './types';

const sharedComments = {
	aimbotBan: [
		{
			author: 'Derek_MW',
			date: '2026-03-02',
			body: 'Started at 8 smoothness and 90 FOV. Three weeks in Verdansk, no issues. Kept it low because I saw someone rage spinning on TikTok and yeah… that guy lasted one game.',
			sentiment: 'positive' as const,
		},
		{
			author: 'sarah_plays',
			date: '2026-03-04',
			body: 'Honest take — nothing is zero risk. I run humanized smooth at 65% and still die plenty so it looks normal. If you crank FOV to max and snap heads every fight you will get reported into oblivion.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'ghost_reaper99',
			date: '2026-03-06',
			body: 'Got clipped on killcam looking sus after I bumped smoothness down to 3. My fault, not the software. Rolled back to 11 and visibility check on — been fine since.',
			sentiment: 'negative' as const,
		},
		{
			author: 'TacticalTim',
			date: '2026-03-08',
			body: 'Chest hitbox + 75m max distance works for me in resurgence. Headshots every time reads obvious even if Ricochet misses it. Play smart.',
			sentiment: 'positive' as const,
		},
	],
	espFirst: [
		{
			author: 'loot_goblin',
			date: '2026-02-18',
			body: 'Distance + box only for the first week. Added skeleton once I knew the maps. Less clutter = easier to focus on actual gunfights.',
			sentiment: 'positive' as const,
		},
		{
			author: 'mw_casual',
			date: '2026-02-20',
			body: 'I turned on everything day one and the screen looked like a Christmas tree. Couldn\'t track anything. Nickname + box + 250m max was the sweet spot.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'ranked_grinder',
			date: '2026-02-22',
			body: 'Font size at 14, lines to bottom of screen. Works on 1080p. On 1440p had to bump to 16 or I squinted the whole match.',
			sentiment: 'positive' as const,
		},
	],
	itemsEsp: [
		{
			author: 'cash_king',
			date: '2026-02-25',
			body: 'Cash + armor + crates only. Rest off. I actually win more when I\'m not chasing every SMG bullet on the map.',
			sentiment: 'positive' as const,
		},
		{
			author: 'loadout_luke',
			date: '2026-02-27',
			body: 'Font scale 0.85 keeps tags readable without covering half the screen. Perks and missions on for contract grinding — huge time saver in Urzikstan.',
			sentiment: 'positive' as const,
		},
		{
			author: 'skeptical_sam',
			date: '2026-03-01',
			body: 'Item ESP is great but I wish grenade tags were smaller. Sometimes I miss a real player because a stim icon sits on the same pixel.',
			sentiment: 'negative' as const,
		},
	],
	combatAssist: [
		{
			author: 'controller_on_pc',
			date: '2026-03-03',
			body: 'Soft aim around 6/10 with aim lock off in gulag only. Feels like good stick aim, not a magnet. Two weeks no shadow ban.',
			sentiment: 'positive' as const,
		},
		{
			author: 'ban_worried',
			date: '2026-03-05',
			body: 'Buddy ran rage settings in ranked and ate a perm. I\'m on legit profile and still playing. Settings matter more than people admit.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'night_owl_wz',
			date: '2026-03-07',
			body: 'Humanized smoothness percent at 55. Took a day to dial in but now I don\'t even think about it mid-fight. Worth the setup time.',
			sentiment: 'positive' as const,
		},
		{
			author: 'frustrated_frank',
			date: '2026-03-09',
			body: 'Visibility check sometimes skips someone peeking a sliver. Lost a 1v1 because of it. Not a ban thing but annoying.',
			sentiment: 'negative' as const,
		},
	],
	afterPatch: [
		{
			author: 'patch_day_pete',
			date: '2026-03-11',
			body: 'Season update dropped Tuesday — waited for status page green light before launching. Loader worked first try. Always check updates before queuing.',
			sentiment: 'positive' as const,
		},
		{
			author: 'impatient_ivan',
			date: '2026-03-11',
			body: 'Jumped in 2 hours after patch, menu key stopped working. Support said wait for rebuild. Fixed next morning but lost a night.',
			sentiment: 'negative' as const,
		},
		{
			author: 'config_keeper',
			date: '2026-03-12',
			body: 'Export your config before every major patch. Mine reset once and re-typing 40 color binds was pain.',
			sentiment: 'mixed' as const,
		},
	],
	instructions: [
		{
			author: 'newbie_nick',
			date: '2026-01-15',
			body: 'Setup took me 12 mins following this thread. Disable GeForce overlay first — that was my only hiccup.',
			sentiment: 'positive' as const,
		},
		{
			author: 'veteran_v',
			date: '2026-01-18',
			body: 'Second PC, same license? Support clarified one seat per machine. Read that before buying twice like I almost did.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'linux_guy_jk',
			date: '2026-01-20',
			body: 'Windows 11 only for me. Tried on Win10 VM and got driver errors. Stick to the setup guide OS list.',
			sentiment: 'negative' as const,
		},
		{
			author: 'smooth_operator',
			date: '2026-01-22',
			body: 'Menu key bind to Insert, toggle radar on F6. Muscle memory after one session. Good write-up.',
			sentiment: 'positive' as const,
		},
	],
	features: [
		{
			author: 'esp_main',
			date: '2026-02-01',
			body: 'Bots ESP health bar saved me in resurgence — knew when to push the last bot in a squad wipe. Underrated feature.',
			sentiment: 'positive' as const,
		},
		{
			author: 'color_coder',
			date: '2026-02-03',
			body: 'Separate colors for visible vs non-visible players is clutch in gas rotations. Took 10 mins to tune but worth it.',
			sentiment: 'positive' as const,
		},
		{
			author: 'minimalist_m',
			date: '2026-02-05',
			body: 'Wish list: per-weapon aimbot profiles are good but I want a quick-switch preset hotkey. Still solid package overall.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'radar_rick',
			date: '2026-02-07',
			body: 'Radar overlay + player ESP = never surprised by third party. Best combo for trios.',
			sentiment: 'positive' as const,
		},
		{
			author: 'buyer_remit',
			date: '2026-02-09',
			body: 'Config save/load broke once after Windows update. Re-imported JSON from backup. Keep a copy locally.',
			sentiment: 'negative' as const,
		},
	],
	radarSettings: [
		{
			author: 'trios_captain',
			date: '2026-03-14',
			body: 'Closest enemy color bright cyan, visible radar dots white. Rest muted. Finally stopped staring at the minimap every 3 seconds.',
			sentiment: 'positive' as const,
		},
		{
			author: 'solo_queue_mike',
			date: '2026-03-15',
			body: 'Radar range too high and my screen looked like a star map. Cut it to 120m and only show enemies — much cleaner.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'wz_veteran_04',
			date: '2026-03-16',
			body: 'Bind toggle radar to F6. On for rotations, off when holding a building. Muscle memory took maybe two sessions.',
			sentiment: 'positive' as const,
		},
		{
			author: 'latency_lisa',
			date: '2026-03-17',
			body: 'Overlay lagged on 1440p ultrawide until I dropped radar refresh in config. Works now but took trial and error.',
			sentiment: 'negative' as const,
		},
		{
			author: 'push_plays',
			date: '2026-03-18',
			body: 'Pair radar with player ESP off during early game — hear footsteps, use radar for third party timing. Won more solos that way.',
			sentiment: 'positive' as const,
		},
		{
			author: 'map_reader_j',
			date: '2026-03-19',
			body: 'Custom enemies color red, closest yellow. Squad callouts got way faster once we synced the same palette.',
			sentiment: 'positive' as const,
		},
	],
	colorKeybinds: [
		{
			author: 'rgb_tinkerer',
			date: '2026-03-08',
			body: 'Non-visible players dark purple, visible bright green. Matches the site theme weirdly well and reads fast in gas.',
			sentiment: 'positive' as const,
		},
		{
			author: 'bind_master',
			date: '2026-03-09',
			body: 'Menu on Insert, hold primary on Mouse4, toggle items on F7. Write it on a sticky note until it sticks.',
			sentiment: 'positive' as const,
		},
		{
			author: 'colorblind_gamer',
			date: '2026-03-10',
			body: 'Default green/red was rough for me. Switched visible to cyan and hidden to orange — huge difference, wish I’d done it day one.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'streamer_wannabe',
			date: '2026-03-11',
			body: 'Spent an hour on crosshair color alone lol. Went with soft white FOV ring, magenta target line. Looks clean on clips.',
			sentiment: 'positive' as const,
		},
		{
			author: 'forgot_to_save',
			date: '2026-03-12',
			body: 'Rebound everything then crashed before saving config. Pain. Always hit Add New Config before closing the menu.',
			sentiment: 'negative' as const,
		},
	],
	configProfiles: [
		{
			author: 'resurgence_main',
			date: '2026-03-06',
			body: 'Three configs: "BR_loot", "Resurgence_fight", "Stream_minimal". Switch in lobby based on mode. Saves so much time.',
			sentiment: 'positive' as const,
		},
		{
			author: 'alt_account_dan',
			date: '2026-03-07',
			body: 'Exported JSON to desktop after a patch wiped my colors once. Two-minute backup, zero regret.',
			sentiment: 'positive' as const,
		},
		{
			author: 'trial_and_error',
			date: '2026-03-08',
			body: 'Create New Config Name is easy to miss — it’s under Config Options, not the main aimbot tab. Small UI thing but confused me.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'squad_leader_amy',
			date: '2026-03-09',
			body: 'Shared a stripped config with my duo — ESP distance only, no aimbot. They bought their own license after one night.',
			sentiment: 'positive' as const,
		},
	],
	wallhackBasics: [
		{
			author: 'confused_newbie',
			date: '2026-02-22',
			body: 'Thought wallhack meant seeing through every wall with no settings. Took me a day to realize box + skeleton IS the wallhack lol.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'honest_review_guy',
			date: '2026-02-23',
			body: 'Wallhack here is basically player ESP with visibility colors. Non-visible targets still show — that’s the whole point in trios.',
			sentiment: 'positive' as const,
		},
		{
			author: 'youtube_researcher',
			date: '2026-02-24',
			body: 'Compared to free overlays this is way more stable. Lines thickness at 1.0 stopped the flicker I got on old tools.',
			sentiment: 'positive' as const,
		},
		{
			author: 'skeptical_sue',
			date: '2026-02-25',
			body: 'Still get caught because I pre-aim corners too obviously. Software works — my gameplay gives it away sometimes.',
			sentiment: 'negative' as const,
		},
		{
			author: 'wz_plug',
			date: '2026-02-26',
			body: 'Run wallhack tags only inside 150m. Long-range boxes make you stare off crosshair. Learned that the hard way.',
			sentiment: 'positive' as const,
		},
		{
			author: 'gas_rotations',
			date: '2026-02-27',
			body: 'Custom non-visible color brighter than visible in gas zones — sounds backwards but you spot rotators faster.',
			sentiment: 'positive' as const,
		},
		{
			author: 'returning_player',
			date: '2026-02-28',
			body: 'Came back after two seasons break. Wallhack section renamed but same toggles. Thread helped me find box thickness again.',
			sentiment: 'mixed' as const,
		},
	],
	noRecoilRadar: [
		{
			author: 'spray_control_x',
			date: '2026-03-01',
			body: 'No recoil isn’t magic laser beam — it just pulls down enough that I win mid-range on AK. Still miss if I panic spray.',
			sentiment: 'positive' as const,
		},
		{
			author: 'controller_convert',
			date: '2026-03-02',
			body: 'Combined soft aim low + slight recoil tweak. Feels like a good custom sens, not obvious on killcam.',
			sentiment: 'positive' as const,
		},
		{
			author: 'ranked_anxious',
			date: '2026-03-03',
			body: 'Buddy swears by max recoil reduction. I tried it and my gun looked robotic in replay. Dialed to like 60% instead.',
			sentiment: 'mixed' as const,
		},
		{
			author: 'lmg_main',
			date: '2026-03-04',
			body: 'LMG beams in resurgence with recoil assist on. Probably the most value I get from the whole package tbh.',
			sentiment: 'positive' as const,
		},
		{
			author: 'patch_victim',
			date: '2026-03-05',
			body: 'Recoil profile reset after March patch. Had to rebuild — check updates page before complaining like I did.',
			sentiment: 'negative' as const,
		},
	],
};

export const forumThreads: ForumThreadDefinition[] = [
	{
		id: 'instructions',
		published: '2026-01-10',
		updated: '2026-03-01',
		category: 'Setup & Guides',
		featured: true,
		translations: {
			en: {
				slug: 'how-to-use-warzone-cheats',
				title: 'Instructions to Use Warzone Hacks',
				metaDescription:
					'Step-by-step instructions to install and use warzone hacks on Windows PC — loader setup, menu key binds, ESP toggles, and aimbot profiles for Call of Duty: Warzone.',
				h1: 'Instructions to Use Warzone Hacks',
				intro:
					'New to warzone hack software? This thread walks through checkout, loader install, first launch, and the key binds you need before dropping into Battle Royale or Resurgence.',
				keywords: ['warzone hack guide', 'warzone cheats instructions', 'warzone mod menu setup'],
				imageAlt: 'Warzone hacks setup guide — mod menu and ESP overlay on PC gameplay',
				sections: [
					{
						h2: 'Before you install',
						paragraphs: [
							'Use Windows 10 or 11 on a clean boot — close RGB tools, old overlay apps, and faceit-style clients that hook the game.',
							'Check the <a href="/updates/">status page</a> after any Ricochet or season patch. Launching early on patch day is how most people break configs, not how they get better lobbies.',
						],
					},
					{
						h2: 'Install steps',
						paragraphs: [
							'After purchase you receive loader access by email. Download from the link, run as administrator once, paste your license, and wait for the success toast.',
							'Launch Call of Duty: Warzone in borderless or fullscreen windowed. Open the mod menu with your menu key bind (default Insert). Enable Player ESP first, then add aimbot if you want combat assist.',
							'Save a config profile under Config Options so you do not rebuild sliders every session. See the full <a href="/features/">feature list</a> for every toggle name.',
						],
					},
					{
						h2: 'Recommended first session',
						paragraphs: [
							'Run a private match or warm-up in resurgence with only distance ESP and radar on. Add aimbot at low smoothness after you confirm FPS is stable.',
							'Need help? Open a ticket via <a href="/support/">support</a> with your order ID and a screenshot of any error code.',
						],
					},
				],
				comments: sharedComments.instructions,
			},
		},
	},
	{
		id: 'features-overview',
		published: '2026-01-20',
		updated: '2026-03-05',
		category: 'Features',
		featured: true,
		translations: {
			en: {
				slug: 'hack-features-explained',
				title: 'Warzone Hacks Features — Full Breakdown',
				metaDescription:
					'Warzone hacks features explained — aimbot sliders, player ESP, bots ESP, item loot tags, radar colors, key binds, and config profiles for PC.',
				h1: 'Warzone Hacks Features Explained',
				intro:
					'One license covers aimbot, wallhack ESP, loot ESP, radar, color customization, and config slots. Here is how each section maps to in-game use.',
				keywords: ['warzone hack features', 'warzone esp', 'warzone aimbot settings'],
				imageAlt: 'Warzone aimbot FOV circle and player ESP skeleton overlay in Battle Royale',
				sections: [
					{
						h2: 'Aimbot options',
						paragraphs: [
							'Enable aimbot, set FOV and smoothness sliders, pick hitbox, and use humanized smoothness for natural tracking. Draw FOV, crosshair, and target lines help you tune without guessing.',
							'Ignored knocked players and visibility check keep locks fair in trios. See <a href="/aimbot/">aimbot page</a> for gameplay context.',
						],
					},
					{
						h2: 'Player & bots ESP',
						paragraphs: [
							'Player ESP covers nickname, distance, box, lines, and skeleton with thickness sliders. Bots ESP adds health bars with custom positions — useful in resurgence AI waves.',
							'Wallhack-style visibility colors split seen vs hidden targets. Pair with <a href="/esp/">ESP guide</a> for ranked loadouts.',
						],
					},
					{
						h2: 'Items, radar & config',
						paragraphs: [
							'Filter assault rifle ammo, cash, armor, crates, missions, grenades, and more. Radar colors mark closest enemies and visible threats on the overlay.',
							'Custom key binds toggle players, radar, and items mid-match. Save configs under Config Options after you dial in colors.',
						],
					},
				],
				comments: sharedComments.features,
			},
		},
	},
	{
		id: 'aimbot-settings-ban',
		published: '2026-02-05',
		updated: '2026-03-10',
		category: 'Aimbot',
		featured: true,
		translations: {
			en: {
				slug: 'aimbot-settings-ban-risk',
				title: 'Aimbot Settings: What Level & Ban Risk Explained',
				metaDescription:
					'Warzone aimbot settings explained — FOV, smoothness, humanized aim, and ban risk on PC. What levels look legit vs rage in Call of Duty: Warzone.',
				h1: 'Aimbot Settings: What Level & Ban Risk Explained',
				intro:
					'There is no magic “safe” slider, but there is a huge gap between legit profiles and rage configs. This thread covers what each setting does and how reports plus Ricochet interact.',
				keywords: ['warzone aimbot settings', 'warzone aimbot ban', 'warzone soft aim'],
				imageAlt: 'Warzone aimbot FOV overlay targeting enemy through scope on PC',
				sections: [
					{
						h2: 'FOV and smoothness',
						paragraphs: [
							'Keep FOV near your actual aim cone — wide FOV snaps to targets you are not even looking at, which shows in killcams and player reports.',
							'Smoothness 8–14 with humanized smoothness around 50–70% mimics high-level controller tracking. Below 5 reads robotic on mouse.',
						],
					},
					{
						h2: 'Hitbox and visibility',
						paragraphs: [
							'Chest or upper chest reduces headshot streaks that trigger manual review clips. Head hitbox is for pub stomps only — expect reports.',
							'Visibility check stops locks through smoke and thin cover. Turn it on unless you are testing in private match.',
						],
					},
					{
						h2: 'Ban risk in plain terms',
						paragraphs: [
							'Ricochet focuses on known cheat signatures and mass reports. Low-profile settings plus normal KD spikes beat any “100% safe” marketing.',
							'After patches, rebuilds can shift behavior — re-test in resurgence before ranked. Status updates live on <a href="/updates/">updates</a>.',
						],
					},
				],
				comments: sharedComments.aimbotBan,
			},
		},
	},
	{
		id: 'player-esp-first',
		published: '2026-02-08',
		updated: '2026-03-02',
		category: 'ESP',
		translations: {
			en: {
				slug: 'player-esp-settings-first',
				title: 'Player ESP Settings: What to Enable First',
				metaDescription:
					'Best warzone ESP settings to enable first — box, skeleton, distance, and line positions for readable wallhack overlays on PC.',
				h1: 'Player ESP Settings: What to Enable First',
				intro:
					'Turning on every ESP layer day one is the most common mistake. Start minimal, add detail once you know what you actually use in fights.',
				keywords: ['warzone esp settings', 'warzone player esp', 'warzone wallhack'],
				imageAlt: 'Warzone player ESP box and distance tags through wall on Verdansk',
				sections: [
					{
						h2: 'Day one stack',
						paragraphs: [
							'Enable ESP, set max distance to 200–300m, turn on distance and box with thickness 1.2. Skip skeleton until you are comfortable.',
							'Nickname tags help in trios callouts — font size 13–15 on 1080p, bump one step on 1440p.',
						],
					},
					{
						h2: 'Lines and skeleton',
						paragraphs: [
							'Custom lines position bottom-center keeps eyes near crosshair. Skeleton thickness 0.8–1.0; thicker looks noisy in gas.',
							'Compare with <a href="/wallhack/">wallhack</a> examples before copying streamer configs — their brightness settings may not match your monitor.',
						],
					},
				],
				comments: sharedComments.espFirst,
			},
		},
	},
	{
		id: 'items-esp-config',
		published: '2026-02-12',
		updated: '2026-03-04',
		category: 'Loot ESP',
		translations: {
			en: {
				slug: 'items-esp-loot-config',
				title: 'Items ESP & Loot Tags: Recommended Configurations',
				metaDescription:
					'Warzone item ESP configurations — cash, armor, ammo, crates, and mission tags. Recommended loot ESP settings for faster loadouts on PC.',
				h1: 'Items ESP & Loot Tags: Recommended Configurations',
				intro:
					'Loot ESP saves minutes per match when tuned right and costs you wins when every bullet icon clutters the screen. Here are configs by playstyle.',
				keywords: ['warzone loot esp', 'warzone item esp', 'warzone weapon esp'],
				imageAlt: 'Warzone item ESP showing cash armor and crate tags inside building',
				sections: [
					{
						h2: 'Battle Royale farming',
						paragraphs: [
							'Enable cash, armor, crates, and assault rifle ammo. Font scale 0.8–0.9. Disable shotgun and knife tags unless you run weird off-meta.',
							'Missions and perks on for contract-heavy lobbies — pair with UAV timing from squad.',
						],
					},
					{
						h2: 'Resurgence fast loot',
						paragraphs: [
							'Smg ammo + armor + boxes only. Lower max render so tags fade outside 80m — keeps mid-fight clarity.',
							'Grenades and stim on for late-circle house clears. See <a href="/esp/">ESP page</a> for screenshot references.',
						],
					},
				],
				comments: sharedComments.itemsEsp,
			},
		},
	},
	{
		id: 'combat-assist-ban',
		published: '2026-02-15',
		updated: '2026-03-08',
		category: 'Combat Assist',
		translations: {
			en: {
				slug: 'combat-assist-settings-ban-risk',
				title: 'Combat Assist Settings: What Level & Ban Risk Explained',
				metaDescription:
					'Warzone combat assist and soft aim settings — aim lock, save target, and report risk explained for Call of Duty: Warzone on PC.',
				h1: 'Combat Assist Settings: What Level & Ban Risk Explained',
				intro:
					'Combat assist covers aim lock, save target, and humanized tracking as one system. This thread separates feel settings from report magnets.',
				keywords: ['warzone soft aim', 'warzone combat assist', 'warzone auto aim'],
				imageAlt: 'Warzone soft aim combat assist overlay during rooftop engagement',
				sections: [
					{
						h2: 'Aim lock vs save target',
						paragraphs: [
							'Aim lock holds on one enemy until death or break line — strong in gulag, obvious in open Verdansk if you never miss.',
							'Save target is softer for trios: stick to the same plate until swap. Combine with ignored knocked for cleaner finishes.',
						],
					},
					{
						h2: 'Humanized smoothness',
						paragraphs: [
							'Humanized smoothness percent adds micro-variance so tracks are not perfect Bezier curves. 45–65% is the community sweet spot.',
							'Draw target and thickness help debug — if the line jumps faster than your mouse, lower smoothness.',
						],
					},
				],
				comments: sharedComments.combatAssist,
			},
		},
	},
	{
		id: 'after-ricochet-patch',
		published: '2026-02-28',
		updated: '2026-03-12',
		category: 'Updates',
		translations: {
			en: {
				slug: 'after-ricochet-patch',
				title: 'Warzone Hacks After a Ricochet Patch — What to Do',
				metaDescription:
					'What to do after a Ricochet or Warzone patch — wait for rebuild, backup configs, and verify loader status before queuing on PC.',
				h1: 'Warzone Hacks After a Ricochet Patch — What to Do',
				intro:
					'Patch days are when most support tickets spike. Follow this checklist instead of rage-launching into ranked with a broken menu.',
				keywords: ['warzone hack update', 'ricochet patch', 'warzone cheats 2026'],
				imageAlt: 'Warzone status update after Ricochet anti-cheat patch maintenance',
				sections: [
					{
						h2: 'Immediate steps',
						paragraphs: [
							'Close the game and loader. Read <a href="/updates/">updates</a> — if status is yellow, do not queue.',
							'Export your config JSON if the menu still opens. Patches occasionally reset color binds.',
						],
					},
					{
						h2: 'After rebuild drops',
						paragraphs: [
							'Re-run loader as admin once. Test in private or resurgence before ranked.',
							'Rebind menu key if Windows update stole Insert. Full setup recap on <a href="/setup/">setup guide</a>.',
						],
					},
				],
				comments: sharedComments.afterPatch,
			},
		},
	},
	{
		id: 'radar-overlay-settings',
		published: '2026-03-13',
		updated: '2026-03-19',
		category: 'Radar',
		translations: {
			en: {
				slug: 'radar-overlay-settings',
				title: 'Radar Hack Settings: Range, Colors & Toggle Tips',
				metaDescription:
					'Warzone radar hack settings — overlay range, closest enemy colors, toggle key binds, and recommended configs for Battle Royale on PC.',
				h1: 'Radar Hack Settings: Range, Colors & Toggle Tips',
				intro:
					'The 2D radar overlay catches flanks your ESP might miss. This thread covers range sliders, color binds, and when to toggle radar off mid-fight.',
				keywords: ['warzone radar hack', 'warzone radar overlay', 'warzone player radar'],
				imageAlt: 'Warzone radar hack overlay showing enemy dots outside minimap range',
				sections: [
					{
						h2: 'Range and clutter',
						paragraphs: [
							'Start around 100–150m render range. Full-map radar looks cool in screenshots but pulls your eyes away from crosshair in close fights.',
							'Use custom closest and visible radar colors from the <a href="/features/">features page</a> — high contrast beats fancy palettes.',
						],
					},
					{
						h2: 'Key binds',
						paragraphs: [
							'Map toggle radar to a key you can hit without looking — F6 or Mouse5 works for most. Turn off during final circles if icons stack up.',
							'See <a href="/radar/">radar guide</a> for how the overlay pairs with player ESP in trios.',
						],
					},
				],
				comments: sharedComments.radarSettings,
			},
		},
	},
	{
		id: 'custom-colors-keybinds',
		published: '2026-03-07',
		updated: '2026-03-12',
		category: 'Config',
		translations: {
			en: {
				slug: 'custom-colors-and-keybinds',
				title: 'Custom Colors & Key Binds: Setup Guide',
				metaDescription:
					'Warzone hack color options and custom key binds — aimbot FOV colors, player ESP visibility, menu keys, and toggle binds on PC.',
				h1: 'Custom Colors & Key Binds: Setup Guide',
				intro:
					'Color options and key binds are what separate a readable overlay from visual noise. Here is a practical order to set them up.',
				keywords: ['warzone mod menu', 'warzone cheat settings', 'warzone esp overlay'],
				imageAlt: 'Warzone hack menu color options for ESP and aimbot overlays on PC',
				sections: [
					{
						h2: 'Color priority',
						paragraphs: [
							'Set visible vs non-visible player colors first — everything else builds on that split. Aimbot FOV ring should be subtle; target line can be brighter.',
							'Bots ESP health color last — only matters in resurgence bot waves.',
						],
					},
					{
						h2: 'Key bind layout',
						paragraphs: [
							'Menu key, hold primary, toggle players, toggle items, toggle radar — assign in one sitting and save config immediately.',
							'Full bind list lives on <a href="/features/">features</a> under Custom Key Binds.',
						],
					},
				],
				comments: sharedComments.colorKeybinds,
			},
		},
	},
	{
		id: 'config-profiles-guide',
		published: '2026-03-05',
		updated: '2026-03-09',
		category: 'Config',
		translations: {
			en: {
				slug: 'config-profiles-save-load',
				title: 'Config Profiles: Save, Load & Backup Tips',
				metaDescription:
					'Warzone hack config profiles — create new configs, save loot vs fight presets, and backup settings after Ricochet patches on PC.',
				h1: 'Config Profiles: Save, Load & Backup Tips',
				intro:
					'One license supports multiple config slots. Use separate profiles for BR loot runs, resurgence fights, and minimal overlays.',
				keywords: ['warzone cheat config', 'warzone aimbot config', 'warzone hack settings'],
				imageAlt: 'Warzone hack config save and load menu on Windows PC',
				sections: [
					{
						h2: 'Naming profiles',
						paragraphs: [
							'Use clear names: Resurgence_Combat, BR_Loot, Stream_Safe. Create New Config Name before tweaking sliders so you never overwrite a good stack.',
							'Select Your Custom Config from the dropdown in lobby — faster than rebinding mid-match.',
						],
					},
					{
						h2: 'After patches',
						paragraphs: [
							'Export or screenshot color hex values if a rebuild resets binds. Check <a href="/updates/">status</a> before loading an old profile on patch day.',
						],
					},
				],
				comments: sharedComments.configProfiles,
			},
		},
	},
	{
		id: 'wallhack-esp-basics',
		published: '2026-02-20',
		updated: '2026-02-28',
		category: 'Wallhack',
		translations: {
			en: {
				slug: 'wallhack-vs-esp-basics',
				title: 'Wallhack vs ESP: What Each Setting Does',
				metaDescription:
					'Warzone wallhack explained — player ESP boxes, skeleton, visibility colors, and how wallhack overlays work on PC in Call of Duty: Warzone.',
				h1: 'Wallhack vs ESP: What Each Setting Does',
				intro:
					'Search results mix wallhack, ESP, and player overlay into one bucket. Here is how those toggles map to what you actually see in-game.',
				keywords: ['warzone wallhack', 'warzone esp', 'warzone wall hack'],
				imageAlt: 'Warzone wallhack player box and skeleton ESP through brick wall',
				sections: [
					{
						h2: 'Same license, different labels',
						paragraphs: [
							'Player ESP with box, lines, and skeleton is the wallhack most people mean — seeing operators through geometry with distance tags.',
							'Visibility colors split targets you can shoot now vs behind cover. Pair with <a href="/esp/">ESP guide</a> for loadout-specific tips.',
						],
					},
					{
						h2: 'Readable overlays',
						paragraphs: [
							'Box thickness 1.0–1.4, skeleton optional. Max distance lower in final circles — fewer tags, clearer aim.',
							'Compare screenshots on <a href="/wallhack/">wallhack page</a> before copying someone else’s brightness stack.',
						],
					},
				],
				comments: sharedComments.wallhackBasics,
			},
		},
	},
	{
		id: 'no-recoil-settings',
		published: '2026-02-28',
		updated: '2026-03-05',
		category: 'Combat Assist',
		translations: {
			en: {
				slug: 'no-recoil-settings-guide',
				title: 'No Recoil Settings: What Works Without Looking Obvious',
				metaDescription:
					'Warzone no recoil settings — recoil control levels, weapon profiles, and what to avoid on PC so gunplay still looks natural in killcams.',
				h1: 'No Recoil Settings: What Works Without Looking Obvious',
				intro:
					'Recoil assist is not a full laser — it trims vertical kick so you can track. This thread covers sensible levels per weapon class.',
				keywords: ['warzone no recoil', 'warzone recoil control', 'warzone recoil settings'],
				imageAlt: 'Warzone no recoil assist during assault rifle fight on rooftop',
				sections: [
					{
						h2: 'By weapon type',
						paragraphs: [
							'ARs and LMGs benefit most at moderate reduction — 50–70% feels like a good mouse pad and grip, not a script.',
							'SMGs need less; pistols barely need any. Over-tuning shows in spectate when every bullet lands same pixel.',
						],
					},
					{
						h2: 'Stack with aimbot carefully',
						paragraphs: [
							'Soft aim + mild recoil is common. Max both and killcams look wrong even if reports are slow.',
							'See <a href="/aimbot/">aimbot page</a> for FOV and smoothness before you add recoil on top.',
						],
					},
				],
				comments: sharedComments.noRecoilRadar,
			},
		},
	},
];
