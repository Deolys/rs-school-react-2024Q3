import { useCallback } from 'react';
import type { JSX } from 'react';
import { CardList } from '@/components/card-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { Pagination } from '@/components/pagination';
import useSearchQuery from '@/hooks/use-search-query';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';
import { useRouter } from 'next/router';
import { MainAsideDetails } from '@/components/main-aside-details';

export function Main(): JSX.Element {
  const router = useRouter();
  const [storedValue, setStoredValue] = useSearchQuery('search-term', '');

  const handleSearch = useCallback(
    (search: string): void => {
      setStoredValue(search);
    },
    [setStoredValue],
  );

  const handleAsideClose = (): void => {
    const { details, ...params } = router.query;
    if (details) {
      router.push({ query: { ...params } }, undefined, { scroll: false });
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
        <MainAsideDetails />
      </div>
    </>
  );
}

export default Main;
