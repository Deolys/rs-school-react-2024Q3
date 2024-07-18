import { useContext, type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageRoutes } from './routes';
import { ThemeContext } from './contexts/theme-context';
import { ErrorBoundary } from '@components/error-boundary';
import { FallbackUI } from '@components/fallback-ui';
import './index.scss';

const App = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <ErrorBoundary fallback={<FallbackUI />}>
          <PageRoutes />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

export default App;
