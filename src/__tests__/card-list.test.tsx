import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { CardList } from '@components/card-list';
import { mockCardsPagesData } from '../test/__mocks__/mock-data';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import renderWithProviders from '../test/utils/redux-provider';

describe('CardList Component', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  afterAll(() => {
    fetchMock.mockClear();
    consoleSpy.mockRestore();
  });

  it('should render the specified number of cards', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    const { container } = renderWithProviders(
      <MemoryRouter>
        <CardList queryParam="" />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(container.querySelector('.card')).toBeInTheDocument();
      expect(container.querySelectorAll('.card')).toHaveLength(mockCardsPagesData.data.length);
    });
  });

  it('displays a message if no cards are present', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [], pagination: [] }));
    renderWithProviders(
      <MemoryRouter>
        <CardList queryParam="" />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(/no cards found/i)).toBeInTheDocument();
    });
  });

  it('displays an error message', async () => {
    const errorMessage = 'Getting cards failed. Please, try again later';
    renderWithProviders(
      <MemoryRouter>
        <CardList queryParam="" />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList queryParam="" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });
});
