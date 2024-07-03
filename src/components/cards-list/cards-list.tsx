import { Component, ReactNode } from 'react';

interface ICard {
  mal_id: number;
  title: string;
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
      <section>
        {this.props.cards.map((card) => (
          <div className="card" key={card.mal_id}>
            <img src={card.images.jpg.image_url} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.year}</p>
            <p>{card.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
        ))}
      </section>
    ) : (
      <div>
        <h2>No cards found</h2>
      </div>
    );
  }
}

export default CardsList;
