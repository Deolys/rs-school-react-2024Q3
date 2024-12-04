import type { JSX } from 'react';
import classes from './card-details.module.scss';
import { CardData } from '@/services/interfaces';

interface CardDetailsProps {
  detailsData: CardData | null;
}

export function CardDetails({ detailsData }: CardDetailsProps): JSX.Element {
  const card = detailsData?.data;

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
