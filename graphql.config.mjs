import {
  directiveOccurrence,
  hasDirectiveNamed,
} from "@graphql-markdown/graphql";

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
const decorators = {
  // Mirrors the built-in `@deprecated` treatment (badge + callout) for the
  // type-level `@deprecatedType` directive, which the spec doesn't allow
  // `@deprecated` to target.
  deprecatedTypeTag: {
    predicate: hasDirectiveNamed("deprecatedType"),
    position: { into: "tags" },
    render: (_values, options) =>
      options.formatMDXBadge({ text: "deprecated" }),
  },
  deprecatedTypeNotice: {
    predicate: hasDirectiveNamed("deprecatedType"),
    position: { into: "description" },
    resolve: directiveOccurrence("deprecatedType"),
    render: ([value], options) =>
      options.formatMDXAdmonition(
        { text: String(value.reason), title: "Deprecated", type: "warning" },
        options.meta,
      ),
  },
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
          decorators,
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
          decorators,
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
