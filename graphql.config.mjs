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
        mdxParser: "@graphql-markdown/formatters/fumadocs",
        homepage: `${__dirname}/app/assets/index.mdx`,
      },
    },
  };
