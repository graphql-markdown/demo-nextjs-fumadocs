# GraphQL-Markdown + Next.js/Fumadocs demo

<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/graphql-markdown/demo-nextjs-fumadocs/tree/main) -->
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/graphql-markdown/demo-nextjs-fumadocs/tree/main)

**Live demo:** [graphql-markdown.dev/demo-nextjs-fumadocs](https://graphql-markdown.dev/demo-nextjs-fumadocs/docs)

## 🚀 Project Structure

Inside your GraphQL-Markdown + [Next.js](https://nextjs.org/)/[Fumadocs](https://fumadocs.vercel.app/) project, you'll see the following folders and files:

```
.
├── app/
|   ├──(home)/               (landing page)
|   ├── api/
│   ├── assets/
│   │   └── index.mdx
│   ├── docs/
│   │   └── [[...slug]]
│   │       └── page.tsx
│   ├── global.css            (neutral preset + reference polish)
|   ├── layout.config.tsx
|   └── layout.tsx
├── tests/
│   └── visual/
│       └── site.spec.ts      (Playwright + Argos screenshots)
├── playwright.config.ts
├── lib/
│   ├── fumadocs-mdx.cjs
│   └── source.ts
├── next.config.mjs
├── graphql.config.mjs
├── postcss.config.mjs
├── source.config.mjs
├── package.json
└── tsconfig.json
```

## Markdown copies and deprecation links

Each type page is also published as plain Markdown (`/docs/types/objects/project.md`) and linked from the page with "View as Markdown". It follows the [Markdown copies](https://graphql-markdown.dev/docs/guides/markdown-copies) guide:

- `graphql.config.mjs` defines a `markdown` project that renders the schema with `lib/markdown-copy.mjs` into `.markdown-copies/docs`.
- `npm run build` copies `.markdown-copies/` into `public/` before `next build`, because Next.js serves `public/` as-is.
- `lib/formatter.mjs` extends the Fumadocs preset: it adds the "View as Markdown" link (`COPIES_URL` is the deployed URL of the pages folder, base path included) and links type names written in backticks in deprecation reasons to their page, using `toLink` from `@graphql-markdown/printer-legacy`.
- The type-level `@deprecatedType` directive on `LegacyProject` renders a "Deprecated" badge and notice on its page and in its Markdown copy, through the `deprecatedTypeTag` and `deprecatedTypeNotice` decorators in `graphql.config.mjs`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                              |
| :------------------------- | :-------------------------------------------------- |
| `npm install`              | Installs dependencies                               |
| `npx gqlmd graphql-to-doc` | Generate documentation from GraphQL schema          |
| `npm run dev`              | Starts local dev server at `localhost:3000`         |
| `npm run build`            | Build your production site to `./dist/`             |
| `npm run start`            | Starts local production server  at `localhost:3000` |
| `npm run test:visual`      | Runs Playwright visual tests (build first, `VISUAL_PORT` sets the port) |

## 🏎️ Quick start

Get your demo up and running with these commands:

```bash
npm install
npx gqlmd graphql-to-doc
npm run dev
```

> 🧑‍🚀 **Edit `graphql.config.msj` to try with your own GraphQL schema.**

## 👀 Want to learn more?

Check out [GraphQL-Markdown's docs](https://graphql-markdown.dev/).
