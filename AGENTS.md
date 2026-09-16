## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## SEO template (locked)

This repo is a **reusable game template** with locked SEO rules.

- Brand / domain / keywords: [src/data/brand.ts](./src/data/brand.ts) → `npm run sync:brand`
- **Brand Studio (employees):** `npm run dev` → http://localhost:4321/brand-studio/
- Employee playbook: [TEMPLATE-SEO.md](./TEMPLATE-SEO.md)
- Cursor rules: `.cursor/rules/seo-locked.mdc`, `.cursor/rules/seo-content.mdc`

When retargeting another game: edit `brand.ts` first, then simple-pages / FAQs. Keep simple language, short pages, and the same title → H1 → intro → sections formula. Do not invent a new SEO architecture.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
