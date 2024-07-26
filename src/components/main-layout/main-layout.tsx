'use client';

import type { JSX, ReactNode } from 'react';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import classes from '@/styles/main.module.scss';
import { ThemeButton } from '@/components/theme-button';
import { Flyout } from '@/components/flyout';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ErrorBoundary } from '@/components/error-boundary';
import { FallbackUI } from '@/components/fallback-ui';

interface MainLayoutProps {
  children?: ReactNode;
  cardsAndPages?: ReactNode;
}

export function MainLayout({ children, cardsAndPages }: MainLayoutProps): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const { id } = useParams();
  const queryParam = params.get('q') || '';

  const handleSearch = (searchValue: string): void => {
    const newSearchParams = new URLSearchParams({ page: '1' });
    if (searchValue) {
      newSearchParams.append('q', searchValue);
    }
    router.push(`/?${newSearchParams.toString()}`);
  };

  const handleAsideClose = (): void => {
    if (id) {
      router.push(`/?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <div>
        <Header>
          <Search initialValue={queryParam} onSearch={handleSearch} />
          <ThemeButton />
        </Header>
        <div className={classes.container}>
          <main className={classes.wrapper} onClick={handleAsideClose}>
            {cardsAndPages}
            <Flyout />
          </main>
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default MainLayout;
