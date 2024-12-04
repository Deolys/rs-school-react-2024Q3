import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from '@/components/card';
import { mockCardsPagesData, mockCard } from '../test/__mocks__/mock-data';
import { PageRoutes } from '../routes';
import fetchMock from 'jest-fetch-mock';
import { SERVER_URL } from '@/services/variables';
import renderWithProviders from '../test/utils/redux-provider';

describe('Card Component', () => {
  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByAltText('Title 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('opens a detailed card component on click', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    const { container } = renderWithProviders(
      <MemoryRouter>
        <PageRoutes />
      </MemoryRouter>,
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
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    renderWithProviders(
      <MemoryRouter>
        <PageRoutes />
      </MemoryRouter>,
    );
    const link = await screen.findByRole('heading', { level: 3, name: /title 1/i });
    fireEvent.click(link);
    await waitFor(
      () => {
        expect(fetchMock).toHaveBeenLastCalledWith(
          expect.objectContaining({ url: `${SERVER_URL}/${mockCard.mal_id}` }),
        );
      },
      { timeout: 4000 },
    );
  });
});
