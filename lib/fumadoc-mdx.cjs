const mdxDeclaration = `
import { Heading } from 'fumadocs-ui/components/heading';
import { Callout } from 'fumadocs-ui/components/callout';
import Chip from '@mui/material/Chip';
`;

const formatMDXAdmonition = (
  { text, title, type },
  meta,
) => {
  const asideType = type === "warning" ? "warn" : "info";
  return `<Callout type="${asideType}" title="${title}">${text}</Callout>`;
};

const formatMDXBadge = ({ text, classname }) => {
  const color = classname === "DEPRECATED" ? 'warning' : 'info';
  return `<Chip color="${color}" label="${text}" size="small" variant="outlined"/>`;
};

module.exports = {
  mdxDeclaration,
  formatMDXAdmonition,
  formatMDXBadge,
};