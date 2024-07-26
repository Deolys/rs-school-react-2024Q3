import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CardDetails } from '@/components/card-details';
import { mockCardPagesData } from '../test/__mocks__/mock-data';
import fetchMock from 'jest-fetch-mock';

describe('CardDetails', () => {
  it('correctly displays the detailed card data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardPagesData));
    const mockCard = mockCardPagesData.data;
    render(await CardDetails({ id: 1 }));
    await waitFor(() => {
      expect(screen.getByText(mockCard.title)).toBeInTheDocument();
      expect(screen.getByText(`Duration: ${mockCard.duration}`)).toBeInTheDocument();
      expect(screen.getByText(`Rank: ${mockCard.rank}`)).toBeInTheDocument();
      expect(screen.getByText(mockCard.synopsis)).toBeInTheDocument();
    });
  });
});
