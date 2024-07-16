import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from '@components/error-boundary';
import { FallbackUI } from '@components/fallback-ui';
import { ThemeProvider } from './contexts/theme-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary fallback={<FallbackUI />}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
