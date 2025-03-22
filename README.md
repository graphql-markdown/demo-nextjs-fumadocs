# GraphQL-Markdown + Next.js/Fumadocs demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/graphql-markdown/demo-nextjs-fumadocs/tree/main)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/graphql-markdown/demo-nextjs-fumadocs/tree/main)

## 🚀 Project Structure

Inside your GraphQL-Markdown + [Next.js](https://nextjs.org/)/[Fumadocs](https://fumadocs.vercel.app/) project, you'll see the following folders and files:

```
.
├── app/
|   ├──(home)/
|   ├── api/
│   ├── assets/
│   │   └── index.mdx
│   ├── docs/
│   │   └── [[...slug]]
│   │       └── page.tsx
│   ├── globals.css
|   ├── layout.config.tsx
|   └── layout.tsx
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

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                              |
| :------------------------- | :-------------------------------------------------- |
| `npm install`              | Installs dependencies                               |
| `npx gqlmd graphql-to-doc` | Generate documentation from GraphQL schema          |
| `npm run dev`              | Starts local dev server at `localhost:3000`         |
| `npm run build`            | Build your production site to `./dist/`             |
| `npm run start`            | Starts local production server  at `localhost:3000` |

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