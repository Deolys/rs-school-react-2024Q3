import { useEffect, type JSX } from 'react';
import { Card } from '@/components/card';
import { Loading } from '@/components/loading';
import { Alert } from '@/components/alert';
import classes from './card-list.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useSearchCardsQuery } from '@/services/api';
import { useAppSelector } from '@/store/hooks';
import useActions from '@/hooks/use-actions';

interface CardListProps {
  queryParam: string;
}

export function CardList({ queryParam }: CardListProps): JSX.Element {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';

  const { data, error, isLoading } = useSearchCardsQuery({
    queryParam: queryParam,
    page: +currentPage,
  });
  const cards = data?.data;
  const pagination = data?.pagination;
  const { setPagination } = useActions();
  useEffect(() => {
    setPagination(pagination);
  }, [setPagination, pagination]);

  const status = useAppSelector((state) => state.cards.cards.status);

  if (error) {
    return <Alert variant="error">Getting cards failed. Please, try again later</Alert>;
  }

  if (isLoading || status === 'loading') {
    return <Loading />;
  }

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
