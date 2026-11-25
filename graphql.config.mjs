// Formatter paths must be absolute: a relative path is not resolved from the project folder
const local = (path) => new URL(path, import.meta.url).href;

const schema =
  "https://raw.githubusercontent.com/graphql-markdown/graphql-markdown/main/tests/e2e/__data__/demo_schema.graphql";
const loaders = {
  UrlLoader: {
    module: "@graphql-tools/url-loader",
  },
};
const printTypeOptions = {
  typeBadges: true,
};

export default {
  projects: {
    default: {
      schema,
      extensions: {
        ["graphql-markdown"]: {
          rootPath: "./content/docs",
          telemetry: false,
          baseURL: ".",
          linkRoot: "/docs",
          loaders,
          printTypeOptions,
          formatter: local("./lib/formatter.mjs"),
          homepage: `${__dirname}/app/assets/index.mdx`,
          docOptions: {
            sectionHeaderId: false,
          },
        },
      },
    },
    // Plain Markdown copy of every page, copied into public/ before the build
    markdown: {
      schema,
      extensions: {
        ["graphql-markdown"]: {
          rootPath: "./.markdown-copies",
          // A copy has the path of its page (/docs/...) once copied into public/
          baseURL: "docs",
          linkRoot: "/docs",
          loaders,
          printTypeOptions,
          formatter: local("./lib/markdown-copy.mjs"),
          homepage: false,
          docOptions: {
            sectionHeaderId: false,
          },
          telemetry: false,
          force: true,
        },
      },
    },
  },
};
