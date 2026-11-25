// lib/formatter.mjs
// Links schema type names written as inline code in deprecation reasons to
// their pages, following the "Link entities in deprecation reasons" recipe:
// https://graphql-markdown.dev/docs/customize/hooks#link-entities-in-deprecation-reasons
import { readFile, writeFile } from "node:fs/promises";
import { relative, sep } from "node:path";

import * as preset from "@graphql-markdown/formatters/fumadocs";
import { toLink } from "@graphql-markdown/printer-legacy";

// Pages render concurrently, so this may hold another page's options: only read
// settings shared by every page (schema, basePath, hierarchy, groups, deprecated, formatMDXLink).
let printOptions;

/**
 * Hook that captures the resolved print options before each page is printed.
 */
const beforePrintTypeHook = (event) => {
  printOptions = event.data.options;
};

/**
 * Replaces inline code names matching a schema type with a link to its page.
 */
const linkEntities = (text) => {
  const schema = printOptions?.schema;
  const rootTypes = [
    schema?.getQueryType(),
    schema?.getMutationType(),
    schema?.getSubscriptionType(),
  ];

  return text.replaceAll(/`([_A-Za-z][_0-9A-Za-z]*)`/g, (match, name) => {
    const type = schema?.getType(name);
    if (!type || name.startsWith("__") || rootTypes.includes(type)) {
      return match;
    }
    const { url } = toLink(type, name, undefined, printOptions);
    return url === "#" ? match : `[\`${name}\`](${url})`;
  });
};

/**
 * Formatter override that links entities in deprecation admonitions, whatever
 * the title case, so the `@deprecatedType` notices (titled "Deprecated") are
 * linked too.
 */
const formatMDXAdmonition = (admonition, meta) => {
  const text =
    admonition.title?.toLowerCase() === "deprecated" && admonition.text
      ? linkEntities(admonition.text)
      : admonition.text;
  return preset.formatMDXAdmonition({ ...admonition, text }, meta);
};

// Public URL of the generated pages' folder (site URL + base path + baseURL)
const COPIES_URL = "https://graphql-markdown.dev/demo-nextjs-fumadocs/docs";

/**
 * Appends a "View as Markdown" link to each page, pointing to its copy.
 */
const afterRenderTypeEntitiesHook = async (event) => {
  // Keep the preset's own hook, if any
  await preset.afterRenderTypeEntitiesHook?.(event);

  const { filePath, outputDir, outputAdapter } = event.data;
  const path = relative(outputDir, filePath)
    .split(sep)
    .join("/")
    .replace(/\.mdx?$/, "");
  const link = `\n\n[View as Markdown](${COPIES_URL}/${path}.md)\n`;

  const page = outputAdapter?.readFile
    ? await outputAdapter.readFile(filePath)
    : await readFile(filePath, "utf8");
  const content = `${page.trimEnd()}${link}`;
  await (outputAdapter?.writeFile
    ? outputAdapter.writeFile(filePath, content)
    : writeFile(filePath, content));
};

// Drop the preset factory, otherwise it takes precedence over the overrides
const { createMDXFormatter, default: _default, ...formatter } = preset;

export default {
  ...formatter,
  beforePrintTypeHook,
  formatMDXAdmonition,
  afterRenderTypeEntitiesHook,
};
