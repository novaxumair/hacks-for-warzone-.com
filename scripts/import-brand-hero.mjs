/**
 * Import green hexagon brand hero PNG for pillar tab banners.
 * Strips near-black / neutral matte → transparent (site canvas shows through).
 * Usage: node scripts/import-brand-hero.mjs [path/to/logo.png]
 */
import { access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/images/brand-hero.png');
const bundledSource = path.join(ROOT, 'scripts/assets/brand-hero-source.png');

/** Match --bg (#0D0A14) when soft-replacing dark edge pixels */
const THEME_BG = { r: 13, g: 10, b: 20 };

function isGreenLogoPixel(r, g, b) {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const chroma = max - min;
	if (max < 28) return false;
	// Green hexagon: G channel leads; reject neutral dark matte.
	if (g >= Math.max(r, b) + 6 && chroma >= 12) return true;
	if (g >= 80 && g >= r && g >= b) return true;
	return false;
}

function isBackgroundSeed(r, g, b) {
	const max = Math.max(r, g, b);
	if (max <= 42) return true;
	const chroma = max - Math.min(r, g, b);
	return chroma < 18 && max < 130;
}

async function knockOutBackground(inputPath) {
	const { data, info } = await sharp(inputPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const { width, height, channels } = info;
	const n = width * height;
	const bg = new Uint8Array(n);
	const queue = [];

	const trySeed = (x, y) => {
		const idx = y * width + x;
		if (bg[idx]) return;
		const i = idx * channels;
		if (!isBackgroundSeed(data[i], data[i + 1], data[i + 2])) return;
		bg[idx] = 1;
		queue.push(idx);
	};

	for (let x = 0; x < width; x++) {
		trySeed(x, 0);
		trySeed(x, height - 1);
	}
	for (let y = 0; y < height; y++) {
		trySeed(0, y);
		trySeed(width - 1, y);
	}

	const neighbors = [-1, 1, -width, width];
	while (queue.length) {
		const idx = queue.pop();
		const x = idx % width;
		const y = (idx - x) / width;
		for (const d of neighbors) {
			const nIdx = idx + d;
			if (nIdx < 0 || nIdx >= n) continue;
			const nx = nIdx % width;
			if (Math.abs(nx - x) > 1) continue;
			if (bg[nIdx]) continue;
			const i = nIdx * channels;
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			if (isGreenLogoPixel(r, g, b)) continue;
			if (!isBackgroundSeed(r, g, b) && Math.max(r, g, b) > 42) continue;
			bg[nIdx] = 1;
			queue.push(nIdx);
		}
	}

	const softFeather = 28;
	for (let idx = 0; idx < n; idx++) {
		const i = idx * channels;
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const max = Math.max(r, g, b);

		if (bg[idx]) {
			data[i + 3] = 0;
			continue;
		}

		if (!isGreenLogoPixel(r, g, b) && max <= 55) {
			data[i + 3] = 0;
			continue;
		}

		if (max <= 55 + softFeather && !isGreenLogoPixel(r, g, b)) {
			const t = Math.max(0, Math.min(1, (max - 55) / softFeather));
			data[i + 3] = Math.round(data[i + 3] * t);
			data[i] = Math.round(THEME_BG.r + (r - THEME_BG.r) * t);
			data[i + 1] = Math.round(THEME_BG.g + (g - THEME_BG.g) * t);
			data[i + 2] = Math.round(THEME_BG.b + (b - THEME_BG.b) * t);
		}
	}

	return sharp(Buffer.from(data), {
		raw: { width, height, channels },
	})
		.png({ compressionLevel: 6, adaptiveFiltering: true })
		.toFile(OUT);
}

const source = process.argv[2] ?? bundledSource;

try {
	await access(source);
	await knockOutBackground(source);
	console.log(`import-brand-hero: processed ${source} → ${OUT}`);
} catch (err) {
	console.error(`import-brand-hero: failed (${err.message})`);
	process.exit(1);
}
