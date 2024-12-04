import { useEffect, type JSX } from 'react';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';
import classes from './card-list.module.scss';
import useActions from '@/hooks/use-actions';
import { CardsPagesData } from '@/services/interfaces';

interface CardListProps {
  cardsData: CardsPagesData | null;
}

export function CardList({ cardsData }: CardListProps): JSX.Element {
  const cards = cardsData?.data;
  const pagination = cardsData?.pagination;
  const { setPagination } = useActions();
  useEffect(() => {
    setPagination(pagination);
  }, [setPagination, pagination]);

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
