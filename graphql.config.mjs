export default {
    schema:
      "https://raw.githubusercontent.com/graphql-markdown/graphql-markdown/main/tests/e2e/__data__/demo_schema.graphql",
    extensions: {
      ["graphql-markdown"]: {
        rootPath: "./content/docs",
        telemetry: false,
        baseURL: ".",
        linkRoot: "/docs",
        loaders: {
          UrlLoader: {
            module: "@graphql-tools/url-loader",
          },
        },
        printTypeOptions: {
          typeBadges: true,
        },
        formatter: "@graphql-markdown/formatters/fumadocs",
        homepage: `${__dirname}/app/assets/index.mdx`,
        docOptions: {
          sectionHeaderId: false,
        },
      },
    },
  };
