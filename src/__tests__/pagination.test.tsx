import '@testing-library/jest-dom';
import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '@/components/pagination';
import { mockPagination } from '../test/__mocks__/mock-data';
import { useRouter } from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import renderWithProviders from '@/test/utils/redux-provider';
import { Provider } from 'react-redux';
import { store } from '@/store';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => {
    const router = jest.requireActual('next-router-mock');
    router.push = jest.fn((newUrl) => {
      mockRouter.push(newUrl);
    });
    return router;
  }),
  useSearchParams: jest.fn(() => {
    const searchParams = new URLSearchParams('page=2');
    return {
      get: (key: string) => searchParams.get(key),
      set: (key: string, value: string) => searchParams.set(key, value),
    };
  }),
  usePathname: jest.fn(),
}));

const PaginationWrapper = (): JSX.Element => {
  const router = useRouter();
  const pageParam = router.query.page?.toString() || '1';

  return (
    <>
      <div data-testid="search-params">{pageParam}</div>
      <Provider store={store}>
        <Pagination paginationData={mockPagination} />
      </Provider>
    </>
  );
};

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const page3Button = screen.getByRole('button', { name: '3' });
    fireEvent.click(page3Button);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('3');
  });

  it('updates URL query parameter on next button click', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('3');
  });

  it('updates URL query parameter on previous button click', async () => {
    render(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const previousButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(previousButton);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('1');
  });
});
