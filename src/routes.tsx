import type { JSX } from 'react';
import { Main } from './pages/main';
import { Route, Routes } from 'react-router-dom';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};
