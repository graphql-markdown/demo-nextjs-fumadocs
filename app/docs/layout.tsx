import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { EntityPermalinks } from '@/app/entity-permalinks';
import type { ReactNode } from 'react';
 
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions} tree={source.pageTree}>
      <EntityPermalinks />
      {children}
    </DocsLayout>
  );
}