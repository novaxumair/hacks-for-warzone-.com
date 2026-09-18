#!/usr/bin/env node
/**
 * Guardrail: Cloudflare Workers static assets allow max 100 dynamic _redirects rules.
 * All production redirects live in src/worker.ts + functions/*.json — keep _redirects empty.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REDIRECTS = path.join(ROOT, 'public/_redirects');
const DIST_REDIRECTS = path.join(ROOT, 'dist/_redirects');
const MAX_RULES = 0;

function countRules(text) {
	let rules = 0;
	for (const line of text.split(/\r?\n/)) {
		const t = line.trim();
		if (!t || t.startsWith('#')) continue;
		rules += 1;
	}
	return rules;
}

function validateFile(label, filePath) {
	if (!existsSync(filePath)) return;
	const text = readFileSync(filePath, 'utf8');
	const rules = countRules(text);
	if (rules > MAX_RULES) {
		console.error(`✗ ${label}: ${rules} redirect rules (max ${MAX_RULES} for Cloudflare safety)`);
		process.exit(1);
	}
	if (/\*\s|\s\*\/|\/\*/.test(text)) {
		console.error(`✗ ${label}: splat rules are not allowed — use src/worker.ts instead`);
		process.exit(1);
	}
	console.log(`✓ ${label}: ${rules} redirect rule(s) (within Cloudflare limit)`);
}

validateFile('public/_redirects', REDIRECTS);
if (existsSync(path.join(ROOT, 'dist'))) {
	validateFile('dist/_redirects', DIST_REDIRECTS);
}

function readBrandHost() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/url:\s*'([^']+)'/);
	if (!m) throw new Error('brand.ts missing url');
	return new URL(m[1]).hostname;
}

const MIDDLEWARE = path.join(ROOT, 'functions/_middleware.js');
if (existsSync(MIDDLEWARE)) {
	const middleware = readFileSync(MIDDLEWARE, 'utf8');
	const canonicalHost = readBrandHost();
	const wwwHost = `www.${canonicalHost}`;
	const legacyBlock = middleware.match(/LEGACY_HOSTS[\s\S]*?\);/)?.[0] ?? '';
	if (legacyBlock.includes(`'${canonicalHost}'`) || legacyBlock.includes(`'${wwwHost}'`)) {
		console.error('✗ functions/_middleware.js: canonical host must not appear in LEGACY_HOSTS');
		process.exit(1);
	}
	if (!middleware.includes(`const WWW_HOST = '${wwwHost}';`)) {
		console.error(`✗ functions/_middleware.js: WWW_HOST must be ${wwwHost}`);
		process.exit(1);
	}
	if (!middleware.includes(`const CANONICAL_HOST = '${canonicalHost}';`)) {
		console.error(`✗ functions/_middleware.js: CANONICAL_HOST must be ${canonicalHost}`);
		process.exit(1);
	}
	console.log('✓ functions/_middleware.js: canonical host redirect guardrails OK');
}
