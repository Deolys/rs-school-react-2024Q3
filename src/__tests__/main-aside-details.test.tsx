import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MainAsideDetails } from '@components/main-aside-details';
import { api } from '@services/api';
import { mockCard } from '../test/__mocks__/mock-data';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@services/api', () => ({
  api: {
    getCardById: jest.fn(),
  },
}));

const mockGetCardById = api.getCardById as jest.MockedFunction<typeof api.getCardById>;

describe('MainAsideDetails', () => {
  it('displays loading indicator while fetching data', async () => {
    mockGetCardById.mockResolvedValueOnce({ data: mockCard });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <MainAsideDetails />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(api.getCardById).toHaveBeenCalled());
  });

  it('correctly displays the detailed card data', async () => {
    mockGetCardById.mockResolvedValueOnce({ data: mockCard });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <MainAsideDetails />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(mockCard.title)).toBeInTheDocument();
      expect(screen.getByText(`Duration: ${mockCard.duration}`)).toBeInTheDocument();
      expect(screen.getByText(`Rank: ${mockCard.rank}`)).toBeInTheDocument();
      expect(screen.getByText(mockCard.synopsis)).toBeInTheDocument();
    });
  });

  it('hides the component by clicking the close button ', async () => {
    mockGetCardById.mockResolvedValueOnce({ data: mockCard });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <MainAsideDetails />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });
});
