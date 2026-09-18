#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const MAX_LEN = 55;
const singleFile = process.argv[2] ? path.resolve(process.argv[2]) : null;

function walkHtml(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

const byText = new Map();
const long = [];
const re = /<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;

const files = singleFile ? [singleFile] : walkHtml(ROOT);
for (const file of files) {
	const html = readFileSync(file, 'utf8');
	let m;
	while ((m = re.exec(html))) {
		const href = m[1];
		if (href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
		if (href.startsWith('http') && !href.includes('hacksforwarzone.com')) continue;
		const text = m[2]
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
		if (!text || text.length < 2) continue;
		if (!href.startsWith('/') && !href.startsWith('http')) continue;

		if (text.length > MAX_LEN) {
			long.push({ file: path.relative(process.cwd(), file), len: text.length, text, href });
		}
		const key = text.toLowerCase();
		if (!byText.has(key)) byText.set(key, []);
		byText.get(key).push({ href, text, file: path.relative(process.cwd(), file) });
	}
}

const dup = [...byText.entries()].filter(([, items]) => new Set(items.map((i) => i.href)).size > 1);
dup.sort((a, b) => b[1].length - a[1].length);
long.sort((a, b) => b.len - a.len);

console.log('DUPLICATE anchor text → multiple URLs:', dup.length);
for (const [t, items] of dup.slice(0, 30)) {
	const hrefs = [...new Set(items.map((i) => i.href))];
	console.log(`  "${t}" → ${hrefs.join(' | ')}`);
}
console.log('\nLONG anchors (>55 chars):', long.length);
for (const x of long.slice(0, 25)) {
	console.log(`  ${x.len} "${x.text.slice(0, 70)}${x.len > 70 ? '…' : ''}" → ${x.href}`);
}
