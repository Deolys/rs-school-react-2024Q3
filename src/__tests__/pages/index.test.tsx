import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockCard, mockCardsPagesData } from '@/test/__mocks__/mock-data';
import fetchMock from 'jest-fetch-mock';
import renderWithProviders from '@/test/utils/redux-provider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Main from '@/pages';
import mockRouter from 'next-router-mock';
import { SERVER_URL } from '@/services/variables';

describe('Main', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  afterAll(() => {
    fetchMock.mockClear();
    consoleSpy.mockRestore();
  });

  it('closes aside on main panel click', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Main
          cardsPagesData={{ data: mockCardsPagesData }}
          detailsData={{ data: { data: mockCard } }}
        />
      </MemoryRouterProvider>,
    );
    fireEvent.click(screen.getByRole('main'));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });
  it('correctly updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Main cardsPagesData={{ data: mockCardsPagesData }} detailsData={null} />
      </MemoryRouterProvider>,
    );
    await waitFor(() => {
      const page2Button = screen.getByRole('button', { name: '2' });
      fireEvent.click(page2Button);
    });

    const page = mockRouter.query.page;
    expect(page).toBe('2');
  });
  it('correctly updates URL query parameter when search changes', async () => {
    mockRouter.push('/?q=test');
    renderWithProviders(
      <MemoryRouterProvider>
        <Main
          cardsPagesData={{ data: mockCardsPagesData }}
          detailsData={{ data: { data: mockCard } }}
        />
      </MemoryRouterProvider>,
    );
    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Berserk' } });
      fireEvent.click(searchButton);
      waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith(
          expect.objectContaining({ url: `${SERVER_URL}/?q=Berserk` }),
        );
      });
      const changedQuery = mockRouter.query.q;
      expect(changedQuery).toBe('Berserk');
    });
  });
});
