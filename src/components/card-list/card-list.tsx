import type { JSX } from 'react';
import { Card } from '@components/card';
import { ICard } from '@services/interfaces';
import { Loading } from '@components/loading';
import { Alert } from '@components/alert';
import classes from './card-list.module.scss';

interface CardListProps {
  cards: ICard[];
  isLoading: boolean;
  errorMessage: string;
}

export function CardList({ cards, isLoading, errorMessage }: CardListProps): JSX.Element {
  if (errorMessage) {
    return <Alert variant="error">{errorMessage}</Alert>;
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
    <Alert variant="info">No cards found</Alert>
  );
}

export default CardList;
