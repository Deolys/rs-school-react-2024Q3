import type { JSX } from 'react';
import { Loading } from '@/components/loading';
import { Alert } from '@/components/alert';
import { useGetCardByIdQuery } from '@/services/api';
import classes from './card-details.module.scss';
import { useRouter } from 'next/router';

export function CardDetails(): JSX.Element {
  const router = useRouter();
  const details = Number(router.query.details);
  const { data, error, isFetching } = useGetCardByIdQuery(details);
  const card = data?.data;

  if (error) {
    return <Alert variant="error">Getting the details failed. Please, try again later</Alert>;
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className={classes.detailsWrapper}>
      <h1 className={classes.detailsTitle}>{card?.title}</h1>
      <p>Duration: {card?.duration}</p>
      <p>Rank: {card?.rank}</p>
      <p>{card?.synopsis}</p>
    </div>
  );
}

export default CardDetails;
