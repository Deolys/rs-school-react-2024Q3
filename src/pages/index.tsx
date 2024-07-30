import { useState, type JSX } from 'react';
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
import { animeApi } from '@/services/api';
import { Loading } from '@/components/loading';
import useActions from '@/hooks/use-actions';
import { CardData, CardsPagesData } from '@/services/interfaces';

interface MainProps {
  cardsPagesData: { data: CardsPagesData };
  detailsData: { data: CardData };
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { page, q: query, details } = context.query;
  const cardsPagesData = await store.dispatch(
    animeApi.endpoints.searchCards.initiate({
      queryParam: query?.toString() || '',
      page: Number(page) || 1,
    }),
  );
  const detailsData = details
    ? await store.dispatch(animeApi.endpoints.getCardById.initiate(Number(details)))
    : null;
  return { props: { cardsPagesData: cardsPagesData || null, detailsData } };
});

export function Main({ cardsPagesData, detailsData }: MainProps): JSX.Element {
  const router = useRouter();
  const { setCurrentPage, setAsideIsOpen } = useActions();
  const queryParam = router.query.q?.toString() || '';
  const page = router.query.page || 1;
  const { details, ...params } = router.query;

  const cards = cardsPagesData?.data?.data;
  const pagination = cardsPagesData?.data?.pagination;
  const cardDetails = detailsData?.data?.data;

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (searchValue: string): void => {
    const newSearchParams: { page: string; q?: string } = { page: '1' };
    if (searchValue) {
      newSearchParams.q = searchValue;
    }
    setIsLoading(true);
    router.push({ query: { ...newSearchParams } }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleAsideClose = (): void => {
    if (details) {
      router
        .push({ query: { ...params } }, undefined, { scroll: false, shallow: true })
        .finally(() => {
          setAsideIsOpen(false);
        });
    }
  };

  const onPageChange = (page: number): void => {
    const newSearchParams: { page: string; q?: string } = { page: `${page}` };
    if (queryParam) {
      newSearchParams.q = `${queryParam}`;
    }
    setIsLoading(true);
    router.push({ query: { ...newSearchParams } }).finally(() => {
      setIsLoading(false);
    });
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
          {isLoading ? (
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
        <MainAsideDetails cardDetails={cardDetails} />
      </div>
    </>
  );
}

export default Main;
