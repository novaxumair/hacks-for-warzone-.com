#!/usr/bin/env node
/**
 * Validate that every /images/ reference in dist HTML and srcset variants exist on disk.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const imagesDir = join(root, 'public', 'images');
const distDir = join(root, 'dist');

const imageFiles = new Set(
	readdirSync(imagesDir).filter((name) => /\.(webp|png|jpg|jpeg|svg)$/i.test(name)),
);

function collectHtmlFiles(dir, acc = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			collectHtmlFiles(full, acc);
		} else if (entry.endsWith('.html')) {
			acc.push(full);
		}
	}
	return acc;
}

const imageRefPattern = /\/images\/[a-zA-Z0-9._-]+\.(?:webp|png|jpg|jpeg|svg)/g;
const missing = new Set();
const checked = new Set();

function checkPath(src) {
	if (checked.has(src)) return;
	checked.add(src);
	const file = src.replace(/^\/images\//, '');
	if (!imageFiles.has(file)) {
		missing.add(src);
	}
}

const htmlFiles = collectHtmlFiles(distDir);
for (const file of htmlFiles) {
	const html = readFileSync(file, 'utf8');
	for (const match of html.matchAll(imageRefPattern)) {
		checkPath(match[0]);
	}
}

if (missing.size > 0) {
	console.error('[validate-image-paths] Missing image files:');
	for (const src of [...missing].sort()) {
		console.error(`  ${src}`);
	}
	process.exit(1);
}

console.log(
	`[validate-image-paths] OK — ${checked.size} unique /images/ paths across ${htmlFiles.length} HTML files`,
);
