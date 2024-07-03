import { Component, ReactNode } from 'react';
import { CardsList } from '../../components/cards-list';
import { api } from '../../services/api';

export class Main extends Component {
  state = {
    cards: [],
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
    try {
      const fetchedCards = await api.fetchCards();
      this.setState({ cards: fetchedCards.data });
    } catch (error) {
      console.error('Error while fetching cards:', error);
    }
  }

  render(): ReactNode {
    return (
      <main>
        <CardsList cards={this.state.cards} />
      </main>
    );
  }
}

export default Main;
