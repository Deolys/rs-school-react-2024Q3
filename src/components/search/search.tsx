import { ChangeEvent, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import classes from './search.module.scss';
import useSearchQuery from '../../hooks/use-search-query';

interface SearchProps {
  searchCards: (searchTerm: string) => void;
  queryParam: string;
}

export function Search({ searchCards, queryParam }: SearchProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useSearchQuery('search-term', '');
  const [searchTerm, setSearchTerm] = useState(queryParam);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue = searchTerm.trim();
    setSearchQuery(searchValue);
    searchCards(searchValue);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    searchCards(queryParam);
  }, [searchCards, searchQuery, queryParam]);

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
