import { useEffect, type JSX } from 'react';
import { Card } from '@/components/card';
import { Loading } from '@/components/loading';
import { Alert } from '@/components/alert';
import classes from './card-list.module.scss';
import { useSearchCardsQuery } from '@/services/api';
import { useAppSelector } from '@/store/hooks';
import useActions from '@/hooks/use-actions';
import { useRouter } from 'next/router';

interface CardListProps {
  queryParam: string;
}

export function CardList({ queryParam }: CardListProps): JSX.Element {
  const router = useRouter();
  const { page } = router.query;

  const currentPage = page || '1';

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
