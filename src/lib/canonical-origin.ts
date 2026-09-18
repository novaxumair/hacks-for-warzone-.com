/** Canonical public origin — must match src/data/brand.ts url (sync-brand). */
export const CANONICAL_ORIGIN = 'https://hacksforwarzone.com';
export const CANONICAL_HOST = 'hacksforwarzone.com';

/** Legacy hosts that 301 to the canonical apex (see worker.ts LEGACY_HOSTS). */
export const LEGACY_HOSTS = [
	'cheatsforwarzone.com',
	'www.cheatsforwarzone.com',
	'warzonehacks.org',
	'www.warzonehacks.org',
	'warzonecheats.org',
	'www.warzonecheats.org',
	'rustcheats.co',
	'www.rustcheats.co',
	'bestrustcheats.com',
	'www.bestrustcheats.com',
	'rustcheat.co',
	'www.rustcheat.co',
	'theislehacks.org',
	'www.theislehacks.org',
	'bestislecheats.com',
	'www.bestislecheats.com',
	'theislehack.org',
	'www.theislehack.org',
	'thefinalscheats.org',
	'www.thefinalscheats.org',
] as const;

/** Regex-safe legacy origins for sitemap XML rewrite (http + https, apex + www). */
const LEGACY_ORIGIN_PATTERN = new RegExp(
	`https?:\\/\\/(?:www\\.)?(?:${LEGACY_HOSTS.map((h) => h.replace(/^www\./, '')).filter((h, i, a) => a.indexOf(h) === i).join('|')})`,
	'gi',
);

/** Rewrite stale sitemap XML that still references a legacy apex. */
export function rewriteLegacyOriginsInSitemapXml(xml: string): string {
	return xml.replace(LEGACY_ORIGIN_PATTERN, CANONICAL_ORIGIN);
}

/** Fail CI when built sitemaps still mention a legacy host. */
export function findLegacyHostsInText(text: string): string[] {
	const found = new Set<string>();
	for (const host of LEGACY_HOSTS) {
		if (text.toLowerCase().includes(host)) found.add(host);
	}
	return [...found].sort();
}
