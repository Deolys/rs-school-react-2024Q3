import { CardsAndPages } from '@/components/cards-and-pages';
import { Loading } from '@/components/loading';
import { MainLayout } from '@/components/main-layout';
import { Suspense } from 'react';

export default async function Main({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.q?.toString() || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <MainLayout
      cardsAndPages={
        <Suspense key={query + currentPage} fallback={<Loading />}>
          <CardsAndPages query={query} page={currentPage} />
        </Suspense>
      }
    />
  );
}
