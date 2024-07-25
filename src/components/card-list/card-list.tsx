'use client';

import type { JSX } from 'react';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';
import classes from './card-list.module.scss';
import { ICard } from '@/services/interfaces';
import useActions from '@/hooks/use-actions';

interface CardListProps {
  cards: ICard[];
}

export function CardList({ cards }: CardListProps): JSX.Element {
  const { setCards } = useActions();
  setCards(cards);
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
