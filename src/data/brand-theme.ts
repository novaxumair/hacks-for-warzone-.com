/**
 * Brand theme — accent + canvas drive the full site palette.
 * Components already use --magenta / --bg tokens; Layout injects overrides from brand.theme.
 */
import { brand } from './brand';

export type BrandThemeInput = {
	/** Primary brand accent (buttons, links, focus, highlights) */
	accent: string;
	/** Page canvas / theme-color */
	bg: string;
	/** Optional overrides — Brand Studio can set these; otherwise auto-derived */
	soft?: string;
	deep?: string;
	hover?: string;
	panel?: string;
	elevated?: string;
	line?: string;
	ink?: string;
	inkHeading?: string;
	inkSecondary?: string;
	inkMuted?: string;
	link?: string;
};

export type BrandThemeResolved = {
	accent: string;
	bg: string;
	accentSoft: string;
	accentDeep: string;
	accentHover: string;
	bgPanel: string;
	bgElevated: string;
	bgHover: string;
	line: string;
	lineSoft: string;
	lineStrong: string;
	ink: string;
	inkHeading: string;
	inkSecondary: string;
	inkMuted: string;
	inkFaint: string;
	link: string;
	ok: string;
	warn: string;
	toneVoid: string;
};

export const themeDefaults: BrandThemeInput = {
	accent: '#c026d3',
	bg: '#08090a',
};

export const themePresets: { id: string; label: string; accent: string; bg: string }[] = [
	{ id: 'magenta', label: 'Magenta', accent: '#c026d3', bg: '#08090a' },
	{ id: 'warzone', label: 'Call of Duty: Warzone', accent: '#FF4655', bg: '#0F1923' },
	{ id: 'fortnite', label: 'Fortnite', accent: '#2b9dff', bg: '#0a0e17' },
	{ id: 'apex', label: 'Apex', accent: '#ff6b2c', bg: '#0c0d10' },
	{ id: 'teal', label: 'Teal', accent: '#14b8a6', bg: '#071012' },
	{ id: 'emerald', label: 'Emerald', accent: '#10b981', bg: '#070f0c' },
	{ id: 'gold', label: 'Gold', accent: '#eab308', bg: '#0c0b08' },
	{ id: 'violet', label: 'Violet', accent: '#8b5cf6', bg: '#0b0914' },
	{ id: 'cyan', label: 'Cyan', accent: '#22d3ee', bg: '#070d12' },
	{ id: 'rose', label: 'Rose', accent: '#f43f5e', bg: '#10080c' },
];

function clamp(n: number, min = 0, max = 1) {
	return Math.min(max, Math.max(min, n));
}

/** Normalize #rgb / #rrggbb → #rrggbb lowercase, or null */
export function normalizeHex(input: unknown): string | null {
	if (typeof input !== 'string') return null;
	const t = input.trim();
	const m = t.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
	if (!m) return null;
	let h = m[1].toLowerCase();
	if (h.length === 3) h = h.split('').map((c) => c + c).join('');
	return `#${h}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const h = normalizeHex(hex) ?? '#000000';
	return {
		r: parseInt(h.slice(1, 3), 16),
		g: parseInt(h.slice(3, 5), 16),
		b: parseInt(h.slice(5, 7), 16),
	};
}

function rgbToHex(r: number, g: number, b: number): string {
	const to = (n: number) =>
		Math.round(clamp(n, 0, 255))
			.toString(16)
			.padStart(2, '0');
	return `#${to(r)}${to(g)}${to(b)}`;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
	const { r, g, b } = hexToRgb(hex);
	const R = r / 255;
	const G = g / 255;
	const B = b / 255;
	const max = Math.max(R, G, B);
	const min = Math.min(R, G, B);
	const l = (max + min) / 2;
	if (max === min) return { h: 0, s: 0, l };
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
	else if (max === G) h = ((B - R) / d + 2) / 6;
	else h = ((R - G) / d + 4) / 6;
	return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
	const H = ((h % 1) + 1) % 1;
	const S = clamp(s);
	const L = clamp(l);
	if (S === 0) {
		const v = L * 255;
		return rgbToHex(v, v, v);
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		let T = t;
		if (T < 0) T += 1;
		if (T > 1) T -= 1;
		if (T < 1 / 6) return p + (q - p) * 6 * T;
		if (T < 1 / 2) return q;
		if (T < 2 / 3) return p + (q - p) * (2 / 3 - T) * 6;
		return p;
	};
	const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
	const p = 2 * L - q;
	return rgbToHex(
		hue2rgb(p, q, H + 1 / 3) * 255,
		hue2rgb(p, q, H) * 255,
		hue2rgb(p, q, H - 1 / 3) * 255,
	);
}

function mixHex(a: string, b: string, t: number): string {
	const A = hexToRgb(a);
	const B = hexToRgb(b);
	const u = clamp(t);
	return rgbToHex(A.r + (B.r - A.r) * u, A.g + (B.g - A.g) * u, A.b + (B.b - A.b) * u);
}

/** Build a full dark UI palette from accent + canvas (+ optional tone overrides). */
export function deriveBrandTheme(input: Partial<BrandThemeInput> = {}): BrandThemeResolved {
	const accent = normalizeHex(input.accent) ?? themeDefaults.accent;
	const bg = normalizeHex(input.bg) ?? themeDefaults.bg;
	const a = hexToHsl(accent);
	const softAuto = hslToHex(a.h, clamp(a.s * 0.85, 0.35, 1), clamp(a.l + 0.22, 0.55, 0.82));
	const deepAuto = hslToHex(a.h, clamp(a.s * 1.05, 0.4, 1), clamp(a.l - 0.18, 0.22, 0.45));
	const hoverAuto = hslToHex(a.h, clamp(a.s * 0.95, 0.35, 1), clamp(a.l + 0.1, 0.45, 0.72));
	const panelAuto = mixHex(bg, '#ffffff', 0.035);

	const soft = normalizeHex(input.soft) ?? softAuto;
	const deepIn = normalizeHex(input.deep);
	const deepIsDarkSurface = deepIn != null && hexToHsl(deepIn).l < 0.2;
	const accentDeep = deepIsDarkSurface ? deepAuto : (deepIn ?? deepAuto);
	const hover = normalizeHex(input.hover) ?? hoverAuto;
	const bgPanel = normalizeHex(input.panel) ?? panelAuto;
	const bgElevated =
		normalizeHex(input.elevated) ?? (deepIsDarkSurface ? deepIn! : mixHex(bg, '#ffffff', 0.07));
	const bgHover = mixHex(bgElevated, '#ffffff', 0.06);
	const lineSoft = normalizeHex(input.line) ? mixHex(input.line!, bg, 0.45) : mixHex(bg, '#ffffff', 0.08);
	const line = normalizeHex(input.line) ?? mixHex(bg, '#ffffff', 0.12);
	const lineStrong = normalizeHex(input.line) ? mixHex(input.line!, '#ffffff', 0.22) : mixHex(bg, '#ffffff', 0.18);
	const toneVoid = mixHex(bg, '#000000', 0.35);
	const ink = normalizeHex(input.ink) ?? '#F8FAFC';
	const inkHeading = normalizeHex(input.inkHeading) ?? ink;
	const inkMuted = normalizeHex(input.inkMuted) ?? '#A1A1AA';
	const inkSecondary = normalizeHex(input.inkSecondary) ?? mixHex(ink, inkMuted, 0.55);
	const inkFaint = normalizeHex(input.inkSecondary)
		? mixHex(inkSecondary, inkMuted, 0.42)
		: mixHex(inkMuted, bg, 0.35);
	const link = normalizeHex(input.link) ?? soft;

	return {
		accent,
		bg,
		accentSoft: soft,
		accentDeep,
		accentHover: hover,
		bgPanel,
		bgElevated,
		bgHover,
		line,
		lineSoft,
		lineStrong,
		ink,
		inkHeading,
		inkSecondary,
		inkMuted,
		inkFaint,
		link,
		ok: '#34d399',
		warn: '#f43f5e',
		toneVoid,
	};
}

/** Auto soft / deep / hover / panel from accent + canvas (ignores stored overrides). */
export function autoThemeTones(accentIn: string, bgIn: string) {
	const accent = normalizeHex(accentIn) ?? themeDefaults.accent;
	const bg = normalizeHex(bgIn) ?? themeDefaults.bg;
	const a = hexToHsl(accent);
	return {
		soft: hslToHex(a.h, clamp(a.s * 0.85, 0.35, 1), clamp(a.l + 0.22, 0.55, 0.82)),
		deep: hslToHex(a.h, clamp(a.s * 1.05, 0.4, 1), clamp(a.l - 0.18, 0.22, 0.45)),
		hover: hslToHex(a.h, clamp(a.s * 0.95, 0.35, 1), clamp(a.l + 0.1, 0.45, 0.72)),
		panel: mixHex(bg, '#ffffff', 0.035),
	};
}

const raw = brand as typeof brand & { theme?: Partial<BrandThemeInput> };

export const brandTheme: BrandThemeResolved = deriveBrandTheme({
	accent: raw.theme?.accent,
	bg: raw.theme?.bg,
	soft: raw.theme?.soft,
	deep: raw.theme?.deep,
	hover: raw.theme?.hover,
	panel: raw.theme?.panel,
	elevated: raw.theme?.elevated,
	line: raw.theme?.line,
	ink: raw.theme?.ink,
	inkHeading: raw.theme?.inkHeading,
	inkSecondary: raw.theme?.inkSecondary,
	inkMuted: raw.theme?.inkMuted,
	link: raw.theme?.link,
});

/** Inline style for <html> — overrides @theme defaults site-wide. */
export function brandThemeInlineStyle(theme: BrandThemeResolved = brandTheme): string {
	return Object.entries(brandThemeCssMap(theme))
		.map(([k, v]) => `${k}:${v}`)
		.join(';');
}

/** JS-friendly map for Brand Studio live preview + Layout injection. */
export function brandThemeCssMap(theme: BrandThemeResolved = brandTheme): Record<string, string> {
	const amber = mixHex(theme.accent, '#fbbf24', 0.45);
	return {
		'--bg': theme.bg,
		'--bg-panel': theme.bgPanel,
		'--bg-elevated': theme.bgElevated,
		'--bg-hover': theme.bgHover,
		'--line': theme.line,
		'--line-soft': theme.lineSoft,
		'--line-strong': theme.lineStrong,
		'--ink': theme.ink,
		'--ink-heading': theme.inkHeading,
		'--ink-secondary': theme.inkSecondary,
		'--ink-muted': theme.inkMuted,
		'--ink-faint': theme.inkFaint,
		'--link': theme.link,
		'--magenta': theme.accent,
		'--magenta-soft': theme.accentSoft,
		'--magenta-deep': theme.accentDeep,
		'--accent': theme.accent,
		'--accent-hover': theme.accentHover,
		'--ok': theme.ok,
		'--warn': theme.warn,
		'--tone-void': theme.toneVoid,
		'--tone-night': theme.bg,
		'--tone-body': theme.bg,
		'--tone-surface': theme.bgPanel,
		'--tone-surface-warm': theme.bgPanel,
		'--tone-surface-cool': theme.bgPanel,
		'--tone-raised': theme.bgElevated,
		'--tone-raised-alt': theme.bgHover,
		'--tone-border': theme.line,
		'--tone-border-soft': theme.lineSoft,
		'--tone-text': theme.ink,
		'--tone-text-secondary': theme.inkSecondary,
		'--tone-text-muted': theme.inkMuted,
		'--tone-text-faint': theme.inkFaint,
		'--accent-orange': theme.accent,
		'--accent-coral': theme.accent,
		'--accent-amber': amber,
		'--accent-magenta': theme.accent,
		'--accent-violet': theme.accentDeep,
		'--accent-indigo': theme.accent,
		'--accent-teal': theme.ok,
		'--accent-sky': theme.accentSoft,
		'--accent-emerald': theme.ok,
		'--accent-rose': theme.warn,
		'--g2a-black': theme.bg,
		'--g2a-dark': theme.bg,
		'--g2a-white': theme.bgPanel,
		'--g2a-gray-50': theme.bgElevated,
		'--g2a-gray-100': theme.bgHover,
		'--g2a-gray-200': theme.line,
		'--g2a-gray-400': theme.inkFaint,
		'--g2a-gray-600': theme.inkMuted,
		'--g2a-gray-800': theme.ink,
		'--g2a-orange': theme.accent,
		'--g2a-magenta': theme.accent,
		'--g2a-blue': theme.accentSoft,
		'--g2a-purple': theme.accentDeep,
		'--g2a-green': theme.ok,
		'--g2a-red': theme.warn,
		'--plum-link': theme.link,
		'--color-midnight': theme.bg,
		'--color-surface': theme.bgPanel,
		'--color-surface-raised': theme.bgElevated,
		'--color-border': theme.line,
		'--color-border-strong': theme.lineStrong,
		'--color-ink': theme.ink,
		'--color-muted': theme.inkMuted,
		'--color-faint': theme.inkFaint,
		'--color-violet': theme.accent,
		'--color-orchid': theme.accentSoft,
	};
}

/** Late <style> block — beats Tailwind @theme :root emission reliably. */
export function brandThemeRootCss(theme: BrandThemeResolved = brandTheme): string {
	const body = Object.entries(brandThemeCssMap(theme))
		.map(([k, v]) => `${k}:${v}`)
		.join(';');
	return `:root,html{${body}}`;
}
