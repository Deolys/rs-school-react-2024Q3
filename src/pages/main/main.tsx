import { useState, useCallback } from 'react';
import type { JSX } from 'react';
import { CardList } from '@components/card-list';
import { Header } from '@components/header';
import { Search } from '@components/search';
import classes from './main.module.scss';
import { Pagination } from '@components/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/use-search-query';
import { ThemeButton } from '@components/theme-button';

export function Main(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedValue, setStoredValue] = useSearchQuery('search-term', '');

  const [searchTerm, setSearchTerm] = useState(storedValue);
  const currentPage = searchParams.get('page') || '1';

  const handleSearch = useCallback(
    (search: string): void => {
      setSearchTerm(search);
      setStoredValue(search);
    },
    [setStoredValue],
  );

  const onPageChange = (page: number): void => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

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
          <Search initialValue={searchTerm} onSearch={handleSearch} />
          <ThemeButton />
        </>
      </Header>
      <div className={classes.container}>
        <main className={classes.wrapper} onClick={handleAsideClose}>
          <CardList queryParam={searchTerm} />
          <Pagination currentPage={+currentPage} onPageChange={onPageChange} />
        </main>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
