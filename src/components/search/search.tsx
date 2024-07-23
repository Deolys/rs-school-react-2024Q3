import type { JSX, FormEvent } from 'react';
import classes from './search.module.scss';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

interface FormAddition extends HTMLFormElement {
  search: HTMLInputElement;
}

export function Search({ initialValue, onSearch }: SearchProps): JSX.Element {
  const handleSubmit = (e: FormEvent<FormAddition>): void => {
    e.preventDefault();
    const searchTerm = e.currentTarget.search.value;
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
