import { ICard } from '@components/cards-list/cards-list';
import { Component, ReactNode } from 'react';
import classes from './card.module.scss';

interface ICardProps {
  card: ICard;
}

export class Card extends Component<ICardProps> {
  render(): ReactNode {
    const { card } = this.props;
    return (
      <article className={classes.card}>
        <img src={card.images.jpg.image_url} alt={card.title} />
        <div className={classes.card__info}>
          <h3>{card.title}</h3>
          <p>
            <span>Score: </span>
            {card.score}
          </p>
          {card.year && (
            <p>
              <span>Year: </span>
              {card.year}
            </p>
          )}
          <p>{card.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </article>
    );
  }
}

export default Card;
