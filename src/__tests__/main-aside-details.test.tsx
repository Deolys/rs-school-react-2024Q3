import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MainAsideDetails } from '@/components/main-aside-details';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import renderWithProviders from '@/test/utils/redux-provider';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('MainAsideDetails', () => {
  it('hides the component by clicking the close button ', async () => {
    renderWithProviders(
      <MemoryRouterProvider url={'/?details=1'}>
        <MainAsideDetails />
      </MemoryRouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });
});
