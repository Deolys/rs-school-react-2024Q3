import { ChangeEvent, useState } from 'react';
import type { FormEvent } from 'react';
import classes from './search.module.scss';

interface SearchProps {
  searchCards: (searchTerm: string) => void;
  setSearchQuery: (searchTerm: string) => void;
  searchQuery: string;
}

export function Search({ searchCards, setSearchQuery, searchQuery }: SearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue = searchTerm.trim();
    setSearchQuery(searchValue);
    searchCards(searchValue);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={classes.searchContainer}>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <input
          className={classes.searchInput}
          onChange={handleSearchChange}
          type="search"
          value={searchTerm}
          name="search"
          placeholder="Search for anime..."
        />
        <button className={classes.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
