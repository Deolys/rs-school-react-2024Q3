import { Card } from '@components/card';
import { Component, ReactNode } from 'react';
import classes from './cards-list.module.scss';
import { ICard } from '@services/types';
import { Loading } from '@components/loading';

interface ICards {
  cards: ICard[];
  isLoading: boolean;
  errorMessage: string;
}

export class CardsList extends Component<ICards> {
  render(): ReactNode {
    if (this.props.errorMessage) {
      return <h2 className={classes.message}>{this.props.errorMessage}</h2>;
    }

    if (this.props.isLoading) {
      return <Loading />;
    }

    return this.props.cards.length > 0 ? (
      <section className={classes.cardsList}>
        {this.props.cards.map((card) => (
          <Card key={card.mal_id} card={card} />
        ))}
      </section>
    ) : (
      <div className={classes.message}>
        <h2>No cards found</h2>
      </div>
    );
  }
}

export default CardsList;
