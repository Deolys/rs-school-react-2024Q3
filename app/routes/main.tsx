import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { CardList } from '@/components/card-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { Pagination } from '@/components/pagination';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import useSearchQuery from '@/hooks/use-search-query';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';
import { Outlet } from '@remix-run/react';
import { api } from '@/services/api';
import { json, TypedResponse } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { CardsPagesData } from '@/services/interfaces';

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<CardsPagesData | null>> {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || 1;
  const data = await api.searchCards(query, +page);
  return json(data);
}

export function Main(): ReactNode {
  const data = useLoaderData<typeof loader>();
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
          <CardList cardsData={data} />
          <Pagination />
          <Flyout />
        </main>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
