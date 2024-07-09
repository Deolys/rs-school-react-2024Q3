import { ChangeEvent, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import classes from './search.module.scss';

interface SearchProps {
  searchCards: (searchTerm: string) => void;
}

export function Search({ searchCards }: SearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue = searchTerm.trim();
    localStorage.setItem('search-term', searchValue);
    searchCards(searchValue);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchValue: string | null = localStorage.getItem('search-term');
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  }, []);

  return (
    <div className={classes.searchContainer}>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <input
          className={classes.searchInput}
          onChange={handleSearchChange}
          value={searchTerm}
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

export default Search;
