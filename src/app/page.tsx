import type { JSX } from 'react';
import { CardsAndPages } from '@/components/cards-and-pages';
import { Loading } from '@/components/loading';
import { MainLayout } from '@/components/main-layout';
import { Suspense } from 'react';

export async function Main({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}): Promise<JSX.Element> {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <MainLayout
      cardsAndPages={
        <Suspense fallback={<Loading />}>
          <CardsAndPages query={query} page={currentPage} />
        </Suspense>
      }
    />
  );
}

export default Main;
