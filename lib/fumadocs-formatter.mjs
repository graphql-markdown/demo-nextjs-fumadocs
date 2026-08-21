/**
 * Fumadocs formatter override for @graphql-markdown.
 *
 * The bundled `@graphql-markdown/formatters/fumadocs` preset appends `.mdx` to
 * internal links, but Fumadocs routes have no file extension (`/docs/types/scalars/string`),
 * so those links 404. This wraps the preset and leaves link URLs untouched.
 */
import {
  createMDXFormatter,
  mdxDeclaration,
  mdxExtension,
} from "@graphql-markdown/formatters/fumadocs";

const formatter = createMDXFormatter();

/** Internal links are used as-is, without a file extension. */
export const formatMDXLink = ({ text, url }) => ({ text, url });

export const {
  formatMDXBadge,
  formatMDXAdmonition,
  formatMDXBullet,
  formatMDXDetails,
  formatMDXFrontmatter,
  formatMDXNameEntity,
  formatMDXSpecifiedByLink,
} = formatter;

export { mdxDeclaration, mdxExtension };
