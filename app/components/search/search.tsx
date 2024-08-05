import { ChangeEvent, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import classes from './search.module.scss';
import { useSearchParams } from '@remix-run/react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

export function Search({ initialValue, onSearch }: SearchProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue = searchTerm.trim();

    const newSearchParams: { page: string; q?: string } = { page: '1' };
    if (searchValue) {
      newSearchParams.q = searchValue;
    }
    if (searchValue !== initialValue) {
      setSearchParams(newSearchParams);
    }
    onSearch(searchValue);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const query = searchParams.get('q');

    if (query && initialValue !== query) {
      onSearch(query);
      setSearchTerm(query);
    }
  }, [searchParams, onSearch, initialValue]);

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
