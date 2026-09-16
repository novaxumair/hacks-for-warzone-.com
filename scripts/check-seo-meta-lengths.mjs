#!/usr/bin/env node
/** Quick check: brand.seo titles ~50–60, descriptions ~140–160. */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');

function pick(re) {
	const m = src.match(re);
	if (!m) throw new Error(`missing ${re}`);
	return m[1].replace(/\\'/g, "'");
}

const brand = {
	name: pick(/(?:^|\n)\tname:\s*'((?:\\'|[^'])*)'/),
	game: pick(/(?:^|\n)\tgame:\s*'((?:\\'|[^'])*)'/),
	antiCheat: pick(/(?:^|\n)\tantiCheat:\s*'((?:\\'|[^'])*)'/),
	email: pick(/(?:^|\n)\tsupportEmail:\s*'((?:\\'|[^'])*)'/),
	primaryKeyword: pick(/\tprimary:\s*'((?:\\'|[^'])*)'/),
};

function fill(input) {
	return input
		.replaceAll('{brand}', brand.name)
		.replaceAll('{game}', brand.game)
		.replaceAll('{antiCheat}', brand.antiCheat)
		.replaceAll('{email}', brand.email)
		.replaceAll('{primaryKeyword}', brand.primaryKeyword)
		.trim();
}

function title(input) {
	const text = fill(input);
	return text.length <= 60 ? text : `${text.slice(0, 57).trim()}…`;
}

function desc(input) {
	let text = fill(input);
	if (text.length < 140) {
		const pad = text.toLowerCase().includes('cheatsforwarzone.com')
			? ' Windows PC license with Ricochet maintenance after patches.'
			: ' Compare plans and guides at cheatsforwarzone.com.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	return text.length <= 160 ? text : `${text.slice(0, 157).trim()}…`;
}

const seoBlock = src.slice(src.indexOf('seo: {'), src.indexOf('\n\tcopy: {'));
const pairs = [...seoBlock.matchAll(/(\w+):\s*\n?\s*'((?:\\'|[^'])*)'/g)];

let bad = 0;
for (const [, key, raw] of pairs) {
	if (key === 'as') continue;
	const value = raw.replace(/\\'/g, "'");
	if (key.endsWith('Title')) {
		const out = title(value);
		const ok = out.length >= 30 && out.length <= 60;
		if (!ok) bad++;
		console.log(ok ? 'OK' : '!!', String(out.length).padStart(3), key, out);
	} else if (key.endsWith('Description')) {
		const out = desc(value);
		const ok = out.length >= 140 && out.length <= 160;
		if (!ok) bad++;
		console.log(ok ? 'OK' : '!!', String(out.length).padStart(3), key, out);
	}
}

if (bad) {
	console.error(`\n${bad} meta fields outside Google-friendly ranges`);
	process.exit(1);
}
console.log('\nAll brand.seo titles/descriptions within Google-friendly ranges.');
