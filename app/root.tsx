import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import React, { useContext, type JSX } from 'react';
import { ThemeContext, ThemeProvider } from './contexts/theme-context';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.scss';
import { ErrorBoundary } from './components/error-boundary';
import { FallbackUI } from './components/fallback-ui';

export default function App(): JSX.Element {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <React.StrictMode>
          <Provider store={store}>
            <ThemeProvider>
              <ThemeLayout />
              <Scripts />
            </ThemeProvider>
          </Provider>
        </React.StrictMode>
      </body>
    </html>
  );
}

function ThemeLayout(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary fallback={<FallbackUI />}>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
