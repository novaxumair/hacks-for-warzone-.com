import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const STEAM_LIBRARY_HERO =
	'https://cdn.akamai.steamstatic.com/steam/apps/252490/library_hero.jpg';
const imagesDir = path.resolve('public/images');

const heroBuffer = Buffer.from(
	await fetch(STEAM_LIBRARY_HERO, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheCall of Duty: WarzoneCheatsSite/1.0)' },
	}).then((r) => {
		if (!r.ok) throw new Error(`HTTP ${r.status}`);
		return r.arrayBuffer();
	}),
);

const meta = await sharp(heroBuffer).metadata();
const nativeWidth = meta.width ?? 1920;
const nativeHeight = meta.height ?? 620;

for (const width of [640, 1024, 1536]) {
	const height = Math.round((nativeHeight / nativeWidth) * width);
	const webp = await sharp(heroBuffer)
		.resize(width, height, { fit: 'cover' })
		.webp({ quality: 86 })
		.toBuffer();
	await writeFile(path.join(imagesDir, `warzone-cheats-hero-${width}w.webp`), webp);
	console.log(`✓ warzone-cheats-hero-${width}w.webp (${width}x${height})`);
}

await writeFile(
	path.join(imagesDir, 'warzone-cheats-hero.png'),
	await sharp(heroBuffer).png().toBuffer(),
);
await writeFile(
	path.join(imagesDir, 'warzone-cheats-hero.webp'),
	await sharp(heroBuffer).webp({ quality: 86 }).toBuffer(),
);

console.log(`Done — Steam library agent ${nativeWidth}x${nativeHeight}`);
