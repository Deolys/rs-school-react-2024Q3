import { useCallback } from 'react';
import type { JSX } from 'react';
import { CardList } from '@/components/card-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { Pagination } from '@/components/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import useSearchQuery from '@/hooks/use-search-query';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';

export default function Main(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedValue, setStoredValue] = useSearchQuery('search-term', '');

  const handleSearch = useCallback(
    (search: string): void => {
      setStoredValue(search);
    },
    [setStoredValue],
  );

  const handleAsideClose = (): void => {
    if (searchParams.has('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <Header>
        <>
          <Search initialValue={storedValue} onSearch={handleSearch} />
          <ThemeButton />
        </>
      </Header>
      <div className={classes.container}>
        <main className={classes.wrapper} onClick={handleAsideClose}>
          <CardList queryParam={storedValue} />
          <Pagination />
          <Flyout />
        </main>
        <Outlet />
      </div>
    </>
  );
}

// export default Main;
