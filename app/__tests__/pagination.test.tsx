import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { Pagination } from '@/components/pagination';
import renderWithProviders from '../test/utils/redux-provider';
import { mockPagination } from '../test/__mocks__/mock-data';

const mockSetSearchParamFn = jest.fn();
const mockSearchParams = { get: () => '1', set: jest.fn(), entries: () => [] };
const mockUseSearchParamsFn = jest.fn().mockReturnValue([mockSearchParams, mockSetSearchParamFn]);

jest.mock('@remix-run/react', () => ({
  useSearchParams: () => mockUseSearchParamsFn(),
}));

describe('Pagination', () => {
  it(' updates URL query parameter when page changes', async () => {
    renderWithProviders(<Pagination />, {
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
          currentPage: 1,
        },
      },
    });

    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);

    expect(mockSearchParams.set).toHaveBeenCalledWith('page', '2');
  });
});
