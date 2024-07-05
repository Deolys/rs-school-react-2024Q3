import { Component, ReactNode } from 'react';
import { CardsList } from '@components/cards-list';
import classes from './main.module.scss';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import { ErrorButton } from '@components/error-button';

export class Main extends Component {
  state = {
    cards: [],
    error: '',
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const searchTerm: string | null = localStorage.getItem('search-term');
      const fetchedCards = searchTerm ? await api.searchCards(searchTerm) : await api.fetchCards();
      this.setState({ cards: fetchedCards?.data || [], isLoading: false });
    } catch (error) {
      console.error('Error while fetching cards:', error);
      this.setState({ error: 'Sorry, something went wrong' });
    }
  }

  handleSearchCards = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      const fetchedCards = await api.searchCards(searchTerm);
      this.setState({ cards: fetchedCards?.data || [], isLoading: false });
    } catch (error) {
      console.error('Error while fetching cards:', error);
      this.setState({ error: 'The search failed. Please, try again later' });
    }
  };

  render(): ReactNode {
    return (
      <>
        <Header>
          <span></span>
          <Search searchCards={this.handleSearchCards} />
          <ErrorButton />
        </Header>
        <main className={classes.wrapper}>
          <CardsList
            cards={this.state.cards}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
        </main>
      </>
    );
  }
}

export default Main;
