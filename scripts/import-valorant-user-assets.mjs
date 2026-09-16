/**
 * Import user-provided Call of Duty: Warzone hero GIF + gameplay screenshots.
 * Writes optimized WebP screenshots and hero video (WebM/MP4) + poster.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const videosDir = path.join(ROOT, 'public/videos');
const assetsDir = '/home/ubuntu/.cursor/projects/workspace/assets';

const HERO_GIF = '417a7b6b-e007-4184-b41c-3c5f67a12fbd.gif';

/** User screenshots in order — mapped to warzone-screenshot-01 … 08. */
const USER_SCREENSHOTS = [
	'a498e125-ba16-4ab5-881a-ad24177c7eee.png',
	'deea4aba-924a-4129-9648-d5ba8ef88480.png',
	'ccb31002-3d63-4632-a564-0d26f16e501a.png',
	'423cfd77-781e-46f5-b442-e98e90c5f22f.png',
	'40257236-497c-474b-8b39-265c30143194.png',
	'bb0af361-181b-4572-9692-4cc017c734a1.png',
	'06a68387-2697-4eee-888e-cffd8085edb3.png',
];

const SCREENSHOT_COUNT = 8;
const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

const LEGACY_MAP = {
	'warzone-screenshot-01': ['warzone-cheats-esp.webp', 'warzone-esp-player-tags.webp'],
	'warzone-screenshot-02': ['warzone-cheats-wallhack.webp', 'warzone-cheats-session.webp'],
	'warzone-screenshot-03': ['warzone-cheats-aimbot.webp', 'warzone-cheats-combat.webp'],
	'warzone-screenshot-04': [
		'warzone-cheats-aimbot-view.webp',
		'warzone-aimbot-skeleton.webp',
		'warzone-aimbot-sniper.webp',
	],
	'warzone-screenshot-05': ['warzone-cheats-radar.webp', 'warzone-esp-radar.webp'],
	'warzone-screenshot-06': ['warzone-extract-fight.webp'],
	'warzone-screenshot-07': ['warzone-growth-run-combat.webp', 'warzone-growth-run-mode.webp'],
	'warzone-screenshot-08': [],
};

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 667) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(options)
		.toBuffer();
}

async function writeScreenshotSet(pngPath, baseName) {
	const outputs = [];
	let canonical = null;

	for (const width of CONTENT_WIDTHS) {
		const file = `${baseName}-${width}w.webp`;
		const webp = await encodeWebp(pngPath, width);
		await writeFile(path.join(imagesDir, file), webp);
		outputs.push({ file, bytes: webp.length });
	}

	canonical = await encodeWebp(pngPath, 1199);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	outputs.push({ file: `${baseName}.webp`, bytes: canonical.length });

	return { outputs, canonical };
}

async function processHeroGif(gifPath) {
	await mkdir(videosDir, { recursive: true });

	const webmOut = path.join(videosDir, 'hero-cinematic.webm');
	const mp4Out = path.join(videosDir, 'hero-cinematic.mp4');
	const posterOut = path.join(imagesDir, 'warzone-hero-poster.webp');
	const heroOut = path.join(imagesDir, 'warzone-cheats-hero.webp');

	// VP9 WebM — compressed for fast LCP; GIF loops seamlessly
	execSync(
		`ffmpeg -y -i "${gifPath}" -vf "scale=1280:-2:flags=lanczos" -c:v libvpx-vp9 -crf 38 -b:v 0 -an -loop 0 -pix_fmt yuv420p "${webmOut}"`,
		{ stdio: 'inherit' },
	);

	// H.264 MP4 fallback for Safari
	execSync(
		`ffmpeg -y -i "${gifPath}" -vf "scale=1280:-2:flags=lanczos" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart -pix_fmt yuv420p "${mp4Out}"`,
		{ stdio: 'inherit' },
	);

	// Poster + hero still from first frame
	const framePng = path.join(ROOT, 'tmp/hero-frame.png');
	await mkdir(path.join(ROOT, 'tmp'), { recursive: true });
	execSync(`ffmpeg -y -i "${gifPath}" -vframes 1 -vf "scale=1280:-2" "${framePng}"`, { stdio: 'inherit' });

	for (const width of CONTENT_WIDTHS) {
		const webp = await encodeWebp(framePng, width);
		await writeFile(path.join(imagesDir, `warzone-cheats-hero-${width}w.webp`), webp);
	}

	const poster = await encodeWebp(framePng, 1199);
	await writeFile(posterOut, poster);
	await writeFile(heroOut, poster);
	await writeFile(path.join(imagesDir, 'hero-banner.webp'), poster);

	console.log('✓ hero video + poster generated');
}

await mkdir(imagesDir, { recursive: true });
await mkdir(path.join(ROOT, 'scripts/assets/warzone-screenshots'), { recursive: true });

const gifPath = path.join(assetsDir, HERO_GIF);
await processHeroGif(gifPath);

const sourcePaths = [];
for (let i = 0; i < USER_SCREENSHOTS.length; i += 1) {
	const src = path.join(assetsDir, USER_SCREENSHOTS[i]);
	const saved = path.join(ROOT, 'scripts/assets/warzone-screenshots', `source-${i + 1}.png`);
	await copyFile(src, saved);
	sourcePaths.push(saved);
	console.log(`✓ staged ${USER_SCREENSHOTS[i]}`);
}

let totalBytes = 0;
const canonicalBySlot = {};

for (let n = 1; n <= SCREENSHOT_COUNT; n += 1) {
	const num = String(n).padStart(2, '0');
	const base = `warzone-screenshot-${num}`;
	const sourceIndex = (n - 1) % sourcePaths.length;
	const png = sourcePaths[sourceIndex];

	console.log(`Processing ${base} ← source ${sourceIndex + 1}…`);
	const { outputs, canonical } = await writeScreenshotSet(png, base);
	canonicalBySlot[base] = canonical;
	for (const { file, bytes } of outputs) {
		totalBytes += bytes;
		console.log(`  ✓ ${file} (${Math.round(bytes / 1024)}KB)`);
	}

	for (const name of LEGACY_MAP[base] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
		console.log(`  ✓ ${name} (alias)`);
	}
}

const reviewsCanonical = canonicalBySlot['warzone-screenshot-04'];
await writeFile(path.join(imagesDir, 'reviews-banner.webp'), reviewsCanonical);
for (const width of [480, 960]) {
	const webp = await encodeWebp(sourcePaths[3], width);
	await writeFile(path.join(imagesDir, `reviews-banner-${width}w.webp`), webp);
}
console.log('✓ reviews-banner.webp (+ responsive variants)');

console.log(
	`\nDone — ${SCREENSHOT_COUNT} screenshots + hero assets (~${Math.round(totalBytes / 1024)}KB webp).`,
);
