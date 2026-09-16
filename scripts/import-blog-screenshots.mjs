/**
 * Import additional user-provided Call of Duty: Warzone screenshots for blog posts (slots 16–22).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const ASSETS = '/home/ubuntu/.cursor/projects/workspace/assets';
const imagesDir = path.join(ROOT, 'public/images');

const SOURCES = [
	'5931924f-bb61-4654-a657-8cefb653a6f2.png',
	'48aae2d7-bfc6-4f78-b6b1-2bcab86d77bf.png',
	'e517f94c-9354-4a03-8e60-6189eb558f32.png',
	'82de8761-7643-4509-b856-c16832588507.png',
	'efa26633-f246-4b24-b564-5083875d2bc9.png',
	'13fd9618-f43c-4471-8ff5-3188f3725212.png',
	'507cd474-3990-438f-a321-dc5e9ef42d2c.png',
];

const WIDTHS = [480, 960];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

async function encodeWebp(input, width) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 595) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(WEBP)
		.toBuffer();
}

await mkdir(imagesDir, { recursive: true });

for (let i = 0; i < SOURCES.length; i += 1) {
	const num = String(16 + i).padStart(2, '0');
	const base = `warzone-screenshot-${num}`;
	const input = path.join(ASSETS, SOURCES[i]);
	console.log(`Processing ${base}…`);
	for (const width of WIDTHS) {
		const webp = await encodeWebp(input, width);
		await writeFile(path.join(imagesDir, `${base}-${width}w.webp`), webp);
	}
	const canonical = await encodeWebp(input, 960);
	await writeFile(path.join(imagesDir, `${base}.webp`), canonical);
	console.log(`  ✓ ${base}.webp`);
}

console.log(`Done — ${SOURCES.length} blog screenshots (16–22).`);
