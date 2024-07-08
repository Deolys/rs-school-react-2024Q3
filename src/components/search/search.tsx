import { ChangeEvent, Component } from 'react';
import type { FormEvent, ReactNode } from 'react';
import classes from './search.module.scss';

interface SearchProps {
  searchCards: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  state = {
    searchTerm: '',
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('search-term', searchTerm);
    this.props.searchCards(searchTerm);
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.target.value });
  };

  componentDidMount(): void {
    const searchTerm: string | null = localStorage.getItem('search-term');
    if (searchTerm) {
      this.setState({ searchTerm });
    }
  }

  render(): ReactNode {
    return (
      <div className={classes.searchContainer}>
        <form className={classes.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={classes.searchInput}
            onChange={this.handleSearchChange}
            value={this.state.searchTerm}
            type="search"
            placeholder="Search for anime..."
          />
          <button className={classes.searchButton} type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
