import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_URL =
	process.env.FINALS_HERO_URL ??
	process.env.WARZONE_HERO_URL ??
	process.env.RUST_HERO_URL ??
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/warzone/ChatGPT%20Image%20Aug%2024,%202026,%2007_13_59%20PM.png';
const imagesDir = path.resolve('public/images');
/** High-quality WebP — agent is LCP; prioritize clarity over file size. */
const HERO_WEBP = { quality: 100, effort: 6, smartSubsample: false, alphaQuality: 100 };

/** Match homepage agent bar — same wide banner ratio as before (3.15:1). */
const BANNER_RATIO = 3.15;

/** Output widths — capped at source width so we never upscale. */
const HERO_WIDTHS = [640, 1024, 1448, 1536, 1778];

const heroBuffer = Buffer.from(
	await (HERO_URL.startsWith('file://')
		? readFile(HERO_URL.replace('file://', ''))
		: fetch(HERO_URL, {
				headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Call of Duty: WarzoneCheatsSite/1.0)' },
			}).then((r) => {
				if (!r.ok) throw new Error(`HTTP ${r.status}`);
				return r.arrayBuffer();
			})),
);

function bannerHeight(width) {
	return Math.round(width / BANNER_RATIO);
}

const sourceMeta = await sharp(heroBuffer).metadata();
const maxWidth = sourceMeta.width ?? 1778;
const outputWidths = HERO_WIDTHS.filter((width) => width <= maxWidth);
if (!outputWidths.includes(maxWidth) && maxWidth > (outputWidths.at(-1) ?? 0)) {
	outputWidths.push(maxWidth);
}

function resizeHero(width) {
	const height = bannerHeight(width);
	return sharp(heroBuffer)
		.resize(width, height, {
			fit: 'cover',
			position: 'centre',
			kernel: sharp.kernel.lanczos3,
			withoutEnlargement: true,
		})
		.sharpen({ sigma: 0.35, m1: 0.5, m2: 0.25 });
}

for (const width of outputWidths) {
	const height = bannerHeight(width);
	const webp = await resizeHero(width).webp(HERO_WEBP).toBuffer();
	await writeFile(path.join(imagesDir, `warzone-cheats-hero-${width}w.webp`), webp);
	console.log(`✓ warzone-cheats-hero-${width}w.webp (${width}x${height}, ${Math.round(webp.length / 1024)}KB)`);
}

const lcpWidth = outputWidths.includes(1870)
	? 1870
	: outputWidths.includes(1778)
		? 1778
		: outputWidths.includes(1536)
			? 1536
			: outputWidths.at(-1) ?? 1024;
const canonicalHeight = bannerHeight(lcpWidth);
const canonical = await resizeHero(lcpWidth).webp(HERO_WEBP).toBuffer();
for (const name of ['warzone-cheats-hero.webp', 'warzone-hero-banner.webp', 'hero-banner.webp']) {
	await writeFile(path.join(imagesDir, name), canonical);
}

const png = await resizeHero(lcpWidth).png({ compressionLevel: 6 }).toBuffer();
await writeFile(path.join(imagesDir, 'warzone-cheats-hero.png'), png);

console.log(
	`Done — agent banner ${BANNER_RATIO}:1 (LCP ${lcpWidth}x${canonicalHeight}), fit: cover, quality ${HERO_WEBP.quality}`,
);
