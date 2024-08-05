import type { JSX, FormEvent } from 'react';
import classes from './search.module.scss';
import { useSearchParams } from '@remix-run/react';

export function Search(): JSX.Element {
  const [searchParams] = useSearchParams();
  const initialValue = searchParams.get('q') || '';
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const searchTerm = (data.get('search') as string).trim() || '';
    const searchValue = searchTerm.trim();
    const newSearchParams = new URLSearchParams({ page: '1' });
    if (searchValue) {
      newSearchParams.append('q', searchValue);
    }
    location.replace(`/main?${newSearchParams.toString()}`);
  };

  return (
    <div className={classes.searchContainer}>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <input
          className={classes.searchInput}
          type="search"
          name="search"
          placeholder="Search for anime..."
          defaultValue={initialValue}
        />
        <button className={classes.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
