import type { JSX, MouseEvent } from 'react';
import { ICard } from '@services/interfaces';
import classes from './card.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface CardProps {
  card: ICard;
}

export function Card({ card }: CardProps): JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('details', `${card.mal_id}`);

  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <Link to={`${location.pathname}?${searchParams}`} onClick={handleClick}>
      <article className={classes.card}>
        <img src={card.images.jpg.image_url} alt={card.title} />
        <div className={classes.card__info}>
          <h3 className={classes.cardTitle}>{card.title}</h3>
          {card.score && (
            <p>
              <span>Score: </span>
              {card.score}
            </p>
          )}
          {card.year && (
            <p>
              <span>Year: </span>
              {card.year}
            </p>
          )}
          <p>{card.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </article>
    </Link>
  );
}

export default Card;
