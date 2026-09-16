/** Shared security header values for Cloudflare + Astro middleware. */

const CSP_BASE = [
	"default-src 'self'",
	"base-uri 'self'",
	"object-src 'none'",
	"frame-ancestors 'none'",
	"form-action 'self' https://checkout",
	"img-src 'self' data: blob: https:",
	"media-src 'self' blob: https:",
	"font-src 'self' data:",
	"style-src 'self' 'unsafe-inline'",
	"upgrade-insecure-requests",
];

/** Strict CSP for production / preview / Cloudflare. */
export const CONTENT_SECURITY_POLICY = [
	...CSP_BASE,
	// Astro island bootstrap injects inline scripts — required for React hydration.
	"script-src 'self' 'unsafe-inline'",
	"script-src-attr 'none'",
	"connect-src 'self'",
	"trusted-types default",
	"require-trusted-types-for 'script'",
].join('; ');

/** Looser CSP so Vite HMR works under `astro dev`. */
export const CONTENT_SECURITY_POLICY_DEV = [
	...CSP_BASE,
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
	"connect-src 'self' ws: wss:",
	"worker-src 'self' blob:",
].join('; ');

export const SECURITY_HEADERS = {
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Frame-Options': 'DENY',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Resource-Policy': 'same-origin',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Origin-Agent-Cluster': '?1',
	'Permissions-Policy':
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
	'Content-Security-Policy': CONTENT_SECURITY_POLICY,
};

export function applySecurityHeaders(headers, { html = false, dev = false } = {}) {
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(key, value);
	}

	if (dev) {
		headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY_DEV);
	}

	if (html) {
		const contentType = headers.get('Content-Type') || '';
		if (!/charset=/i.test(contentType)) {
			headers.set('Content-Type', 'text/html; charset=utf-8');
		}
		headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		headers.set('CDN-Cache-Control', 'no-store');
		headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
	}
}
