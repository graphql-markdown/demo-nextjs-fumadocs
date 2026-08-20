export default {
    schema: "https://graphql.anilist.co/",
    extensions: {
      ["graphql-markdown"]: {
        rootPath: "./content/docs",
        baseURL: ".",
        linkRoot: "/docs",
        loaders: {
          UrlLoader: {
            module: "@graphql-tools/url-loader",
            options: { method: "POST" },
          },
        },
        printTypeOptions: {
          typeBadges: true,
        },
        // Local wrapper around the Fumadocs preset: it strips the `.mdx` extension
        // from internal links. Revert to "@graphql-markdown/formatters/fumadocs"
        // once the upstream fix is released.
        formatter: `${__dirname}/lib/fumadocs-formatter.mjs`,
        homepage: `${__dirname}/app/assets/index.mdx`,
      },
    },
  };
