import type { JSX } from 'react';
import { Loading } from '@components/loading';
import { ICard } from '@services/interfaces';
import classes from './card-details.module.scss';

interface CardDetailsProps {
  card: ICard | null;
  isLoading: boolean;
  error: string;
}

export function CardDetails({ card, isLoading, error }: CardDetailsProps): JSX.Element {
  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.detailsWrapper}>
      <h1>{card?.title}</h1>
      <p>Duration: {card?.duration}</p>
      <p>Rank: {card?.rank}</p>
      <p>{card?.synopsis}</p>
    </div>
  );
}
