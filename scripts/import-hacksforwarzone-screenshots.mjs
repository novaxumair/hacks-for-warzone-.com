import { copyFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('.');
const imagesDir = path.join(root, 'public/images');
const stagingDir = path.join(root, 'scripts/.screenshot-staging');
const assetsDir =
	process.env.SCREENSHOT_ASSETS_DIR ??
	'C:\\Users\\Bader\\.cursor\\projects\\c-Users-Bader-Desktop-websites-hacks-for-warzone-com-main-hacks-for-warzone-com-1\\assets';

const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];

async function findUserScreenshot(index) {
	const files = await readdir(assetsDir);
	const match = files.find((file) => new RegExp(`_images_${index}-`, 'i').test(file));
	if (!match) {
		throw new Error(`Missing user screenshot ${index} in ${assetsDir}`);
	}
	return path.join(assetsDir, match);
}

async function removeOldVariants() {
	const files = await readdir(imagesDir).catch(() => []);
	for (const file of files) {
		if (/^warzone-screenshot-\d{2}(-\d+w)?\.webp$/i.test(file)) {
			await unlink(path.join(imagesDir, file));
			console.log(`Removed ${file}`);
		}
	}
}

async function stageUserScreenshot(index) {
	const input = await findUserScreenshot(index);
	const ext = path.extname(input).toLowerCase() || '.jpg';
	const staged = path.join(stagingDir, `${index}${ext}`);
	await copyFile(input, staged);
	return staged;
}

async function convertScreenshots() {
	await mkdir(stagingDir, { recursive: true });

	for (let index = 1; index <= 7; index += 1) {
		const staged = await stageUserScreenshot(index);
		const file = `warzone-screenshot-${String(index).padStart(2, '0')}.webp`;
		const dest = path.join(imagesDir, file);
		const inputBuffer = await readFile(staged);
		const buffer = await sharp(inputBuffer)
			.resize({ width: 1920, withoutEnlargement: true })
			.webp({ quality: 84, effort: 6 })
			.toBuffer();
		await writeFile(dest, buffer);
		console.log(`Wrote ${file} from ${path.basename(staged)} (${buffer.length} bytes)`);
	}
}

async function generateResponsiveVariants() {
	for (let index = 1; index <= 7; index += 1) {
		const file = `warzone-screenshot-${String(index).padStart(2, '0')}.webp`;
		const source = path.join(imagesDir, file);
		const meta = await sharp(source).metadata();
		const base = file.replace(/\.webp$/i, '');

		for (const width of CONTENT_WIDTHS) {
			if (meta.width && width > meta.width) continue;
			const variant = `${base}-${width}w.webp`;
			const quality = width <= 480 ? 72 : width <= 640 ? 78 : 82;
			const buffer = await sharp(source)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality, effort: 6 })
				.toBuffer();
			await writeFile(path.join(imagesDir, variant), buffer);
			console.log(`Wrote ${variant}`);
		}
	}
}

await mkdir(imagesDir, { recursive: true });
await mkdir(stagingDir, { recursive: true });
await removeOldVariants();
await convertScreenshots();
await generateResponsiveVariants();
console.log('Done — 7 user Warzone screenshots imported.');
