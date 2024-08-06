import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import React, { type ReactNode, useContext, type JSX } from 'react';
import { ThemeContext, ThemeProvider } from './contexts/theme-context';
import { store } from './store';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './components/error-boundary';
import { FallbackUI } from './components/fallback-ui';
import { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';

import appStylesHref from './index.scss?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: appStylesHref }];

export const meta: MetaFunction = () => {
  return [
    {
      tagName: 'link',
      rel: 'icon',
      href: 'main/favicon.ico',
      type: 'image/x-icon',
    },
    {
      charset: 'utf-8',
      title: 'RS School. Remix app',
      viewport: 'width=device-width,initial-scale=1',
    },
  ];
};

export default function App(): JSX.Element {
  return (
    <html>
      <head>
        <link rel="icon" href="/main/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <React.StrictMode>
          <ThemeProvider>
            <AppWrapper>
              <Outlet />
            </AppWrapper>
            <Scripts />
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}

function AppWrapper({ children }: { children: ReactNode }): ReactNode {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary fallback={<FallbackUI />}>
        <Provider store={store}>{children}</Provider>
      </ErrorBoundary>
    </div>
  );
}
