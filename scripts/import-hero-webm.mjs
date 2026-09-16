#!/usr/bin/env node
/**
 * Copy user hero.webm into public/videos/hero.webm for the homepage banner.
 *
 * Usage:
 *   node scripts/import-hero-webm.mjs
 *   node scripts/import-hero-webm.mjs "C:\Users\Bader\Downloads\hero.webm"
 */
import { copyFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'videos', 'hero.webm');

const defaultSrc =
	process.platform === 'win32'
		? path.join(process.env.USERPROFILE ?? '', 'Downloads', 'hero.webm')
		: path.join(process.env.HOME ?? '', 'Downloads', 'hero.webm');

const src = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;

try {
	await access(src);
} catch {
	console.error(`Hero video not found: ${src}`);
	console.error('Pass the path: node scripts/import-hero-webm.mjs "C:\\Users\\Bader\\Downloads\\hero.webm"');
	process.exit(1);
}

await mkdir(path.dirname(OUT), { recursive: true });
await copyFile(src, OUT);
console.log(`Copied hero video → ${OUT}`);
