import type { JSX } from 'react';
import { CardList } from '@/components/card-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { Pagination } from '@/components/pagination';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';
import { useRouter } from 'next/router';
import { MainAsideDetails } from '@/components/main-aside-details';
import { wrapper } from '@/store';
import { animeApi, getRunningQueriesThunk, useSearchCardsQuery } from '@/services/api';
import { Loading } from '@/components/loading';
import useActions from '@/hooks/use-actions';
import { Alert } from '@/components/alert';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { page, q: query, details } = context.query;
  store.dispatch(
    animeApi.endpoints.searchCards.initiate({
      queryParam: query?.toString() || '',
      page: Number(page) || 1,
    }),
  );
  if (details) {
    store.dispatch(animeApi.endpoints.getCardById.initiate(Number(details)));
  }
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return { props: {} };
});

export function Main(): JSX.Element {
  const router = useRouter();
  const { setCurrentPage } = useActions();
  const queryParam = router.query.q?.toString();
  const page = router.query.page || 1;

  const { data, isFetching, error } = useSearchCardsQuery({
    queryParam: queryParam,
    page: Number(page),
  });
  const cards = data?.data;
  const pagination = data?.pagination;

  const handleSearch = (searchValue: string): void => {
    const newSearchParams: { page: string; q?: string } = { page: '1' };
    if (searchValue) {
      newSearchParams.q = searchValue;
    }
    router.push({ query: { ...newSearchParams } });
  };

  const handleAsideClose = (): void => {
    const { details, ...params } = router.query;
    if (details) {
      router.push({ query: { ...params } }, undefined, { scroll: false, shallow: true });
    }
  };

  const onPageChange = (page: number): void => {
    const newSearchParams: { page: string; q?: string } = { page: `${page}` };
    if (queryParam) {
      newSearchParams.q = `${queryParam}`;
    }
    router.push({ query: { ...newSearchParams } });
    setCurrentPage(page);
  };

  return (
    <>
      <Header>
        <>
          <Search initialValue={queryParam} onSearch={handleSearch} />
          <ThemeButton />
        </>
      </Header>
      <div className={classes.container}>
        <main className={classes.wrapper} onClick={handleAsideClose}>
          {error ? (
            <Alert variant="error">Something went wrong</Alert>
          ) : isFetching ? (
            <Loading />
          ) : (
            <>
              <CardList cards={cards} />
              <Pagination
                paginationData={pagination}
                currentPage={+page}
                onPageChange={onPageChange}
              />
              <Flyout />
            </>
          )}
        </main>
        <MainAsideDetails />
      </div>
    </>
  );
}

export default Main;
