'use client';

import type { JSX, MouseEvent } from 'react';
import { ICard } from '@/services/interfaces';
import classes from './card.module.scss';
import { useAppSelector } from '@/store/hooks';
import useActions from '@/hooks/use-actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CardProps {
  card: ICard;
}

export function Card({ card }: CardProps): JSX.Element {
  const params = useSearchParams();
  const urlParams = params.toString();

  const selectedCards = useAppSelector((state) => state.selectedCards);
  const isSelected = selectedCards.some((item) => item.mal_id === card.mal_id);
  const { toggleSelected } = useActions();

  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation();
  };

  const toggleCheckbox = (e: MouseEvent): void => {
    e.stopPropagation();
    toggleSelected(card);
  };

  return (
    <Link
      href={`/details/${card.mal_id}?${urlParams}`}
      onClick={handleClick}
      scroll={false}
      shallow={true}
    >
      <article className={classes.card}>
        <input
          className={classes.checkbox}
          type="checkbox"
          checked={isSelected}
          onClick={toggleCheckbox}
          title="Select card"
          readOnly
        />
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
