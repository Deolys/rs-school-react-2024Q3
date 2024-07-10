import { useState, useEffect, useCallback } from 'react';
import type { JSX } from 'react';
import { CardList } from '@components/card-list';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import classes from './main.module.scss';
import { ICard, PaginationData } from '@services/interfaces';
import { Pagination } from '@components/pagination';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/use-search-query';

export function Main(): JSX.Element {
  const [cardsData, setCardsData] = useState<ICard[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useSearchQuery('search-term');

  const searchCards = useCallback(
    (searchTerm: string): void => {
      const newSearchParams: { page: string; q?: string } = { page: '1' };
      if (searchTerm) {
        newSearchParams.q = searchTerm;
      }
      setSearchParams(newSearchParams);
      setCurrentPage(1);
      setSearchQuery(searchTerm);
    },
    [setSearchParams, setSearchQuery],
  );

  useEffect(() => {
    searchParams.set('q', searchQuery);
    setSearchParams(searchParams);
    const page = searchParams.get('page');
    setCurrentPage(Number(page ?? 1));

    setIsLoading(true);
    api
      .searchCards(searchQuery, currentPage)
      .then((fetchedCards) => {
        setCardsData(fetchedCards?.data || []);
        setPaginationData(fetchedCards?.pagination || null);
      })
      .catch((error) => {
        console.error('Error while fetching cards:', error);
        setError('The search failed. Please, try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, currentPage, searchParams, setSearchParams]);

  const onPageChange = (page: number): void => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  return (
    <>
      <Header>
        <Search searchCards={searchCards} />
      </Header>
      <main className={classes.wrapper}>
        <CardList cards={cardsData} isLoading={isLoading} errorMessage={error} />
        {!isLoading && !error && cardsData.length > 0 && (
          <Pagination
            paginationData={paginationData}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </main>
    </>
  );
}

export default Main;
