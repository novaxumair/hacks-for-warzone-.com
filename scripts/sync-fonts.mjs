/**
 * Copy self-hosted webfonts from @fontsource packages into public/fonts.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/fonts');

const copies = [
	['@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2', 'bebas-neue-latin-400-normal.woff2'],
	['@fontsource/bebas-neue/files/bebas-neue-latin-ext-400-normal.woff2', 'bebas-neue-latin-ext-400-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-400-normal.woff2', 'barlow-latin-400-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-500-normal.woff2', 'barlow-latin-500-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-600-normal.woff2', 'barlow-latin-600-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-700-normal.woff2', 'barlow-latin-700-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-ext-400-normal.woff2', 'barlow-latin-ext-400-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-ext-500-normal.woff2', 'barlow-latin-ext-500-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-ext-600-normal.woff2', 'barlow-latin-ext-600-normal.woff2'],
	['@fontsource/barlow/files/barlow-latin-ext-700-normal.woff2', 'barlow-latin-ext-700-normal.woff2'],
];

await mkdir(OUT, { recursive: true });
for (const [srcRel, destName] of copies) {
	const src = path.join(ROOT, 'node_modules', srcRel);
	await copyFile(src, path.join(OUT, destName));
	console.log(`  ✓ ${destName}`);
}

console.log('Fonts synced to public/fonts');
