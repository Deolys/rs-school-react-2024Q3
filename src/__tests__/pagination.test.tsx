import '@testing-library/jest-dom';
import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '@components/pagination';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
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
      <Pagination paginationData={mockPagination} currentPage={1} onPageChange={onPageChange} />
    </>
  );
};

describe('Pagination', () => {
  it(' updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <PaginationWrapper />
      </MemoryRouter>,
    );

    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('page=2');
  });
});
