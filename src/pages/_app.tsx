import type { JSX } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { FallbackUI } from '@/components/fallback-ui';
import { ThemeContext, ThemeProvider } from '@/contexts/theme-context';
import { wrapper } from '@/store';
import '@/styles/global.scss';
import { AppProps } from 'next/app';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';

export function App({ Component, pageProps }: AppProps): JSX.Element {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="description"
          content="Next.js app for searching and downloading information about anime"
        />
        <title>RS school. React</title>
      </Head>
      <ThemeProvider>
        <ThemeWrapper>
          <ErrorBoundary fallback={<FallbackUI />}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeWrapper>
      </ThemeProvider>
    </Provider>
  );
}

function ThemeWrapper({ children }: { children: JSX.Element }): JSX.Element {
  const { theme } = useContext(ThemeContext);
  return <div className={`app ${theme}`}>{children}</div>;
}

export default App;
