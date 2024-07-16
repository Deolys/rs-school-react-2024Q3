import { useState, useEffect, useCallback } from 'react';
import type { JSX } from 'react';
import { CardList } from '@components/card-list';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import classes from './main.module.scss';
import { ICard, PaginationData } from '@services/interfaces';
import { Pagination } from '@components/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/use-search-query';
import { ThemeButton } from '@components/theme-button';

export function Main(): JSX.Element {
  const [cardsData, setCardsData] = useState<ICard[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery] = useSearchQuery('search-term', '');

  const [queryParam, setQueryParam] = useState(searchParams.get('q') || searchQuery);
  const currentPage = searchParams.get('page') || '1';

  const searchCards = useCallback(
    (searchTerm: string): void => {
      const newSearchParams: { page: string; q?: string } = { page: '1' };
      if (searchTerm) {
        newSearchParams.q = searchTerm;
      }
      if (queryParam !== searchTerm) {
        setQueryParam(searchTerm);
        setSearchParams(newSearchParams);
      }
    },
    [setSearchParams, queryParam],
  );

  useEffect(() => {
    setIsLoading(true);
    api
      .searchCards(queryParam, +currentPage)
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
  }, [queryParam, currentPage]);

  const onPageChange = (page: number): void => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleAsideClose = (): void => {
    if (searchParams.has('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <Header>
        <>
          <Search searchCards={searchCards} queryParam={queryParam} />
          <ThemeButton />
        </>
      </Header>
      <div className={classes.container}>
        <main className={classes.wrapper} onClick={handleAsideClose}>
          <CardList cards={cardsData} isLoading={isLoading} errorMessage={error} />
          {!isLoading && !error && cardsData.length > 0 && (
            <Pagination
              paginationData={paginationData}
              currentPage={+currentPage}
              onPageChange={onPageChange}
            />
          )}
        </main>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
