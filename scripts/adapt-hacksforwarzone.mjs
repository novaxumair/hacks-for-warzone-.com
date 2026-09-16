#!/usr/bin/env node
/**
 * Rebrand cheatsforwarzone.com template → hacksforwarzone.com (Warzone Hacks)
 * Run: node scripts/adapt-hacksforwarzone.mjs
 */
import { readFile, writeFile, readdir, rm, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		if (e.name.startsWith('.') && e.name !== '.cursor') continue;
		const full = path.join(dir, e.name);
		if (e.isDirectory()) {
			if (SKIP_DIRS.has(e.name)) continue;
			await walk(full, files);
		} else if (/\.(ts|tsx|astro|mjs|js|json|css|txt|toml|md|mdc)$/i.test(e.name)) {
			files.push(full);
		}
	}
	return files;
}

const REPLACEMENTS = [
	['cheatsforwarzone.com', 'hacksforwarzone.com'],
	['support@cheatsforwarzone.com', 'support@hacksforwarzone.com'],
	['Warzone Cheats', 'Warzone Hacks'],
	['warzone cheats site', 'warzone hacks site'],
	['Warzone Intel', 'Warzone Forums'],
	['Warzone cheats', 'Warzone hacks'],
	['warzone cheats', 'warzone hacks'],
	['Warzone Cheats PC', 'Warzone Hacks PC'],
	['/blog/', '/forums/'],
	['`/blog/`', '`/forums/`'],
	["'/blog/'", "'/forums/'"],
	['"/blog/"', '"/forums/"'],
	['common.blog', 'common.forums'],
	['categoryRow.blog', 'categoryRow.forums'],
	['homeSeo.linkBlog', 'homeSeo.linkForums'],
	['nav.blog', 'nav.forums'],
	['getBlogBasePath', 'getForumBasePath'],
	['getBlogListPosts', 'getForumListPosts'],
	['getAllPostsForLocale', 'getAllThreadsForLocale'],
	['getFeaturedPosts', 'getFeaturedThreads'],
	['getBlogCardImageSrc', 'getForumCardImageSrc'],
	['getBlogIndexHreflangAlternates', 'getForumIndexHreflangAlternates'],
	['getBlogPostHreflangAlternates', 'getForumThreadHreflangAlternates'],
	['getRelatedPostsByCategory', 'getRelatedThreadsByCategory'],
	['getBlogLocaleSwitchHref', 'getForumLocaleSwitchHref'],
	['isBlogPath', 'isForumPath'],
	['absoluteBlogUrl', 'absoluteForumUrl'],
	['blogPosts', 'forumThreads'],
	['blogPostSlugs', 'forumThreadSlugs'],
	['isBlogPostSlug', 'isForumThreadSlug'],
	['BlogIndexPage', 'ForumIndexPage'],
	['BlogPostPage', 'ForumPostPage'],
	['blogLabel', 'forumLabel'],
	['blogTitle', 'forumTitle'],
	['blogDescription', 'forumDescription'],
	['blogH1', 'forumH1'],
	['blogIntro', 'forumIntro'],
	['blogUi', 'forumUi'],
	['blogIndexTopicLinks', 'forumIndexTopicLinks'],
	['getTopicLinksForBlogCategory', 'getTopicLinksForForumCategory'],
	['TOPIC_LINKS.blog', 'TOPIC_LINKS.forums'],
	['blogImageTitle', 'forumImageTitle'],
	['blogImageCaption', 'forumImageCaption'],
];

const UNDETECTED_REMOVALS = [
	[/\bundetected\b/gi, ''],
	[/\bUndetected\b/g, ''],
	[/\s{2,}/g, ' '],
	[/ — —/g, ' —'],
	[/\|\s*\|/g, '|'],
	[/,\s*,/g, ','],
];

function cleanUndetected(text) {
	let out = text;
	for (const [pattern, replacement] of UNDETECTED_REMOVALS) {
		out = out.replace(pattern, replacement);
	}
	return out
		.replace(/  +/g, ' ')
		.replace(/\s+\./g, '.')
		.replace(/\s+,/g, ',')
		.replace(/\s+—/g, ' —')
		.replace(/—\s+/g, '— ')
		.trim();
}

function applyReplacements(text) {
	let out = text;
	for (const [from, to] of REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	if (!text.includes('zadeyo.com/go/') && !text.includes('checkoutUrl')) {
		out = out.replace(/zadeyo/gi, '');
	}
	return cleanUndetected(out);
}

async function processFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (file.includes('adapt-hacksforwarzone.mjs')) continue;
		if (file.includes('blog\\posts.generated') || file.includes('blog/posts.generated')) continue;
		if (file.includes('guides\\guides.generated') || file.includes('guides/guides.generated')) continue;
		const raw = await readFile(file, 'utf8');
		const next = applyReplacements(raw);
		if (next !== raw) {
			await writeFile(file, next);
			changed++;
		}
	}
	console.log(`Updated ${changed} files with bulk replacements`);
}

async function removeGuides() {
	const targets = [
		'src/pages/guides',
		'src/data/guides',
		'src/components/GuideIndexPage.astro',
		'src/components/GuidePostPage.astro',
		'public/images/guides',
	];
	for (const rel of targets) {
		const full = path.join(ROOT, rel);
		try {
			await rm(full, { recursive: true, force: true });
			console.log(`Removed ${rel}`);
		} catch {
			/* ignore */
		}
	}
}

async function removeBlog() {
	const targets = [
		'src/pages/blog',
		'src/pages/[lang]/blog',
		'src/data/blog',
		'src/components/BlogIndexPage.astro',
		'src/components/BlogPostPage.astro',
	];
	for (const rel of targets) {
		const full = path.join(ROOT, rel);
		try {
			await rm(full, { recursive: true, force: true });
			console.log(`Removed ${rel}`);
		} catch {
			/* ignore */
		}
	}
}

async function removeUndetectedPage() {
	await rm(path.join(ROOT, 'src/pages/undetected'), { recursive: true, force: true });
	console.log('Removed undetected page');
}

async function removeZadeyoAssets() {
	await rm(path.join(ROOT, 'public/images/zadeyo-logo.webp'), { force: true });
}

async function updateRobots() {
	const robots = `User-agent: *
Allow: /
Allow: /images/
Disallow: /brand-studio/

Sitemap: https://hacksforwarzone.com/sitemap.xml
`;
	await writeFile(path.join(ROOT, 'public/robots.txt'), robots);
}

async function updateRedirects() {
	const redirects = `# Blog → Forums
/blog/ /forums/ 301
/blog/* /forums/:splat 301

# Guides removed
/guides/ /forums/ 301
/guides/* /forums/ 301

# Undetected page removed
/undetected/ /updates/ 301
`;
	const p = path.join(ROOT, 'public/_redirects');
	const existing = await readFile(p, 'utf8').catch(() => '');
	if (!existing.includes('/forums/')) {
		await writeFile(p, redirects + existing);
	}
}

await processFiles();
await removeGuides();
await removeBlog();
await removeUndetectedPage();
await removeZadeyoAssets();
await updateRobots();
await updateRedirects();
console.log('Done — hacksforwarzone.com adaptation complete.');
