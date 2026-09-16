#!/usr/bin/env node
/**
 * Import user-provided Call of Duty: Warzone screenshots and agent assets.
 */
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = '/home/ubuntu/.cursor/projects/workspace/assets';
const OUT = path.join(ROOT, 'public', 'images');
const VIDEOS = path.join(ROOT, 'public', 'videos');

const SCREENSHOTS = [
	'3e36d5e4-d1c4-4ff3-947c-e41b4ae1cf80.png',
	'ace63d75-06af-4d7d-9b64-ef8f1925c151.png',
	'd925dde6-ad3b-45b2-9eb4-0d6c587ab1b3.png',
	'3cf41d37-4773-4409-bccd-d263e80f96a2.png',
	'5ba69f8d-1d6b-4968-b0b3-bc3173645d58.png',
	'ae869fa9-6b43-4d11-9799-5fadcdb40118.png',
	'40ca9d7c-2cfe-461e-943d-53964a6e8765.png',
	'69cfa944-ab03-4922-a4c5-9f0c51777713.jpg',
];

async function toWebp(src, dest, width) {
	const img = sharp(src);
	const meta = await img.metadata();
	const w = width ?? meta.width;
	await img
		.resize({ width: w, withoutEnlargement: false })
		.webp({ quality: 82, effort: 4 })
		.toFile(dest);
}

async function main() {
	await mkdir(OUT, { recursive: true });
	await mkdir(VIDEOS, { recursive: true });

	for (let i = 0; i < SCREENSHOTS.length; i++) {
		const num = String(i + 1).padStart(2, '0');
		const src = path.join(ASSETS, SCREENSHOTS[i]);
		const base = `warzone-screenshot-${num}`;
		await toWebp(src, path.join(OUT, `${base}.webp`), 1920);
		await toWebp(src, path.join(OUT, `${base}-960w.webp`), 960);
		await toWebp(src, path.join(OUT, `${base}-480w.webp`), 480);
		console.log(`Imported ${base}`);
	}

	// Agent from dark cinematic still (screenshot 8)
	const heroSrc = path.join(ASSETS, SCREENSHOTS[7]);
	await toWebp(heroSrc, path.join(OUT, 'warzone-hero-poster.webp'), 1920);
	await toWebp(heroSrc, path.join(OUT, 'warzone-cheats-hero.webp'), 1920);
	await toWebp(heroSrc, path.join(OUT, 'warzone-cheats-hero-1199w.webp'), 1199);
	await toWebp(heroSrc, path.join(OUT, 'warzone-cheats-hero-1024w.webp'), 1024);
	await toWebp(heroSrc, path.join(OUT, 'warzone-cheats-hero-640w.webp'), 640);
	await toWebp(heroSrc, path.join(OUT, 'warzone-cheats-hero-480w.webp'), 480);
	await sharp(heroSrc).resize(512).webp({ quality: 85 }).toFile(path.join(OUT, 'warzone-cheats-logo.webp'));
	await sharp(heroSrc).resize(512).png().toFile(path.join(OUT, 'warzone-cheats-logo.png'));

	// Use gameplay shots for product gallery aliases
	const aliases = [
		['warzone-cheats-esp.webp', 0],
		['warzone-cheats-aimbot.webp', 1],
		['warzone-cheats-wallhack.webp', 2],
		['warzone-cheats-radar.webp', 5],
		['warzone-wallhack-skeleton.webp', 3],
		['warzone-aimbot-skeleton.webp', 4],
		['warzone-esp-radar.webp', 5],
		['warzone-esp-player-tags.webp', 6],
	];
	for (const [name, idx] of aliases) {
		await toWebp(path.join(ASSETS, SCREENSHOTS[idx]), path.join(OUT, name), 1280);
	}

	console.log('Assets imported.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
