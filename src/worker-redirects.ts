import cannibalRedirects from '../functions/cannibal-redirects.json';
import pathRedirects from '../functions/path-redirects.json';

export const PATH_REDIRECTS = pathRedirects as Record<string, string>;

export const CANNIBAL_REDIRECTS = cannibalRedirects as Record<string, string>;

export function isBrandStudioPath(pathname: string): boolean {
	return (
		pathname === '/brand-studio' ||
		pathname.startsWith('/brand-studio/') ||
		pathname === '/__brand' ||
		pathname.startsWith('/__brand/')
	);
}

export function xmlTrailingSlashRedirect(pathname: string): string | null {
	if (!pathname.endsWith('.xml/')) return null;
	return pathname.slice(0, -1);
}

/** Matches Astro trailingSlash: 'always'. */
export function trailingSlashRedirect(pathname: string): string | null {
	if (!pathname || pathname === '/' || pathname.includes('.') || pathname.endsWith('/')) {
		return null;
	}
	return `${pathname}/`;
}

export function resolvePathRedirect(pathname: string): string | null {
	const target =
		PATH_REDIRECTS[pathname] ??
		CANNIBAL_REDIRECTS[pathname] ??
		xmlTrailingSlashRedirect(pathname) ??
		trailingSlashRedirect(pathname);
	if (!target || target === pathname) return null;
	return target;
}
