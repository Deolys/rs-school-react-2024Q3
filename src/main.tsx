import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ErrorBoundary } from '@components/error-boundary';
import { FallbackUI } from '@components/fallback-ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<FallbackUI />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
