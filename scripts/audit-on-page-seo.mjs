#!/usr/bin/env node
/**
 * On-page + technical SEO audit for built HTML.
 * Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;

function walkHtml(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function htmlPath(urlPath) {
	if (urlPath === '/') return 'index.html';
	return `${urlPath.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
}

function decodeHtml(text) {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

function main() {
	if (!fs.existsSync(distDir)) {
		console.error('dist/ not found — run npm run build first');
		process.exit(1);
	}

	const issues = [];
	const titles = new Map();
	const descs = new Map();
	let indexable = 0;

	for (const file of walkHtml(distDir)) {
		const rel = path.relative(distDir, file).replace(/\\/g, '/');
		const html = fs.readFileSync(file, 'utf8');
		const noindex = /noindex/i.test(html);
		if (noindex) continue;

		indexable++;

		const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '');
		const desc = decodeHtml(
			html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]?.trim() ??
			html.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1]?.trim() ??
			'',
		);
		const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? '';
		const h1Count = (html.match(/<h1\b/gi) ?? []).length;
		const lang = html.match(/<html[^>]*\slang="([^"]+)"/i)?.[1] ?? '';
		const ogTitle = html.match(/property="og:title"\s+content="([^"]+)"/i)?.[1] ?? '';
		const ogDesc = html.match(/property="og:description"\s+content="([^"]+)"/i)?.[1] ?? '';

		if (!title) issues.push({ rel, kind: 'missing-title' });
		else {
			if (title.length < TITLE_MIN) issues.push({ rel, kind: 'short-title', detail: `${title.length}: ${title}` });
			if (title.length > TITLE_MAX) issues.push({ rel, kind: 'long-title', detail: `${title.length}: ${title}` });
			titles.set(title, (titles.get(title) ?? 0) + 1);
		}

		if (!desc) issues.push({ rel, kind: 'missing-description' });
		else {
			if (desc.length < DESC_MIN) issues.push({ rel, kind: 'short-description', detail: `${desc.length}: ${desc.slice(0, 90)}` });
			if (desc.length > DESC_MAX) issues.push({ rel, kind: 'long-description', detail: `${desc.length}: ${desc.slice(0, 90)}` });
			descs.set(desc, (descs.get(desc) ?? 0) + 1);
		}

		if (!canonical) issues.push({ rel, kind: 'missing-canonical' });
		if (!lang) issues.push({ rel, kind: 'missing-lang' });
		if (h1Count === 0) issues.push({ rel, kind: 'missing-h1' });
		if (h1Count > 1) issues.push({ rel, kind: 'multiple-h1', detail: String(h1Count) });
		if (ogTitle && title && ogTitle !== title) issues.push({ rel, kind: 'og-title-mismatch' });
		if (ogDesc && desc && ogDesc.replace(/&amp;/g, '&') !== desc.replace(/&amp;/g, '&')) {
			issues.push({ rel, kind: 'og-description-mismatch' });
		}

		if (/\bricochet \| ricochet\b/i.test(title) || /\bricochet: ricochet\b/i.test(desc)) {
			issues.push({ rel, kind: 'broken-ricochet-meta' });
		}
	}

	const dupTitles = [...titles.entries()].filter(([, c]) => c > 1);
	const dupDescs = [...descs.entries()].filter(([, c]) => c > 1);

	const smPath = path.join(distDir, 'sitemap-en.xml');
	if (fs.existsSync(smPath)) {
		const sm = fs.readFileSync(smPath, 'utf8');
		for (const m of sm.matchAll(/<loc>https:\/\/cheatsforwarzone\.org([^<]*)<\/loc>/g)) {
			const urlPath = m[1] || '/';
			const fp = htmlPath(urlPath.endsWith('/') ? urlPath : `${urlPath}/`);
			if (!fs.existsSync(path.join(distDir, fp))) continue;
			const html = fs.readFileSync(path.join(distDir, fp), 'utf8');
			if (/noindex/i.test(html)) issues.push({ rel: fp, kind: 'noindex-in-sitemap' });
		}
	}

	const fails = issues.filter((i) => !['og-title-mismatch', 'og-description-mismatch'].includes(i.kind));
	const warnings = issues.filter((i) => ['og-title-mismatch', 'og-description-mismatch'].includes(i.kind));

	console.log('=== On-Page SEO Audit (dist/) ===');
	console.log(`Indexable HTML pages: ${indexable}`);
	console.log(`Issues (fail): ${fails.length}`);
	console.log(`Warnings: ${warnings.length}`);
	console.log(`Duplicate titles across locales (expected): ${dupTitles.length}`);
	console.log(`Duplicate descriptions across locales (expected): ${dupDescs.length}`);

	const grouped = {};
	for (const issue of fails) {
		grouped[issue.kind] ??= [];
		grouped[issue.kind].push(issue);
	}

	for (const [kind, rows] of Object.entries(grouped).sort()) {
		console.log(`\n--- ${kind} (${rows.length}) ---`);
		for (const row of rows.slice(0, 12)) {
			console.log(`  ${row.rel}${row.detail ? `: ${row.detail}` : ''}`);
		}
		if (rows.length > 12) console.log(`  ... +${rows.length - 12} more`);
	}

	if (fails.length > 0) {
		console.error('\nOn-page SEO audit FAILED.');
		process.exit(1);
	}

	console.log('\nOn-page SEO audit PASSED.');
}

main();
