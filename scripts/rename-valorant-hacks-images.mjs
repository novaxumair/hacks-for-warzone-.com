#!/usr/bin/env node
/**
 * Rename /images/warzone-cheats-* assets → /images/warzone-cheats-* and update references.
 * Run: node scripts/rename-warzone-cheats-images.mjs
 */
import { readFile, writeFile, rename, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'public/images');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'warzone-cheats-org-audit',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

// 1. Rename image files on disk
const imageFiles = (await readdir(IMAGES)).filter((f) => f.includes('warzone-cheats'));
let renamed = 0;
for (const file of imageFiles) {
	const next = file.replace(/warzone-cheats/g, 'warzone-cheats');
	if (next === file) continue;
	await rename(path.join(IMAGES, file), path.join(IMAGES, next));
	renamed++;
	console.log(`renamed image: ${file} → ${next}`);
}

// 2. Update text references
const FROM = '/images/warzone-cheats-';
const TO = '/images/warzone-cheats-';
let updated = 0;
for (const file of await walk(ROOT)) {
	if (file.startsWith(IMAGES)) continue;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) continue;
	const text = await readFile(file, 'utf8');
	if (!text.includes(FROM) && !text.includes('warzone-cheats-hero') && !text.includes('warzone-cheats-logo')) {
		continue;
	}
	const next = text
		.replaceAll(FROM, TO)
		.replaceAll("'warzone-cheats-hero'", "'warzone-cheats-hero'")
		.replaceAll("'warzone-cheats-logo'", "'warzone-cheats-logo'");
	if (next !== text) {
		await writeFile(file, next, 'utf8');
		updated++;
		console.log('updated', path.relative(ROOT, file));
	}
}

console.log(`\nrename-warzone-cheats-images: ${renamed} file(s) renamed, ${updated} reference file(s) updated`);
