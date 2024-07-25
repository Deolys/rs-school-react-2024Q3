import { Alert } from '@/components/alert';
import classes from './card-details.module.scss';
import { api } from '@/services/api';

export async function CardDetails({ id }: { id: number }) {
  const cardData = await api.getCardById(id);
  const card = cardData.data;
  if (!card) {
    return <Alert variant="error">Getting the details failed. Please, try again later</Alert>;
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
