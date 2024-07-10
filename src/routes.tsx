import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { NotFoundPage } from './pages/not-found-page';
import { CardDetails } from '@components/card-details';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<CardDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
