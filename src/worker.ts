/**
 * Cloudflare Worker — canonical host + path redirects before static assets.
 * Locale cannibal 301s live in functions/cannibal-redirects.json (not _redirects)
 * to stay under Cloudflare's 100 dynamic _redirects rule limit.
 */
import { applySecurityHeaders } from './lib/security-headers.js';
import { isBrandStudioPath, resolvePathRedirect } from './worker-redirects.js';
import {
	CANONICAL_HOST,
	CANONICAL_ORIGIN,
	LEGACY_HOSTS,
	rewriteLegacyOriginsInSitemapXml,
} from './lib/canonical-origin.js';

export interface Env {
	ASSETS: Fetcher;
}

const WWW_HOST = `www.${CANONICAL_HOST}`;

const LEGACY_HOST_SET = new Set<string>(LEGACY_HOSTS);

/** /sitemap.xml and /sitemap-*.xml — must stay application/xml for Google Search Console. */
const SITEMAP_PATH = /^\/sitemap(?:-[a-z0-9-]+)?\.xml$/;

function isSitemapPath(pathname: string): boolean {
	return SITEMAP_PATH.test(pathname);
}

function isInsecureRequest(request: Request, url: URL): boolean {
	// Workers see the client-facing URL; trust it over X-Forwarded-Proto (often "http" behind CF TLS).
	if (url.protocol === 'https:') {
		return false;
	}
	const cfVisitor = request.headers.get('CF-Visitor');
	if (cfVisitor?.includes('"scheme":"https"')) {
		return false;
	}
	const forwarded = request.headers.get('X-Forwarded-Proto');
	if (forwarded) {
		return forwarded.split(',')[0]?.trim().toLowerCase() !== 'https';
	}
	return url.protocol === 'http:';
}

function redirectResponse(target: string, status = 301): Response {
	const headers = new Headers({
		Location: target,
		'Cache-Control': 'no-store',
		'CDN-Cache-Control': 'no-store',
		'Cloudflare-CDN-Cache-Control': 'no-store',
	});
	applySecurityHeaders(headers);
	return new Response(null, { status, headers });
}

function canonicalHostRedirect(request: Request, url: URL): Response | null {
	const host = (request.headers.get('host') || url.hostname).split(':')[0].toLowerCase();
	const isLegacy = LEGACY_HOST_SET.has(host);
	const isWww = host === WWW_HOST || url.hostname === WWW_HOST;
	// Apex TLS is terminated at Cloudflare — do not http→https redirect here (causes loops when
	// Workers see url.protocol http: or X-Forwarded-Proto http behind HTTPS).
	const isHttp = host !== CANONICAL_HOST && isInsecureRequest(request, url);

	if (!isLegacy && !isWww && !isHttp) return null;

	const mappedPath = resolvePathRedirect(url.pathname) ?? url.pathname;
	const target = new URL(mappedPath + url.search, CANONICAL_ORIGIN);
	return redirectResponse(target.toString());
}

async function fetchSitemapAsset(env: Env, pathname: string): Promise<Response> {
	// Pathname-only fetch — hostname is ignored by the ASSETS binding.
	const assetRequest = new Request(new URL(pathname, 'https://assets.local'));
	const response = await env.ASSETS.fetch(assetRequest);
	const upstreamType = response.headers.get('Content-Type') || '';

	if (!response.ok || upstreamType.includes('text/html')) {
		const headers = new Headers();
		headers.set('Content-Type', 'text/plain; charset=utf-8');
		applySecurityHeaders(headers, { html: false });
		return new Response('Sitemap not found', { status: 404, headers });
	}

	// Fresh headers — do not copy ASSETS/_headers (duplicate Content-Type breaks browsers + GSC).
	const headers = new Headers();
	headers.set('Content-Type', 'application/xml; charset=utf-8');
	headers.set('Cache-Control', 'public, max-age=3600');
	applySecurityHeaders(headers, { html: false });

	const xml = rewriteLegacyOriginsInSitemapXml(await response.text());
	return new Response(xml, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		const hostRedirect = canonicalHostRedirect(request, url);
		if (hostRedirect) return hostRedirect;

		if (isBrandStudioPath(url.pathname)) {
			const notFoundUrl = new URL('/404.html', url.origin);
			const notFound = await env.ASSETS.fetch(new Request(notFoundUrl, request));
			const headers = new Headers(notFound.headers);
			applySecurityHeaders(headers, { html: true });
			return new Response(notFound.body, { status: 200, headers });
		}

		const pathRedirect = resolvePathRedirect(url.pathname);
		if (pathRedirect) {
			const target = new URL(pathRedirect + url.search, CANONICAL_ORIGIN);
			return redirectResponse(target.toString());
		}

		if (isSitemapPath(url.pathname)) {
			return fetchSitemapAsset(env, url.pathname);
		}

		const response = await env.ASSETS.fetch(request);
		const headers = new Headers(response.headers);
		const contentType = headers.get('Content-Type') || '';
		const isHtml = contentType.includes('text/html');
		applySecurityHeaders(headers, { html: isHtml });

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
};
