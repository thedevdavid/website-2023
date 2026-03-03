# CLAUDE.md

This file provides context for AI assistants working on this codebase.

## Project Overview

Personal portfolio and blog website for David Levai ([@thedevdavid](https://twitter.com/thedevdavid)). Built as a "digital garden" — a personal site with blog posts, projects, social links, and pages like About/Now/Uses.

- **Repository**: https://github.com/thedevdavid/website-2023
- **Live site**: https://davidlevai.com

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript (strict mode)
- **Content**: Contentlayer with MDX
- **Styling**: Tailwind CSS + CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives + CVA)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build (runs contentlayer build && next build)
pnpm lint         # Run ESLint (next lint)
pnpm format       # Format with Prettier
pnpm preview      # Build and start production server locally
```

## Project Structure

```
app/
├── layout.tsx              # Root layout (fonts, theme, metadata, analytics)
├── globals.css             # Tailwind config, CSS variables, dark mode
├── robots.ts               # robots.txt generation
├── sitemap.ts              # Dynamic sitemap generation
├── opengraph-image.tsx     # Default OG image
├── twitter-image.tsx       # Default Twitter card image
├── newsletter/route.ts     # POST API route for newsletter subscription
├── feed.xml/route.ts       # RSS feed generation
├── (site)/                 # Main site route group
│   ├── layout.tsx          # Navigation + Footer wrapper
│   ├── page.tsx            # Homepage
│   ├── [slug]/             # Dynamic pages (about, now, speaking, teaching)
│   ├── posts/              # Blog listing + /posts/[slug] for individual posts
│   ├── tags/               # Tag listing + /tags/[slug] for filtered posts
│   ├── projects/           # Projects showcase
│   ├── uses/               # Tools/equipment page
│   └── thank-you/          # Newsletter confirmation
└── (social)/               # Social links route group
    └── social/

components/
├── *.tsx                   # Custom components (navigation, heroes, cards, etc.)
├── ui/                     # shadcn/ui primitives (button, card, dialog, etc.)
└── mdx/                    # MDX rendering components (YouTube, newsletter CTA)

content/
├── posts/*.mdx             # Blog posts (4 posts)
└── pages/*.mdx             # Static pages (about, now, speaking, teaching)

lib/
├── content-definitions/    # Contentlayer document type schemas
│   ├── post.ts             # Post type with fields, tags, computed fields
│   ├── page.ts             # Page type definition
│   ├── author.ts           # Author nested type
│   └── series.ts           # Series nested type
├── metadata.ts             # Site metadata + default author config
├── navigation-links.ts     # Navigation menu structure
├── projects-data.ts        # Project data
├── social-data.ts          # Social media profiles
├── uses-data.ts            # Hardware/software list
└── utils.ts                # Utilities (cn, readingTime, debounce, sorting)

types/index.tsx             # All TypeScript type definitions
public/                     # Static assets (avatars, project media, location photos)
```

## Key Architecture Patterns

### Content Management (Contentlayer)

Content lives in `content/` as MDX files. Contentlayer generates typed data at build time. Configuration is in `contentlayer.config.ts` with document definitions in `lib/content-definitions/`.

**Post frontmatter schema:**
```yaml
title: "Post Title"                     # required
description: "Short description"        # optional
publishedDate: "2023-01-01"             # required
lastUpdatedDate: "2023-06-01"           # optional
status: published                       # required: "draft" | "published"
tags:                                   # optional, from predefined list
  - nextjs
  - typescript
series:                                 # optional
  title: "Series Name"
  order: 1
author:                                 # optional
  name: "Author Name"
  twitterHandle: "@handle"
```

**Page frontmatter schema:**
```yaml
title: "Page Title"                     # required
description: "Short description"        # optional
lastUpdatedDate: "2023-01-01"           # optional
status: published                       # required: "draft" | "published"
```

**Available tags**: technology, productivity, business, remote work, starter, development, docs, freelancing, opinion, jamstack, frontend, javascript, typescript, react, nextjs, gatsby, tailwindcss

**Computed fields**: `slug` (from filename), `readTimeMinutes`, `tagSlugs`, `headings` (for TOC)

Import content in pages via:
```ts
import { allPosts, allPages } from "contentlayer/generated";
```

### Routing

Uses Next.js App Router with route groups `(site)` and `(social)` (no URL impact). Dynamic routes use `[slug]` segments. Only published content is shown in production.

### Styling

- Tailwind CSS with `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge)
- CSS custom properties for theming defined in `app/globals.css`
- Dark mode via `next-themes` with class strategy (`.dark` class)
- Component variants via `class-variance-authority` (CVA)
- Fonts: Inter (body, `--font-inter`) and Space Grotesk (headings, `--font-space`)

### Component Conventions

- **Server components by default** — only add `"use client"` when needed (interactivity, hooks, browser APIs)
- **shadcn/ui components** live in `components/ui/` — do not modify directly, use `npx shadcn-ui add <component>` to add new ones
- Custom components live in `components/` root
- MDX-specific components in `components/mdx/`
- Use `cn()` for className merging everywhere

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to project root (`./`)
- `contentlayer/generated` maps to `.contentlayer/generated`

### Import Order

Prettier auto-sorts imports (via `@ianvs/prettier-plugin-sort-imports`):
1. React
2. Next.js
3. Built-in modules
4. Third-party modules
5. Internal: types → env → config → lib → hooks → components/ui → components → styles → app
6. Relative imports

## Linting & Formatting

- **ESLint**: `next/core-web-vitals` + `prettier` config
- **Prettier**: 120 char width, double quotes, semicolons, trailing commas (es5), auto-sorted imports, sorted Tailwind classes
- **Pre-commit hook**: Husky runs `pnpm lint-staged` which applies ESLint fix + Prettier to staged files
- **lint-staged config**: `.lintstagedrc.js` — runs `next lint --fix` on JS/TS files and Prettier on all supported files

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_BASE_URL` — Site base URL
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — Umami analytics
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` — Plausible analytics
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` — Google Analytics
- `EMAIL_API_BASE` / `NEXT_PUBLIC_EMAIL_API_KEY` / `NEXT_PUBLIC_EMAIL_GROUP_ID` — Newsletter (MailerLite)

Analytics provider is configured in `lib/metadata.ts` (`siteMetadata.analyticsProvider`).

## Site Configuration

All site-wide settings live in `lib/metadata.ts`:
- `defaultAuthor` — Author info (name, handle, job title, location, social profiles, availability)
- `siteMetadata` — Title, description, pagination settings, newsletter/analytics providers, theme default, announcement bar toggle

Navigation links are in `lib/navigation-links.ts`. Projects in `lib/projects-data.ts`. Social profiles in `lib/social-data.ts`.

## Common Tasks

### Adding a new blog post
Create `content/posts/<slug>.mdx` with the required frontmatter fields (title, publishedDate, status). The post will be available at `/posts/<slug>`.

### Adding a new page
Create `content/pages/<slug>.mdx` with required frontmatter (title, status). Add a route in `app/(site)/[slug]/page.tsx` if needed (it already handles dynamic pages).

### Adding a new shadcn/ui component
```bash
npx shadcn-ui add <component-name>
```
This places the component in `components/ui/`.

### Modifying navigation
Edit `lib/navigation-links.ts` to add/remove/reorder menu items.

### Modifying site metadata
Edit `lib/metadata.ts` to change site title, author info, pagination, analytics/newsletter provider, etc.

### Adding a new project
Add an entry to the array in `lib/projects-data.ts`.
