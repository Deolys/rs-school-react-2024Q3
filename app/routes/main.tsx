import type { ReactNode } from 'react';
import { CardList } from '@/components/card-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { Pagination } from '@/components/pagination';
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';
import { Outlet } from '@remix-run/react';
import { api } from '@/services/api';
import { json, TypedResponse } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { CardsPagesData } from '@/services/interfaces';
import { Loading } from '@/components/loading';

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
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasDetails = navigation.location?.pathname.includes('details');

  const handleAsideClose = (): void => {
    if (location.pathname.includes('details')) {
      navigate(`/main?${searchParams.toString()}`);
    }
  };

  return (
    <>
      <Header>
        <>
          <Search />
          <ThemeButton />
        </>
      </Header>
      <div className={classes.container}>
        <main className={classes.wrapper} onClick={handleAsideClose}>
          {navigation.state === 'loading' && !hasDetails ? (
            <Loading />
          ) : (
            <>
              <CardList cardsData={data} />
              <Pagination />
            </>
          )}
          <Flyout />
        </main>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
