import type { JSX } from 'react';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';
import classes from './card-list.module.scss';
import { ICard } from '@/services/interfaces';

interface CardListProps {
  cards: ICard[];
}

export function CardList({ cards }: CardListProps): JSX.Element {
  return cards && cards.length > 0 ? (
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
