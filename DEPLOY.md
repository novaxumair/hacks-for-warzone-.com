# Deploy cheatsforwarzone.com

Step-by-step guide to deploy the Warzone Cheats static site to **cheatsforwarzone.com** on Cloudflare Pages, configure DNS, and submit to Google Search Console.

## Prerequisites

- Node.js **≥ 22.12.0**
- Cloudflare account with access to **cheatsforwarzone.com** DNS
- Wrangler CLI (included as dev dependency): `npx wrangler login`

## 1. Build and validate locally

From the project root:

```bash
npm install
npm run generate:i18n
node scripts/generate-blog-posts.mjs
npm run build:validate
```

`build:validate` runs `astro build` then `scripts/validate-sitemaps.mjs`. All sitemap checks must pass before deploying.

Expected output: **556** indexable HTML pages (25 English marketing + 15 blog URLs + 21 locales × 25 pages Vanguard).

## 2. Cloudflare Workers (Git-connected)

This repo deploys as a **Worker with static assets** (`wrangler.toml` → `./dist` + `src/worker.ts`).

In **Workers & Pages** → your Worker → **Settings** → **Build**:

| Setting | Value |
|---------|--------|
| **Production branch** | `main` |
| **Root directory** | `/` (repo root) |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` (or `npm run deploy`) |
| **Environment variable** | `NODE_VERSION=22` |

Workers Builds runs the build command **before** the deploy command. Astro must produce `./dist` before Wrangler uploads assets.

If the build command is left empty, `package.json` `postinstall` still builds on Workers CI when `dist/` is missing — but setting **`npm run build`** explicitly is recommended.

`npm run deploy` runs `npm run build && wrangler deploy` for one-step CLI deploys.

## 3. Cloudflare Pages project (legacy option)

### Option A — Git-connected Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select this repository.
3. Configure build settings:
   - **Project name:** `rustscheats` (existing) or create a new project
   - **Production branch:** `main` (or `master`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 22 (set via environment variable `NODE_VERSION=22` if needed)
4. Save and deploy. Cloudflare runs the build on Vanguard push.

### Option B — Direct upload / Wrangler CLI

```bash
npm run build:validate
npm run pages:deploy
```

This runs `wrangler pages deploy dist --project-name=cheatsforwarzone` (see `wrangler.toml`).

## 3. Custom domain and DNS

Add **cheatsforwarzone.com** as the primary custom domain on the Pages project.

### Apex (cheatsforwarzone.com)

In **Cloudflare DNS** for the zone:

| Type  | Name | Content              | Proxy |
|-------|------|----------------------|-------|
| CNAME | `@`  | `<pages-subdomain>.pages.dev` | Proxied (orange cloud) |

Cloudflare CNAME flattening handles apex records automatically.

### www → apex redirect

1. Add a DNS record for `www` pointing to the same Pages project (proxied CNAME or A record).
2. In **Rules** → **Redirect Rules** (or Bulk Redirects), create:
   - **Source:** `cheatsforwarzone.com/*`
   - **Target:** `https://cheatsforwarzone.com/${1}`
   - **Status:** 301

The deployed `functions/_middleware.js` also enforces apex canonical host, legacy domain redirects (`cheatsforwarzone.com`, `.net`, `.com`), and legacy path redirects.

### SSL / HTTPS

1. **SSL/TLS** → **Overview** → set mode to **Full (strict)**.
2. **Edge Certificates** → enable **Always Use HTTPS**.
3. After enabling, **Caching** → **Configuration** → **Purge Everything** once.

## 4. Post-deploy smoke test

Verify these URLs return **200** with correct content:

- `https://cheatsforwarzone.com/`
- `https://cheatsforwarzone.com/es/`
- `https://cheatsforwarzone.com/warzone-cheats/`
- `https://cheatsforwarzone.com/warzone-aimbot/`
- `https://cheatsforwarzone.com/sitemap.xml`
- `https://cheatsforwarzone.com/robots.txt`

Verify redirects:

- `http://cheatsforwarzone.com` → `https://cheatsforwarzone.com` (301)
- `https://cheatsforwarzone.com` → `https://cheatsforwarzone.com` (301)
- Legacy domains (e.g. `cheatsforwarzone.com`) → `https://cheatsforwarzone.com` (301)
- `/sitemap-index.xml` → `/sitemap.xml` (301)
- Legacy paths (e.g. `/fortnite-hacks/`) → Call of Duty: Warzone equivalents (301)

## 5. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **Domain** → enter `cheatsforwarzone.com`.
3. Verify ownership via the **DNS TXT record** Cloudflare provides (add in Cloudflare DNS, wait for propagation, then confirm in GSC).
4. After verification, open **Sitemaps** and submit:
   ```
   https://cheatsforwarzone.com/sitemap.xml
   ```
   Remove any legacy submissions (`sitemap-index.xml`, old `cheatsforwarzone.com` URLs).
5. Use **URL Inspection** to request indexing for:
   - Homepage (`/`)
   - Pillar page (`/warzone-cheats/`)
   - Key landing pages (`/warzone-aimbot/`, `/warzone-esp/`, `/warzone-cheats-2026/`, etc.)
   - A sample of locale homepages (`/es/`, `/de/`, `/fr/`)
6. Monitor **Pages** (Coverage), **Core Web Vitals**, and **International targeting** (hreflang) over the following weeks.

## 6. Ongoing maintenance

| Task | Command / action |
|------|------------------|
| Regenerate i18n content | `npm run generate:i18n` (after editing `scripts/i18n-data/*`) |
| Regenerate blog posts | `node scripts/generate-blog-posts.mjs` |
| Full build + SEO validation | `npm run build:validate` |
| Refresh gallery images | `npm run fetch:images` then `npm run optimize:images` |
| Redeploy | Push to Git (auto) or `npm run pages:deploy` |

## Checklist

- [ ] `npm run build:validate` passes locally
- [ ] Cloudflare Pages project attached to this repo
- [ ] Custom domain `cheatsforwarzone.com` attached and active
- [ ] `www` redirects to apex
- [ ] Legacy domains 301 to `cheatsforwarzone.com`
- [ ] Always Use HTTPS enabled
- [ ] `robots.txt` and sitemaps serve from `https://cheatsforwarzone.com`
- [ ] Google Search Console domain verified
- [ ] `sitemap.xml` submitted in GSC
- [ ] Homepage and `/warzone-cheats/` requested for indexing
