/**
 * Import blurred pillar-tab banner photo (Cheats / Features / Store / Status).
 * Usage: node scripts/import-pillar-tab-hero.mjs [path/to/photo.jpg]
 */
import { access, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const assetsDir = path.join(ROOT, 'scripts/assets');
const bundledSource = path.join(assetsDir, 'pillar-tab-hero-source.jpg');
const baseName = 'pillar-tab-hero';
const WIDTHS = [640, 960, 1280, 1920];

async function writeVariants(inputPath) {
	await mkdir(assetsDir, { recursive: true });
	await mkdir(imagesDir, { recursive: true });

	for (const width of WIDTHS) {
		const webp = await sharp(inputPath)
			.resize({ width, fit: 'inside', withoutEnlargement: false })
			.webp({ quality: 82, effort: 4 })
			.toBuffer();
		const out =
			width === 1280
				? path.join(imagesDir, `${baseName}.webp`)
				: path.join(imagesDir, `${baseName}-${width}w.webp`);
		await sharp(webp).toFile(out);
	}

	console.log(`import-pillar-tab-hero: wrote ${baseName}.webp (+ ${WIDTHS.filter((w) => w !== 1280).join(', ')}w)`);
}

const source = process.argv[2] ?? bundledSource;

try {
	await access(source);
	if (source !== bundledSource) {
		await copyFile(source, bundledSource);
	}
	await writeVariants(source);
} catch (err) {
	console.error(`import-pillar-tab-hero: failed (${err.message})`);
	process.exit(1);
}
