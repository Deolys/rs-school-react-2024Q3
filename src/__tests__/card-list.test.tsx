import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { CardList } from '@/components/card-list';
import { mockCards, mockCardsPagesData } from '../test/__mocks__/mock-data';
import fetchMock from 'jest-fetch-mock';
import renderWithProviders from '../test/utils/redux-provider';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

describe('CardList Component', () => {
  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  afterAll(() => {
    fetchMock.mockClear();
  });

  it('should render the specified number of cards', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    const { container } = renderWithProviders(
      <MemoryRouterProvider>
        <CardList cards={mockCards} />
      </MemoryRouterProvider>,
    );
    await waitFor(() => {
      expect(container.querySelector('.card')).toBeInTheDocument();
      expect(container.querySelectorAll('.card')).toHaveLength(mockCardsPagesData.data.length);
    });
  });

  it('displays a message if no cards are present', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [], pagination: [] }));
    renderWithProviders(
      <MemoryRouterProvider>
        <CardList cards={null} />
      </MemoryRouterProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText(/no cards found/i)).toBeInTheDocument();
    });
  });
});
