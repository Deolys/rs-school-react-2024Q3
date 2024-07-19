import '@testing-library/jest-dom';
import type { JSX } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { Pagination } from '@components/pagination';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import renderWithProviders from '../test/utils/redux-provider';
import { mockPagination } from '../test/__mocks__/mock-data';

const PaginationWrapper = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (page: number): void => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <div data-testid="search-params">{searchParams.toString()}</div>
      <Pagination currentPage={1} onPageChange={onPageChange} />
    </>
  );
};

describe('Pagination', () => {
  it(' updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?page=1']}>
        <PaginationWrapper />
      </MemoryRouter>,
      {
        preloadedState: {
          cards: {
            cards: {
              items: [],
              status: 'success',
            },
            pagination: {
              data: mockPagination,
              status: 'success',
            },
            selectedCards: [],
          },
        },
      },
    );

    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('page=2');
  });
});
