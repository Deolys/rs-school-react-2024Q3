import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { NotFoundPage } from './pages/not-found-page';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
