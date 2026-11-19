import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'GraphQL-Markdown',
    template: '%s | GraphQL-Markdown',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning={true}>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: { type: 'static', api: '/demo-nextjs-fumadocs/api/search' },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
