import { ChangeEvent, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import classes from './search.module.scss';
import { useRouter } from 'next/router';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

export function Search({ initialValue, onSearch }: SearchProps): JSX.Element {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue = searchTerm.trim();

    const newSearchParams: { page: string; q?: string } = { page: '1' };
    if (searchValue) {
      newSearchParams.q = searchValue;
    }
    if (searchValue !== initialValue) {
      router.push({ query: { ...router.query, ...newSearchParams } });
    }
    onSearch(searchValue);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let searchParam = router.query.q;
    if (searchParam && Array.isArray(searchParam)) {
      searchParam = searchParam.shift();
    }
    if (searchParam && initialValue !== searchParam) {
      onSearch(searchParam);
      setSearchTerm(searchParam);
    }
  }, [, router, onSearch, initialValue]);

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
