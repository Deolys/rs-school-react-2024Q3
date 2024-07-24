import type { JSX, FormEvent } from 'react';
import classes from './search.module.scss';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

export function Search({ initialValue, onSearch }: SearchProps): JSX.Element {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const searchTerm = (data.get('search') as string).trim() || '';
    const searchValue = searchTerm.trim();
    onSearch(searchValue);
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
