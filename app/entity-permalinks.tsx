'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// GraphQL-Markdown emits field/argument names as self links (`href="#"`)
// because section header ids are disabled. Point each one at its heading id
// so the name works as a permalink. Re-run on every route change.
export function EntityPermalinks() {
  const pathname = usePathname();

  useEffect(() => {
    document
      .querySelectorAll<HTMLAnchorElement>(
        "#nd-page :is(h3, h4, h5)[id] a[href='#']",
      )
      .forEach((link) => {
        const heading = link.closest('[id]');
        if (heading) {
          link.setAttribute('href', `#${heading.id}`);
          link.classList.add('gqlmd-permalink');
        }
      });
  }, [pathname]);

  return null;
}
