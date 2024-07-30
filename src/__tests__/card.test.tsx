import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { Card } from '@/components/card';
import { mockCardsPagesData, mockCard } from '@/test/__mocks__/mock-data';
import fetchMock from 'jest-fetch-mock';
import { SERVER_URL } from '@/services/variables';
import renderWithProviders from '@/test/utils/redux-provider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Main from '@/pages';

describe('Card Component', () => {
  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Card card={mockCard} />
      </MemoryRouterProvider>,
    );
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByAltText('Title 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('opens a detailed card component on click', async () => {
    const { container } = renderWithProviders(
      <MemoryRouterProvider>
        <Main
          cardsPagesData={{ data: mockCardsPagesData }}
          detailsData={{ data: { data: mockCard } }}
        />
      </MemoryRouterProvider>,
    );
    const link = await screen.findByRole('heading', { level: 3, name: /title 1/i });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    await waitFor(() => {
      const cardDetailsBlock = container.querySelector('.asideWrapper');
      expect(cardDetailsBlock).toBeInTheDocument();
    });
  });

  it('triggers an additional API call to fetch detailed information on click', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Main cardsPagesData={{ data: mockCardsPagesData }} detailsData={null} />
      </MemoryRouterProvider>,
    );

    act(() => {
      const link = screen.getByRole('heading', { level: 3, name: /title 1/i });
      fireEvent.click(link);
      waitFor(
        () => {
          expect(fetchMock).toHaveBeenCalledWith(
            expect.objectContaining({ url: `${SERVER_URL}/${mockCard.mal_id}` }),
          );
        },
        { timeout: 4000 },
      );
    });
  });
});
