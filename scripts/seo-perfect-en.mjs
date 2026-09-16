#!/usr/bin/env node
/**
 * Purge Fortnite/Warzone/BR leftovers from EN page source and regenerate i18n.
 * Run: node scripts/seo-perfect-en.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_EN = path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs');

/** @type {Array<[RegExp|string, string]>} */
const replacements = [
	// Wrong publishers in prose (EXT.finals already links to escapefromrust.com)
	['published by ${EXT.finals}', 'published by Facepunch (${EXT.finals})'],
	['from ${EXT.finals}', 'from ${EXT.finals}'],
	['via ${EXT.finals}', 'via ${EXT.finals}'],
	['belong with ${EXT.finals}', 'belong with Activision'],
	['${EXT.finals} terms', 'Activision terms'],
	['${EXT.finals} season updates', '${EXT.finals} patch cycle and map updates'],

	['PC & Controllers', 'Windows PC'],
	['PC & Controller Guide', 'Windows PC Guide'],
	['PC and controller cheats', 'Windows PC cheats'],

	// BR / Fortnite lexicon → Call of Duty: Warzone
	['vehicles, weapon drops', 'players, NPCs, weapon drops'],
	['notice vehicles before they push your position', 'spot players and NPCs before they push your angle'],
	['Player, boss, and weapon drops', 'Player, apex, and weapon drops'],
	['boss and extract awareness cues', 'apex and base awareness cues'],
	['boss threat cues', 'threat cues'],
	['bosses, and weapon drops', 'enemy players, and weapon drops'],
	['track enemy players and weapon drops', 'track enemy players and weapon drops'],
	['ARs, SMGs, and long-ranges', 'carnivores, ambush builds, and long-range species'],
	['long-range DMR fights and dorms clears', 'long-range ambush competitive fights and high-traffic zone clears'],
	['Save separate Aimbot profiles for ARs, SMGs, and long-ranges', 'Save separate Aimbot profiles for carnivores, ambush builds, and long-range species'],
	['building and rooftop fights', 'forest and monument edge ambushes'],
	['weapons, and Ricochet', 'species balance, and Ricochet'],
	['major weapon updates', 'major species balance updates'],
	['boss threat cues, weapon drops and operator markers', 'threat cues, weapon drops and resources markers'],
	['weapon drops, weapon drops, and bosses', 'weapon drops, resource nodes, and enemy players'],
	['weapons, camos, skins, or battle pass tiers', 'players, skins, or armor tiers'],
	['instant access to weapons', 'instant access to players'],
	['enemy squads, bosses, and high-value weapon drops', 'enemy squads, enemy players, and high-value weapon drops'],
	[
		'vehicle threat cues, supply-drop awareness markers, and weapon drops or chest pins so only BR-critical',
		'heli markers, match cues, and weapon drops pins so only match-critical',
	],
	['Vehicle and supply-drop threat cues', 'Heli and base awareness cues'],
	['vehicle and supply-drop threat cues', 'boss and extract awareness cues'],
	['weapon drops or chest pins', 'weapon drops and weapon drops pins'],
	['Weapon drops and chest markers', 'Weapon drops and operator markers'],
	['weapon drops and chest markers', 'weapon drops and operator markers'],
	['chests worth the detour', 'high-value round win worth the push'],
	['vehicles, and chests', 'bosses, and weapon drops'],
	['weapon drops, vehicles, and chests', 'weapon drops, bosses, and weapon drops'],
	['players, weapon drops, and vehicles', 'players, NPCs, and weapon drops'],
	['players, weapon drops, vehicles', 'players, NPCs, weapon drops'],
	['vehicle threat cues', 'boss threat cues'],
	['vehicle pushes', 'flank pushes'],
	['track vehicles and chests', 'track enemy players and weapon drops'],
	['full BR loop', 'full match loop'],
	['BR rotations', 'map rotations'],
	['BR-critical', 'session-critical'],
	['endgame circles', 'buy stations'],
	['final circles', 'late-session bases'],
	['final-circle scrims', 'extract camp fights'],
	['before your first ranked block', 'before your first match'],
	['before ranked', 'before you queue'],
	['reboot rounds', 'close-range squad fights'],
	['Battle Pass', 'patch cycle progression'],
	[
		'long-range AR beams and close-quarters room clears without reopening menus every spawn',
		'long-range DMR fights and dorms clears without reopening menus every match',
	],
	['assault rifles, SMGs, and snipers', 'ARs, SMGs, and long-ranges'],
	['AR / SMG / sniper', 'AR / SMG / long-range'],
	['players, weapon drops, and vehicles', 'players, NPCs, and weapon drops'],
	['for players, weapon drops, and vehicles', 'for players, weapon drops, and bases'],

	// Broken / truncated meta fragments
	['soft aim, and .', 'soft aim, and radar.'],
	['soft aim, and on Windows PC', 'soft aim, and radar on Windows PC'],
	['soft aim, and for Windows PC', 'soft aim, and radar for Windows PC'],
	['soft aim, and in our', 'soft aim, and radar in our'],
	['soft aim, and maintenance', 'soft aim, and radar maintenance'],
	['soft aim, boxes, and on Windows PC', 'soft aim, and radar on Windows PC'],
	['ESP, Soft Aim, ', 'ESP, Soft Aim & Radar'],
	['Best Hacks with ESP & ', 'ESP Soft Aim & Radar'],
	['ESP, Soft Aim & ', 'ESP, Soft Aim & Radar'],
	['with — learn', '— learn'],
	['RRicochet out for', 'Reach out for'],
	['an Ricochet', 'a Ricochet'],
	['After a Escape', 'After an Escape'],
	['after a Escape', 'after an Escape'],

	// Keyword stuffing / nonsense duplicates
	['warzone cheats & warzone cheats', 'warzone cheats'],
	[
		'covering both warzone cheats and warzone cheats search intent',
		'covering both “warzone cheats” and “warzone cheats” search intent',
	],
	[
		'also searched as warzone cheats and warzone cheat.',
		'built for Call of Duty: Warzone on Windows PC.',
	],
	[
		'warzone cheats vs warzone cheats — same stack, clear pages',
		'How this Warzone Cheats pillar fits nearby pages',
	],
	[
		'Searchers use warzone cheats and warzone cheats interchangeably. This pillar focuses on hacks language; the',
		'Use this pillar for the core product overview. For year-specific buying notes, see the',
	],

	// Point cannibal URLs at canonicals
	['/warzone-esp-hack/', '/warzone-esp/'],
	['/warzone-aimbot-hack/', '/warzone-aimbot/'],
	['/best-warzone-cheats/', '/'],
	['best warzone cheats guide', 'Warzone Cheats pillar'],
	['best warzone cheats checklist', 'warzone cheats checklist'],
	['best warzone cheats', 'warzone cheats'],
	[
		'Prefer softer tracking? Read the <a href="/warzone-soft-aim/">soft aim guide</a>. Want the search term most players use? See <a href="/warzone-aimbot/">aimbot hack</a>.',
		'Prefer softer tracking? Read the <a href="/warzone-soft-aim/">soft aim guide</a>.',
	],
	['Related landings: <a href="/warzone-cheat-download/">cheat download</a>, <a href="/warzone-mod-menu/">mod menu</a>, <a href="/warzone-aimbot/">aimbot hack</a>, <a href="/warzone-esp/">ESP hack</a>.',
		'Related landings: <a href="/warzone-cheat-download/">cheat download</a>, <a href="/warzone-mod-menu/">mod menu</a>, <a href="/warzone-aimbot/">aimbot</a>, <a href="/warzone-esp/">ESP</a>.'],
];

let src = readFileSync(PAGES_EN, 'utf8');
let hits = 0;
for (const [from, to] of replacements) {
	if (typeof from === 'string') {
		if (!src.includes(from)) continue;
		const count = src.split(from).length - 1;
		src = src.split(from).join(to);
		hits += count;
	} else {
		const next = src.replace(from, to);
		if (next !== src) hits += 1;
		src = next;
	}
}

writeFileSync(PAGES_EN, src);
console.log(`Replaced ${hits} occurrences in pages-en.mjs`);

const gen = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-i18n-content.mjs')], {
	cwd: ROOT,
	stdio: 'inherit',
});
if (gen.status !== 0) process.exit(gen.status ?? 1);
console.log('Regenerated content.generated.ts');
