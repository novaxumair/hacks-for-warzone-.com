#!/usr/bin/env node
/**
 * Download IGN game art into /public/images/guides/ for self-hosted guide cards.
 * Run: node scripts/sync-guide-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { IGN_SOURCE_IMAGES, gameSlug } from './guide-ign-images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'guides');

async function fetchBuffer(url) {
	const res = await fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (compatible; cheatsforwarzone-guide-sync/1.0)',
			Referer: 'https://www.ign.com/',
		},
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
	return Buffer.from(await res.arrayBuffer());
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	let ok = 0;
	let failed = 0;

	for (const [game, sourceUrl] of Object.entries(IGN_SOURCE_IMAGES)) {
		const slug = gameSlug(game);
		const outPath = path.join(OUT_DIR, `${slug}.webp`);
		try {
			const buf = await fetchBuffer(sourceUrl);
			const webp = await sharp(buf)
				.resize(640, 360, { fit: 'cover', position: 'centre' })
				.webp({ quality: 82, effort: 4 })
				.toBuffer();
			await writeFile(outPath, webp);
			console.log(`  ✓ ${slug}.webp ← ${game}`);
			ok += 1;
		} catch (err) {
			console.error(`  ✗ ${game}: ${err.message}`);
			failed += 1;
		}
	}

	console.log(`Done: ${ok} saved, ${failed} failed`);
	if (failed) process.exit(1);
}

main();
