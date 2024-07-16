import { useContext, type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageRoutes } from './routes';
import { ThemeContext } from './contexts/theme-context';
import './index.scss';

const App = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <PageRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
