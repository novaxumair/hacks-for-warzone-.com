import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('.');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');
const sourcePath =
	process.argv[2] ??
	'/home/ubuntu/.cursor/projects/workspace/assets/2f2c7e09-3fad-4252-9af7-4c5e59025533.png';

const CREAM = { r: 236, g: 232, b: 225 }; // #ECE8E1

function isBackground(r, g, b) {
	if (r > 248 && g > 248 && b > 248) return true;
	const dr = r - CREAM.r;
	const dg = g - CREAM.g;
	const db = b - CREAM.b;
	const dist = Math.sqrt(dr * dr + dg * dg + db * db);
	if (dist < 28) return true;
	if (r > 215 && g > 210 && b > 200 && r - g < 12 && g - b < 12) return true;
	return false;
}

async function logoWithAlpha() {
	const { data, info } = await sharp(sourcePath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		if (isBackground(r, g, b)) data[i + 3] = 0;
	}

	return sharp(data, {
		raw: { width: info.width, height: info.height, channels: 4 },
	})
		.trim({ threshold: 10 })
		.png();
}

async function writeSized(pngPipeline, outPath, size) {
	await writeFile(outPath, await pngPipeline.clone().resize(size, size).png().toBuffer());
}

async function main() {
	const base = await logoWithAlpha();
	const png512 = await base.clone().resize(512, 512).png().toBuffer();

	await writeFile(path.join(imagesDir, 'warzone-cheats-logo.png'), png512);
	await writeFile(
		path.join(imagesDir, 'warzone-cheats-logo.webp'),
		await sharp(png512).webp({ quality: 92, effort: 6 }).toBuffer(),
	);
	await writeFile(
		path.join(imagesDir, 'warzone-cheats-logo-mark.webp'),
		await sharp(png512).resize(128, 128).webp({ quality: 92, effort: 6 }).toBuffer(),
	);

	const faviconSizes = [
		['favicon-16x16.png', 16],
		['favicon-32x32.png', 32],
		['apple-touch-icon.png', 180],
		['favicon.png', 192],
	];
	for (const [name, size] of faviconSizes) {
		await writeFile(path.join(publicDir, name), await sharp(png512).resize(size, size).png().toBuffer());
	}
	await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(png512).resize(32, 32).png().toBuffer());

	console.log('Site symbol imported from', sourcePath);
}

await main();
