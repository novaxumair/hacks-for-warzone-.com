/** Keep internal link anchor text short for SEO audits (~55 chars). */
export function shortLinkLabel(text: string, maxLen = 55): string {
	const normalized = text.trim().replace(/\s+/g, ' ');
	if (normalized.length <= maxLen) return normalized;
	return `${normalized.slice(0, maxLen - 1).trimEnd()}…`;
}
