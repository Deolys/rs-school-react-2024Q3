import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { CardList } from '@components/card-list';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import classes from './main.module.scss';
import { ICard, PaginationData } from '@services/interfaces';
import { Pagination } from '@components/pagination';

export function Main(): JSX.Element {
  const [cardsData, setCardsData] = useState<ICard[] | []>([]);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const searchTerm = localStorage.getItem('search-term') || '';
    api
      .searchCards(searchTerm)
      .then((fetchedCards) => {
        setCardsData(fetchedCards?.data || []);
        setPaginationData(fetchedCards?.pagination || null);
      })
      .catch((error) => {
        console.error('Error while fetching cards:', error);
        setError('Sorry, something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearchCards = (searchTerm: string, page: number = 1): void => {
    setIsLoading(true);
    setCurrentPage(page);
    api
      .searchCards(searchTerm, page)
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
  };

  const onPageChange = (page: number): void => {
    const searchTerm = localStorage.getItem('search-term') || '';
    handleSearchCards(searchTerm, page);
  };

  return (
    <>
      <Header>
        <Search searchCards={handleSearchCards} />
      </Header>
      <main className={classes.wrapper}>
        <CardList cards={cardsData} isLoading={isLoading} errorMessage={error} />
        {!isLoading && cardsData.length > 0 && (
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
