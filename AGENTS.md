# AGENTS.md

Guidance for AI coding agents. Keep it short — this file is always in context.
`CLAUDE.md` is a symlink to this file.

## This is NOT the Next.js you know

Next.js 16 + React 19 with breaking changes — APIs, conventions, and file
structure may differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code (run `npm install`
first if `node_modules` is missing). Heed deprecation notices.

## What this is

Personal photography portfolio for José Maldonado (Spanish-language UI). Photos
come from the Unsplash account `muso0397`; there is no database or CMS.

## Setup & commands

- Package manager: **npm** (`package-lock.json`).
- `npm install` — dependencies.
- `npm run dev` — dev server. `npm run build` — production build.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- No test suite. Verify with `npm run lint` + `npm run build`, and for
  behavior, `npm run dev` and open the route manually.
- Env vars (`.env*` is gitignored): `UNSPLASH_TOKEN` (server),
  `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`, `NEXT_PUBLIC_MAPBOX_USERID`,
  `NEXT_PUBLIC_MAPBOX_STYLEID` (map tiles).

## Before you finish

Run `npm run lint` and `npm run build`. Both must pass.

## Code style

- Only comment corner cases that would otherwise be hard to understand from
  reading the code alone. Omit comments that just restate basic/obvious
  behavior or purely stylistic/static choices.

## Architecture

Next.js App Router, mostly Server Components.

- Routes: [`app/page.tsx`](app/page.tsx) (home, renders
  [`Presentation`](components/Presentation/index.tsx)); `app/(pages)/` holds
  `about`, `collections`, `collections/[id]` and shares
  [`app/(pages)/layout.tsx`](app/(pages)/layout.tsx) (Container + NavBar +
  Footer). [`app/maps/page.tsx`](app/maps/page.tsx) sits **outside** that group
  so it has no shared layout and renders its own Container/NavBar (the map is
  full-bleed).
- Data: [`app/unsplash.ts`](app/unsplash.ts) is the only data layer, on top of
  the resilient [`lib/http.ts`](lib/http.ts) `fetchJson` (5s timeout, errors
  logged, `null` on failure, `failFastStatuses` throws on 401/403). Unsplash's
  demo tier allows 50 requests/hour, so everything is cached for 24h
  (`REVALIDATE`) and the collection/photo pages are prerendered at build
  (`generateStaticParams`) and kept as ISR (`revalidate = 86400`). Lists are
  walked with `per_page=30`; single collections/cards come from the cached
  collections list (no per-collection request); ids are validated against it, so
  unknown ids 404 without spending quota. API response types live in
  [`app/unsplash.types.ts`](app/unsplash.types.ts) (pasted from the API; has
  duplicate-named interfaces that merge).
- Images: Unsplash photos go through `next/image`; the host is allowed in
  [`next.config.ts`](next.config.ts) `images.remotePatterns`. Local assets
  (`Background.jpg`, `me.jpg`, `descarga.png` map marker) are in `public/`.
- Map: [`components/Maps/`](components/Maps/) — `index.tsx` is a
  `dynamic(..., { ssr: false })` wrapper around [`Map.tsx`](components/Maps/Map.tsx)
  (Leaflet needs `window`). Pins live in [`map.json`](map.json)
  (`position`, `title`, `image` from `public/`, optional `collection` = Unsplash
  collection id). [`app/maps/page.tsx`](app/maps/page.tsx) is a Server
  Component that fetches each referenced collection (`getCollectionCard`, needs
  the server-only `UNSPLASH_TOKEN`) and passes them to `Maps`; a pin with a
  collection shows a card linking to `/collections/[id]` instead of `image`.
  Clicking a pin or the popup arrows (order = `map.json` order) flies to it and
  opens the popup when the flight ends. Leaflet's CSS is loaded from unpkg in
  [`app/layout.tsx`](app/layout.tsx).
- Navigation: [`NavBar`](components/NavBar/index.tsx) is a client component
  (mobile hamburger menu, hides the current route's link); links list is
  `sectionLinks` there. The home page's [`MenuBox`](components/MenuBox/index.tsx)
  links are duplicated in `Presentation` — update both when adding a section.
- Fonts: `DM_Sans` → `--font-main`, `Geist_Mono` → `--font-geist-mono`
  (`next/font` in the root layout).

## Conventions

- TypeScript strict. Import alias is `@/*` = repo root (not `~/*`).
- Components: one folder per component, `components/X/index.tsx` +
  `styles.module.css`, default-exported named function. Imported as
  `import classes from "./styles.module.css"`.
- Page-specific styles live next to the page (`styles.module.css`).
- Add `"use client"` only where hooks/browser APIs are needed.
- UI copy is Spanish.
- Match the style of surrounding code; keep diffs minimal.
- Don't add dependencies without a clear need.
- **Git commits:** [Conventional Commits](https://www.conventionalcommits.org/)
  (`type(scope): subject`).
  - Never add a `Co-Authored-By` trailer (or any other AI attribution) to
    commit messages.

## Gotchas

- A rate-limited or invalid `UNSPLASH_TOKEN` (401/403) fails `next build` on
  purpose instead of caching empty pages for 24h. List helpers also throw when a
  request fails; at runtime Next then keeps serving the last good page. Avoid
  repeated cold builds: a build with an empty `.next/cache/fetch-cache` spends
  ~25 of the 50 hourly requests.
- Tailwind v4 is installed (`@tailwindcss/postcss`) but `app/globals.css` does
  not `@import "tailwindcss"`, so utility classes like `h-full` in the root
  layout currently have no effect. Style with CSS Modules.
- `NEXT_PUBLIC_MAPBOX_*` are inlined at build time; changing them needs a
  rebuild.
