import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { CardDetails } from '@components/card-details';
import { mockCardPagesData } from '../test/__mocks__/mock-data';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import renderWithProviders from '../test/utils/redux-provider';

describe('CardDetails', () => {
  it('displays loading indicator while fetching data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardPagesData));

    renderWithProviders(
      <MemoryRouter initialEntries={['/?details=1']}>
        <CardDetails />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });

  it('correctly displays the detailed card data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardPagesData));
    const mockCard = mockCardPagesData.data;
    renderWithProviders(
      <MemoryRouter initialEntries={['/?details=1']}>
        <CardDetails />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(mockCard.title)).toBeInTheDocument();
      expect(screen.getByText(`Duration: ${mockCard.duration}`)).toBeInTheDocument();
      expect(screen.getByText(`Rank: ${mockCard.rank}`)).toBeInTheDocument();
      expect(screen.getByText(mockCard.synopsis)).toBeInTheDocument();
    });
  });
});
