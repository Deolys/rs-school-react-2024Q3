import type { JSX, ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/global.scss';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'RS School. React',
  description: 'Next.js app for searching and downloading information about anime',
};

export function RootLayout({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
