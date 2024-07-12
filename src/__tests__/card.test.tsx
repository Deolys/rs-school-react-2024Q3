import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from '@components/card';
import { mockCardData, mockCard } from '../test/__mocks__/mock-data';
import { PageRoutes } from '../routes';
import fetchMock from 'jest-fetch-mock';
import { SERVER_URL } from '@services/variables';

describe('Card Component', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the relevant card data', () => {
    render(
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
    fetchMock.mockResponseOnce(JSON.stringify(mockCardData));
    const { container } = render(
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
    fetchMock.mockResponseOnce(JSON.stringify(mockCardData));
    render(
      <MemoryRouter initialEntries={['/?page=1&q=Title']}>
        <PageRoutes />
      </MemoryRouter>,
    );
    const link = await screen.findByRole('heading', { level: 3, name: /title 1/i });
    fireEvent.click(link);
    fetchMock.mockResponseOnce(JSON.stringify(mockCardData));
    await waitFor(
      () => {
        expect(fetchMock).toHaveBeenCalledWith(`${SERVER_URL}/${mockCard.mal_id}`);
      },
      { timeout: 4000 },
    );
  });
});
