import type { JSX } from 'react';
import { Card } from '@components/card';
import classes from './card-list.module.scss';
import { ICard } from '@services/interfaces';
import { Loading } from '@components/loading';

interface CardListProps {
  cards: ICard[];
  isLoading: boolean;
  errorMessage: string;
}

export function CardList({ cards, isLoading, errorMessage }: CardListProps): JSX.Element {
  if (errorMessage) {
    return <h2 className={classes.message}>{errorMessage}</h2>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return cards.length > 0 ? (
    <section className={classes.cardList}>
      {cards.map((card) => (
        <Card key={card.mal_id} card={card} />
      ))}
    </section>
  ) : (
    <div className={classes.message}>
      <h2>No cards found</h2>
    </div>
  );
}

export default CardList;
