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
        mdxParser: `${__dirname}/lib/fumadoc-mdx.cjs`,
        homepage: `${__dirname}/app/assets/index.mdx`,
      },
    },
  };
