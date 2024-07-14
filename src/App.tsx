import type { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageRoutes } from './routes';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};

export default App;
