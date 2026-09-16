/**
 * Import Warzone cheat screenshots from Supabase + user-provided local assets.
 * Writes crawl URLs: /images/warzone-screenshot-01.webp … 19.webp
 * plus -480w / -960w responsive variants. Does not touch agent assets.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE =
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/';

const ASSETS_DIR = '/home/ubuntu/.cursor/projects/workspace/assets';

/** 19 unique Call of Duty: Warzone gameplay screenshots — no UI captures or duplicates. */
const SOURCES = [
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185425.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185442.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185513.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185527.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185540.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185621.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185635.png` },
	{ kind: 'url', value: `${BASE}Screenshot%202026-08-13%20185646.png` },
	{ kind: 'file', value: path.join(ASSETS_DIR, '07f28c9f-fc1d-400b-82d0-f182656c640e.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, 'fe66cf49-8280-4618-9808-232e6f02aa56.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '1da7e54e-20d4-4e79-b6a1-4f88fb07cf40.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '83181265-971a-4150-801e-e67667e23a09.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '2831cadb-1382-4ad5-9f19-fb3d1c5cab62.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '643fc394-f9d7-4f96-ad0b-157aaf323ace.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '8cc58289-4a66-443d-bb84-ce956869802a.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '71dcc54e-98ad-4ba5-9e42-7c87cabcf586.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '4ea9fe6d-629a-4b59-8e64-5fa9033f3c23.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '7abfa7c5-488a-4389-913e-6189ee5df1bf.png') },
	{ kind: 'file', value: path.join(ASSETS_DIR, '2f2c7e09-3fad-4252-9af7-4c5e59025533.png') },
];

const SCREENSHOT_COUNT = SOURCES.length;
const imagesDir = path.join(ROOT, 'public/images');
const tmpDir = path.join(ROOT, 'tmp/warzone-screenshots/sources');

const CONTENT_WIDTHS = [480, 960];
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
};

async function loadSource(source, index) {
	if (source.kind === 'file') {
		return source.value;
	}
	const res = await fetch(source.value, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Call of Duty: WarzoneCheatsSite/1.0)' },
	});
	if (!res.ok) throw new Error(`Download failed (${index + 1}): HTTP ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	const file = path.join(tmpDir, `source-${String(index + 1).padStart(2, '0')}.png`);
	await writeFile(file, buf);
	return file;
}

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 595) / nativeWidth) * targetWidth);
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

	canonical = await encodeWebp(pngPath, 960);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	outputs.push({ file: `${baseName}.webp`, bytes: canonical.length });

	return { outputs, canonical };
}

await mkdir(imagesDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

console.log(`Importing ${SCREENSHOT_COUNT} unique Call of Duty: Warzone screenshots…`);
const sourceFiles = [];
for (let i = 0; i < SOURCES.length; i += 1) {
	console.log(`  ↓ ${i + 1}/${SCREENSHOT_COUNT}`);
	sourceFiles.push(await loadSource(SOURCES[i], i));
}

let totalBytes = 0;

for (let n = 1; n <= SCREENSHOT_COUNT; n += 1) {
	const num = String(n).padStart(2, '0');
	const base = `warzone-screenshot-${num}`;
	const png = sourceFiles[n - 1];

	console.log(`Processing ${base}…`);
	const { outputs, canonical } = await writeScreenshotSet(png, base);
	for (const { file, bytes } of outputs) {
		totalBytes += bytes;
		console.log(`  ✓ ${file} (${Math.round(bytes / 1024)}KB)`);
	}

	for (const name of LEGACY_MAP[base] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
		console.log(`  ✓ ${name} (alias)`);
	}
}

const reviewsCanonical = await encodeWebp(sourceFiles[3], 960);
await writeFile(path.join(imagesDir, 'reviews-banner.webp'), reviewsCanonical);
for (const width of CONTENT_WIDTHS) {
	const webp = await encodeWebp(sourceFiles[3], width);
	await writeFile(path.join(imagesDir, `reviews-banner-${width}w.webp`), webp);
}
console.log('✓ reviews-banner.webp (+ responsive variants)');

console.log(
	`\nDone — ${SCREENSHOT_COUNT} unique screenshots (~${Math.round(totalBytes / 1024)}KB webp)`,
);
