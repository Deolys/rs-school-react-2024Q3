import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { NotFoundPage } from './pages/not-found-page';
import { MainAsideDetails } from '@components/main-aside-details';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<MainAsideDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
