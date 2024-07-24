import '@testing-library/jest-dom';
import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '@/components/pagination';
import { mockPagination } from '../test/__mocks__/mock-data';
import mockRouter, { useRouter } from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const mockPageChange = jest
  .fn()
  .mockImplementation((page: number) => mockRouter.push(`$/?page=${page}`));
const PaginationWrapper = (): JSX.Element => {
  const router = useRouter();
  const queryParams = router.query.page?.toString();
  return (
    <>
      <div data-testid="search-params">{queryParams}</div>
      <Pagination paginationData={mockPagination} currentPage={5} onPageChange={mockPageChange} />
    </>
  );
};

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const page4Button = screen.getByRole('button', { name: '4' });
    fireEvent.click(page4Button);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('4');
  });

  it('updates URL query parameter on next button click', async () => {
    render(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('6');
  });

  it('updates URL query parameter on previous button click', async () => {
    render(
      <MemoryRouterProvider>
        <PaginationWrapper />
      </MemoryRouterProvider>,
    );

    const nextButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(nextButton);

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('4');
  });
});
