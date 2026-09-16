import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CDN_A = 'https://sm.ign.com/t/ign_za/photo/default';
const CDN_B = 'https://sm.ign.com/t/ign_latam/photo/default';
const CDN_GALLERY = 'https://sm.ign.com/t/ign_pk/gallery/f/rust-g';
const imagesDir = path.resolve('public/images');
const publicDir = path.resolve('public');

/**
 * Call of Duty: Warzone gallery shots — filenames include primary SEO keywords
 * (rust, cheats, esp, aimbot, wallhack, survival, etc.)
 */
const KEYWORD_ASSETS = [
	{ file: 'the-warzone-cheats-hero.webp', url: `${CDN_GALLERY}/rust-gameplay-screenshots-2024_s2qs.1400.jpg` },
	{ file: 'warzone-cheats-cover.webp', url: `${CDN_B}/rust-survival-chapter-5-season-1-screenshot-a-1920x_xkzh.1400.jpg` },
	{ file: 'rust-loadout-builder.webp', url: `${CDN_B}/rust-survival-chapter-5-season-1-screenshot-b-1920x_8z8k.1400.jpg` },
	{ file: 'the-warzone-cheats-aimbot-combat.webp', url: `${CDN_B}/rust-survival-chapter-5-season-1-screenshot-c-1920x_vu5r.1400.jpg` },
	{ file: 'rust-pack-fight.webp', url: `${CDN_B}/rust-survival-chapter-5-season-1-screenshot-d-1920x_mzsk.1400.jpg` },
	{ file: 'the-warzone-cheats-esp-wallhack.webp', url: `${CDN_B}/rust-survival-chapter-5-season-1-train-1920x1080-a1_1nkx.1400.jpg` },
	{ file: 'warzone-cheats-package.webp', url: 'https://sm.ign.com/t/ign_latam/gallery/f/rust-c/rust-chapter-5-underground-images_5h3j.1400.jpg' },
	{ file: 'rust-header-art.webp', url: 'https://sm.ign.com/t/ign_in/screenshot/default/rust-unreal-engine-5-1-scree-3_bcxh.1400.jpg' },
	{ file: 'rust-survival-combat.webp', url: `${CDN_A}/screenshot-7105-1725916496016_j9dr.1400.jpg` },
	{ file: 'rust-reboot-van-fight.webp', url: `${CDN_A}/screenshot-6960-1725916496015_vbtg.1400.jpg` },
	{ file: 'rust-player-esp.webp', url: `${CDN_A}/screenshot-6815-1725916496014_zkpv.1400.jpg` },
	{ file: 'rust-zero-build-combat.webp', url: `${CDN_A}/screenshot-6670-1725916496013_zv3w.1400.jpg` },
	{ file: 'rust-zero-build-mode.webp', url: `${CDN_A}/screenshot-6380-1725916496012_gj96.1400.jpg` },
	{ file: 'rust-al-mazrah-map.webp', url: 'https://sm.ign.com/t/ign_latam/gallery/f/rust-c/rust-chapter-5-underground-images_5h3j.1400.jpg' },
];

const LEGACY_PATTERNS = [
	/^rust-extract-fight/,
	/^rust-operator-esp/,
	/^rust-verdansk-combat/,
	/^rust-growth-run-mode/,
	/^rust-al-mazrah-map/,
];

async function fetchWebp(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Call of Duty: WarzoneCheatsSite/1.0)' },
	});
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	const input = Buffer.from(await res.arrayBuffer());
	return sharp(input).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
}

async function removeLegacyImages() {
	const files = await readdir(imagesDir).catch(() => []);
	for (const file of files) {
		if (LEGACY_PATTERNS.some((pattern) => pattern.test(file))) {
			await unlink(path.join(imagesDir, file));
			console.log(`Removed legacy ${file}`);
		}
	}
}

async function generateBrandAssets(heroBuffer) {
	const logoBuffer = await sharp(heroBuffer)
		.extract({ left: 420, top: 180, width: 520, height: 520 })
		.resize(512, 512, { fit: 'cover' })
		.webp({ quality: 88 })
		.toBuffer();

	await writeFile(path.join(imagesDir, 'the-warzone-cheats-logo.webp'), logoBuffer);

	const iconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];

	for (const { name, size } of iconSizes) {
		const png = await sharp(logoBuffer).resize(size, size).png().toBuffer();
		await writeFile(path.join(publicDir, name), png);
	}

	const faviconIco = await sharp(logoBuffer).resize(32, 32).png().toBuffer();
	await writeFile(path.join(publicDir, 'favicon.ico'), faviconIco);
}

await mkdir(imagesDir, { recursive: true });
await removeLegacyImages();

let heroBuffer = null;

for (const asset of KEYWORD_ASSETS) {
	console.log(`Fetching ${asset.file}`);
	try {
		const webp = await fetchWebp(asset.url);
		const dest = path.join(imagesDir, asset.file);
		await writeFile(dest, webp);
		console.log(`Saved ${asset.file} (${webp.length} bytes)`);
		if (asset.file === 'the-warzone-cheats-hero.webp') heroBuffer = webp;
	} catch (err) {
		console.warn(`Skip ${asset.file}: ${err.message}`);
	}
}

if (heroBuffer) {
	await generateBrandAssets(heroBuffer);
	console.log('Generated keyword logo + favicons from agent art.');
}

console.log(`Done — attempted ${KEYWORD_ASSETS.length} keyword-named Call of Duty: Warzone images.`);
