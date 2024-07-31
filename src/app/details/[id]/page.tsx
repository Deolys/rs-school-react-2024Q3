import { MainLayout } from '@/components/main-layout';
import { Suspense, type JSX } from 'react';
import { CardDetails } from '@/components/card-details';
import { MainAsideDetails } from '@/components/main-aside-details';
import { Loading } from '@/components/loading';
import { CardsAndPages } from '@/components/cards-and-pages';

interface DetailsProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function Details({
  params: { id },
  searchParams,
}: DetailsProps): Promise<JSX.Element> {
  const query = searchParams?.q?.toString() || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <MainLayout cardsAndPages={<CardsAndPages query={query} page={currentPage} />}>
      <MainAsideDetails>
        <Suspense key={query + id} fallback={<Loading />}>
          <CardDetails id={+id} />
        </Suspense>
      </MainAsideDetails>
    </MainLayout>
  );
}

export default Details;
