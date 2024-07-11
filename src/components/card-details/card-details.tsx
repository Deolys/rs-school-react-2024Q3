import type { JSX } from 'react';
import { Loading } from '@components/loading';
import { ICard } from '@services/interfaces';
import classes from './card-details.module.scss';

interface CardDetailsProps {
  card: ICard | null;
  isLoading: boolean;
  errorMessage: string;
}

export function CardDetails({ card, isLoading, errorMessage }: CardDetailsProps): JSX.Element {
  if (errorMessage) {
    return <h2 className={classes.message}>{errorMessage}</h2>;
  }

  if (isLoading) {
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
