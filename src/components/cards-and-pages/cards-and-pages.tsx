import type { JSX } from 'react';
import { api } from '@/services/api';
import { CardList } from '@/components/card-list';
import { Pagination } from '@/components/pagination';

interface CardsAndPagesProps {
  query: string;
  page: number;
}

export async function CardsAndPages({ query, page }: CardsAndPagesProps): Promise<JSX.Element> {
  const cardsPagesData = await api.searchCards(query, page);
  const cards = cardsPagesData.data;
  const pagination = cardsPagesData.pagination;

  return (
    <>
      <CardList cards={cards} />
      <Pagination paginationData={pagination} />
    </>
  );
}

export default CardsAndPages;
