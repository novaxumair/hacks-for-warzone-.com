#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const SIMPLE =
	"images: { hero: 'warzone cheats', espWallhack: 'warzone cheats wallhack', aimbotCombat: 'warzone cheats aimbot', squadFight: 'warzone cheats', playerEsp: 'warzone cheats esp', headerArt: 'warzone cheats aimbot', hacksPackage: 'warzone cheats radar', matchFight: 'warzone cheats aimbot', battleRoyale: 'warzone cheats', matchMap: 'warzone cheats esp' }";

const re =
	/images: \{ hero: '[^']+', espWallhack: '[^']+', aimbotCombat: '[^']+', squadFight: '[^']+', playerEsp: '[^']+', headerArt: '[^']+', hacksPackage: '[^']+', matchFight: '[^']+', battleRoyale: '[^']+', matchMap: '[^']+' \}/g;

for (const f of ['scripts/i18n-data/ui-strings-part1.mjs', 'scripts/i18n-data/ui-strings-part2.mjs']) {
	const c = readFileSync(f, 'utf8');
	const n = c.replace(re, SIMPLE);
	writeFileSync(f, n);
	console.log(f, (c.match(re) || []).length, 'image blocks simplified');
}

const altMap = [
	["imageAlt: 'Call of Duty: Warzone ESP player tags hack'", "imageAlt: 'warzone cheats esp'"],
	["imageAlt: 'Call of Duty: Warzone ESP radar hack'", "imageAlt: 'warzone cheats radar'"],
	["imageAlt: 'Call of Duty: Warzone Aimbot sniper kill'", "imageAlt: 'warzone cheats aimbot'"],
	["imageAlt: 'Call of Duty: Warzone Aimbot skeleton targeting'", "imageAlt: 'warzone cheats aimbot'"],
	["imageAlt: 'warzone cheats ADS combat'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats setup PC activation'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats updates Ricochet maintenance'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats FAQ ESP aimbot'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats support license help'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'Undetected warzone cheats ESP wallhack'", "imageAlt: 'undetected warzone cheats'"],
	["imageAlt: 'thefinals wallhack skeleton ESP'", "imageAlt: 'warzone cheats wallhack'"],
	["imageAlt: 'Ricochet bypass rust ESP aimbot'", "imageAlt: 'warzone cheats eac'"],
	["imageAlt: 'warzone cheats 2026 ESP aimbot'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats combat aimbot'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheat download ESP aimbot'", "imageAlt: 'warzone cheats download'"],
	["imageAlt: 'Call of Duty: Warzone mod menu ESP aimbot'", "imageAlt: 'warzone cheats mod menu'"],
	["imageAlt: 'Call of Duty: Warzone soft aim aimbot settings'", "imageAlt: 'warzone cheats soft aim'"],
	["imageAlt: 'Best warzone cheats 2026 ESP'", "imageAlt: 'best warzone cheats'"],
	["imageAlt: 'Call of Duty: Warzone Aimbot hack combat'", "imageAlt: 'warzone cheats aimbot'"],
	["imageAlt: 'Call of Duty: Warzone ESP hack wallhack'", "imageAlt: 'warzone cheats esp'"],
	["imageAlt: 'Call of Duty: Warzone unlock all items ESP aimbot guide'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats privacy policy'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats refund policy'", "imageAlt: 'warzone cheats'"],
	["imageAlt: 'warzone cheats terms of use'", "imageAlt: 'warzone cheats'"],
];

let pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
for (const [from, to] of altMap) pages = pages.split(from).join(to);
writeFileSync('scripts/i18n-data/pages-en.mjs', pages);
console.log('pages-en imageAlts simplified');

// productPage() imageAlt template in pages-i18n
let i18n = readFileSync('scripts/i18n-data/pages-i18n.mjs', 'utf8');
i18n = i18n
	.split("imageAlt: `Call of Duty: Warzone ${meta.altKeyword}`")
	.join("imageAlt: 'warzone cheats'")
	.split("galleryTitle: `Warzone Cheats ${topicName}`")
	.join("galleryTitle: 'warzone cheats'")
	.split("imageAlt: `warzone cheats ${kind} policy`")
	.join("imageAlt: 'warzone cheats'")
	.split("galleryTitle: `Warzone Cheats ${kind} resources`")
	.join("galleryTitle: 'warzone cheats'");
writeFileSync('scripts/i18n-data/pages-i18n.mjs', i18n);
console.log('pages-i18n image alts simplified');
