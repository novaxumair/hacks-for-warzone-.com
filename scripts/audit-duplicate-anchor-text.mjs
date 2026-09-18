#!/usr/bin/env node
/** Same-page anchors: flag label reused 2+ times (any href). */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const file = path.resolve(process.argv[2] ?? 'dist/index.html');
const re = /<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const html = readFileSync(file, 'utf8');
const counts = new Map();
let m;
while ((m = re.exec(html))) {
	const text = m[2]
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();
	if (!text || text.length < 2) continue;
	counts.set(text, (counts.get(text) ?? 0) + 1);
}
const dup = [...counts.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]);
console.log(path.relative(process.cwd(), file), '— anchor labels used 2+ times:', dup.length);
for (const [t, n] of dup.slice(0, 30)) console.log(`  ${n}x "${t}"`);
