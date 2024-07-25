'use client';

import { ThemeContext, ThemeProvider } from '@/contexts/theme-context';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../error-boundary';
import { FallbackUI } from '../fallback-ui';
import { type ReactNode, useContext } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeWrapper>
          <ErrorBoundary fallback={<FallbackUI />}>{children}</ErrorBoundary>
        </ThemeWrapper>
      </ThemeProvider>
    </Provider>
  );
}

function ThemeWrapper({ children }: { children: ReactNode }): JSX.Element {
  const { theme } = useContext(ThemeContext);
  return <div className={`app ${theme}`}>{children}</div>;
}

export default Providers;
