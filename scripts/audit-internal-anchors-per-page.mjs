#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const re = /<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;

function walkHtml(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

const offenders = [];

for (const file of walkHtml(ROOT)) {
	const html = readFileSync(file, 'utf8');
	const byText = new Map();
	let m;
	while ((m = re.exec(html))) {
		const href = m[1];
		if (href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
		if (href.startsWith('http') && !href.includes('hacksforwarzone.com')) continue;
		if (!href.startsWith('/') && !href.startsWith('http')) continue;
		const text = m[2]
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.toLowerCase();
		if (!text || text.length < 2) continue;
		if (!byText.has(text)) byText.set(text, new Set());
		byText.get(text).add(href);
	}
	for (const [text, hrefs] of byText) {
		if (hrefs.size > 1) {
			offenders.push({
				file: path.relative(process.cwd(), file),
				text,
				hrefs: [...hrefs],
			});
		}
	}
}

offenders.sort((a, b) => b.hrefs.length - a.hrefs.length);
console.log('Pages with duplicate anchor text → multiple URLs:', new Set(offenders.map((o) => o.file)).size);
console.log('Total duplicate patterns:', offenders.length);
for (const o of offenders.slice(0, 40)) {
	console.log(`  ${o.file}: "${o.text}" → ${o.hrefs.join(' | ')}`);
}
