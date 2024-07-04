import { Card } from '@components/card';
import { Component, ReactNode } from 'react';
import classes from './cards-list.module.scss';

export interface ICard {
  mal_id: number;
  title: string;
  score: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  year: number | null;
  genres: {
    name: string;
  }[];
}

interface ICards {
  cards: ICard[];
}

export class CardsList extends Component<ICards> {
  render(): ReactNode {
    return this.props.cards.length > 0 ? (
      <section className={classes.cardsList}>
        {this.props.cards.map((card) => (
          <Card key={card.mal_id} card={card} />
        ))}
      </section>
    ) : (
      <div className={classes.emptyListSign}>
        <h2>No cards found</h2>
      </div>
    );
  }
}

export default CardsList;
