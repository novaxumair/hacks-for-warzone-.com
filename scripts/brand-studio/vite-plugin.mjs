/**
 * Vite plugin: Brand Studio API — ONLY during `astro dev`.
 * Never ships to production builds. Localhost + origin checks required.
 */
import {
	validateBrandPayload,
	writeBrandAndSync,
	readBrandForStudio,
	patchBrandField,
	readInlineEdits,
	saveInlineEdit,
} from './write-brand.mjs';

const API_PREFIX = '/brand-studio/api';
const MAX_BODY = 200_000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 40;
const ACTIONS = new Set(['status', 'save', 'patch', 'inline']);

/** @type {Map<string, number[]>} */
const hits = new Map();

function clientIp(req) {
	const raw = req.socket?.remoteAddress || '';
	return raw.replace(/^::ffff:/, '');
}

function isLoopbackIp(ip) {
	return ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
}

function isLocalHostHeader(host) {
	if (!host) return false;
	const h = host.trim().toLowerCase();
	return (
		h.startsWith('localhost:') ||
		h === 'localhost' ||
		h.startsWith('127.0.0.1:') ||
		h === '127.0.0.1' ||
		h.startsWith('[::1]:') ||
		h === '[::1]'
	);
}

function isLocalOrigin(origin) {
	if (!origin) return true; // same-origin navigations may omit; still need Host + IP
	try {
		const u = new URL(origin);
		return u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '::1';
	} catch {
		return false;
	}
}

function rateLimit(ip) {
	const now = Date.now();
	const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
	if (list.length >= RATE_MAX) {
		hits.set(ip, list);
		return false;
	}
	list.push(now);
	hits.set(ip, list);
	return true;
}

function json(res, status, body) {
	const payload = JSON.stringify(body);
	res.statusCode = status;
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Cache-Control', 'no-store');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.end(payload);
}

function deny(res, status, error) {
	json(res, status, { ok: false, error });
}

/**
 * Normalize Vite/Astro request paths so trailingSlash + index.html do not break the API.
 * @param {string | undefined} raw
 * @returns {{ pathname: string, action: string | null }}
 */
function parseApiRequest(raw) {
	let pathname = String(raw || '/').split('?')[0] || '/';
	try {
		pathname = decodeURIComponent(pathname);
	} catch {
		/* keep raw */
	}
	pathname = pathname.replace(/\\/g, '/');
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;
	pathname = pathname.replace(/\/index\.html$/i, '/');
	pathname = pathname.replace(/\/+$/, '') || '/';

	if (pathname === API_PREFIX) return { pathname, action: null };
	if (!pathname.startsWith(`${API_PREFIX}/`)) return { pathname, action: null };

	const rest = pathname.slice(API_PREFIX.length + 1);
	const action = rest.includes('/') ? null : rest.toLowerCase();
	return { pathname, action: action && ACTIONS.has(action) ? action : null };
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function guard(req, res) {
	const ip = clientIp(req);
	if (!isLoopbackIp(ip)) {
		deny(res, 403, 'Brand Studio API is localhost-only');
		return false;
	}
	if (!isLocalHostHeader(req.headers.host || '')) {
		deny(res, 403, 'Invalid Host');
		return false;
	}
	const origin = req.headers.origin;
	if (origin && !isLocalOrigin(origin)) {
		deny(res, 403, 'Invalid Origin');
		return false;
	}
	if (req.headers['x-brand-studio'] !== '1') {
		deny(res, 403, 'Missing studio header');
		return false;
	}
	const expected = process.env.BRAND_STUDIO_TOKEN;
	if (expected) {
		const got = req.headers['x-brand-studio-token'];
		if (got !== expected) {
			deny(res, 401, 'Invalid studio token');
			return false;
		}
	}
	if (!rateLimit(ip)) {
		deny(res, 429, 'Too many requests — wait a minute');
		return false;
	}
	return true;
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		let size = 0;
		req.on('data', (chunk) => {
			size += chunk.length;
			if (size > MAX_BODY) {
				reject(new Error('Body too large'));
				req.destroy();
				return;
			}
			chunks.push(chunk);
		});
		req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
		req.on('error', reject);
	});
}

async function parseJsonBody(req, res) {
	const raw = await readBody(req);
	try {
		return JSON.parse(raw || '{}');
	} catch {
		deny(res, 400, 'Invalid JSON');
		return null;
	}
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {import('connect').NextFunction} next
 */
async function brandStudioApi(req, res, next) {
	const { pathname, action } = parseApiRequest(req.url);
	if (!pathname.startsWith(API_PREFIX)) return next();

	// Preflight (rare for same-origin fetch, but keep API self-contained)
	if (req.method === 'OPTIONS') {
		res.statusCode = 204;
		res.setHeader('Allow', 'GET, POST, OPTIONS');
		res.setHeader('Cache-Control', 'no-store');
		res.end();
		return;
	}

	if (!guard(req, res)) return;

	try {
		if (action === 'status' && req.method === 'GET') {
			return json(res, 200, {
				ok: true,
				dev: true,
				tokenRequired: Boolean(process.env.BRAND_STUDIO_TOKEN),
				brand: readBrandForStudio(),
				endpoints: ['status', 'save', 'patch', 'inline'],
			});
		}

		if (action === 'save' && req.method === 'POST') {
			const parsed = await parseJsonBody(req, res);
			if (!parsed) return;
			const checked = validateBrandPayload(parsed);
			if (!checked.ok) return deny(res, 400, checked.error);

			const result = writeBrandAndSync(checked.data);
			return json(res, 200, {
				ok: true,
				message: 'Saved permanently to brand.ts. Open the site to confirm.',
				warnings: checked.warnings || [],
				...result,
				brand: readBrandForStudio(),
			});
		}

		if (action === 'patch' && req.method === 'POST') {
			const parsed = await parseJsonBody(req, res);
			if (!parsed) return;
			const result = patchBrandField(parsed.field, parsed.value);
			if (!result.ok) return deny(res, 400, result.error);
			return json(res, 200, {
				ok: true,
				message: 'Saved. Page will refresh.',
				...result,
			});
		}

		if (action === 'inline' && req.method === 'GET') {
			return json(res, 200, { ok: true, edits: readInlineEdits() });
		}

		if (action === 'inline' && req.method === 'POST') {
			const parsed = await parseJsonBody(req, res);
			if (!parsed) return;
			const result = saveInlineEdit(parsed.path, parsed.key, parsed.value);
			if (!result.ok) return deny(res, 400, result.error);
			return json(res, 200, { ok: true, message: 'Inline text saved.', ...result });
		}

		return deny(
			res,
			404,
			`Unknown Brand Studio endpoint: ${req.method} ${pathname} (use /brand-studio/api/{status|save|patch|inline}/)`,
		);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Server error';
		return deny(res, 500, message);
	}
}

export function brandStudioPlugin() {
	return {
		name: 'brand-studio-localhost-api',
		configureServer(server) {
			const handle = (req, res, next) => {
				Promise.resolve(brandStudioApi(req, res, next)).catch((err) => {
					const message = err instanceof Error ? err.message : 'Server error';
					if (!res.headersSent) deny(res, 500, message);
				});
			};

			const mountFirst = () => {
				const stack = server.middlewares.stack;
				// Remove prior mounts of this handler (dev HMR / double configure).
				for (let i = stack.length - 1; i >= 0; i--) {
					if (stack[i]?.handle === handle) stack.splice(i, 1);
				}
				stack.unshift({ route: '', handle });
			};

			// Before Vite internals…
			mountFirst();
			// …and again after Astro/Vite finish installing theirs (trailingSlash etc.).
			return () => {
				mountFirst();
			};
		},
	};
}
