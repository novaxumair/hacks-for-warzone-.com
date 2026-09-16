import { defineMiddleware } from 'astro:middleware';
import { applySecurityHeaders } from './lib/security-headers.js';
import { resolvePathRedirect } from './worker-redirects.js';

function isBrandStudioPage(pathname: string): boolean {
	return pathname === '/brand-studio' || pathname === '/brand-studio/';
}

/**
 * Applies Trust & Safety headers during `astro dev` / `astro preview`
 * so Lighthouse audits see the same protections as production.
 *
 * Brand Studio page: blocked in production builds and non-localhost hosts.
 * Write API lives only in the Vite dev plugin (never in dist) and has its own IP checks.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const redirectPath = resolvePathRedirect(context.url.pathname);
	if (redirectPath) {
		const target = new URL(redirectPath, context.url.origin);
		return context.redirect(target.toString(), 301);
	}

	if (isBrandStudioPage(context.url.pathname)) {
		const host = context.url.hostname;
		const localHost = host === 'localhost' || host === '127.0.0.1' || host === '::1';

		if (import.meta.env.PROD || !localHost) {
			return new Response('Brand Studio is only available on localhost during astro dev.', {
				status: 404,
				headers: {
					'Content-Type': 'text/plain; charset=utf-8',
					'Cache-Control': 'no-store',
					'X-Robots-Tag': 'noindex, nofollow',
				},
			});
		}
	}

	const response = await next();
	const headers = new Headers(response.headers);
	const contentType = headers.get('Content-Type') || '';
	const isHtml = contentType.includes('text/html');

	if (isBrandStudioPage(context.url.pathname)) {
		headers.set('X-Robots-Tag', 'noindex, nofollow');
		headers.set('Cache-Control', 'no-store');
	}

	applySecurityHeaders(headers, {
		html: isHtml,
		dev: import.meta.env.DEV,
	});

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});
