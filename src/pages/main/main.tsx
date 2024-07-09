import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { CardList } from '@components/card-list';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import classes from './main.module.scss';
import { ICard } from '@services/interfaces';

export function Main(): JSX.Element {
  const [cards, setCards] = useState<ICard[] | []>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const searchTerm = localStorage.getItem('search-term');
    const cardsPromise = searchTerm ? api.searchCards(searchTerm) : api.fetchCards();

    cardsPromise
      .then((fetchedCards) => {
        setCards(fetchedCards?.data || []);
      })
      .catch((error) => {
        console.error('Error while fetching cards:', error);
        setError('Sorry, something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearchCards = (searchTerm: string): void => {
    setIsLoading(true);
    api
      .searchCards(searchTerm)
      .then((fetchedCards) => {
        setCards(fetchedCards?.data || []);
      })
      .catch((error) => {
        console.error('Error while fetching cards:', error);
        setError('The search failed. Please, try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header>
        <Search searchCards={handleSearchCards} />
      </Header>
      <main className={classes.wrapper}>
        <CardList cards={cards} isLoading={isLoading} errorMessage={error} />
      </main>
    </>
  );
}

export default Main;
