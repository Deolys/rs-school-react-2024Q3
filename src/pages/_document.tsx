import { Head, Html, Main, NextScript } from 'next/document';
import type { JSX } from 'react';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
