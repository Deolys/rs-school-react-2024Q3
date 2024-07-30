import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { MainAsideDetails } from '@/components/main-aside-details';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import renderWithProviders from '@/test/utils/redux-provider';
import { mockCard } from '@/test/__mocks__/mock-data';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('MainAsideDetails', () => {
  it('hides the component by clicking the close button ', async () => {
    renderWithProviders(
      <MemoryRouterProvider url={'/?details=1'}>
        <MainAsideDetails cardDetails={mockCard} />
      </MemoryRouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });

  it('displays loading indicator while data is loading', () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <MainAsideDetails cardDetails={mockCard} />
      </MemoryRouterProvider>,
    );
    act(() => {
      mockRouter.push('/?details=1');

      waitFor(() => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
      });
    });
  });
});
