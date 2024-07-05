import { Component, ReactNode } from 'react';
import { CardsList } from '@components/cards-list';
import classes from './main.module.scss';
import { api } from '@services/api';
import { Header } from '@components/header';
import { Search } from '@components/search';
import { ErrorButton } from '@components/error-button';
import { Loading } from '@components/loading';

export class Main extends Component {
  state = {
    cards: [],
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const searchTerm: string | null = localStorage.getItem('search-term');
      const fetchedCards = searchTerm ? await api.searchCards(searchTerm) : await api.fetchCards();
      this.setState({ cards: fetchedCards?.data, isLoading: false });
    } catch (error) {
      console.error('Error while fetching cards:', error);
    }
  }

  handleSearchCards = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      const fetchedCards = await api.searchCards(searchTerm);
      this.setState({ cards: fetchedCards?.data, isLoading: false });
    } catch (error) {
      console.error('Error while fetching cards:', error);
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
          {this.state.isLoading ? <Loading /> : <CardsList cards={this.state.cards} />}
        </main>
      </>
    );
  }
}

export default Main;
