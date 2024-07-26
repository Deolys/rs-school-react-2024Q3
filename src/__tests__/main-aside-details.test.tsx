import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MainAsideDetails } from '@/components/main-aside-details';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import renderWithProviders from '@/test/utils/redux-provider';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => {
    const router = jest.requireActual('next-router-mock');
    router.push = jest.fn(() => {
      mockRouter.push('/');
    });
    return router;
  }),
  useSearchParams: jest.fn(() => {
    const searchParams = new URLSearchParams('/?details=1');
    return {
      get: (key: string) => searchParams.get(key),
      set: (key: string, value: string) => searchParams.set(key, value),
    };
  }),
  useParams: jest.fn(() => {
    const id = mockRouter.pathname.includes('1') ? '1' : '';
    return { id: id };
  }),
}));

describe('MainAsideDetails', () => {
  it('hides the component by clicking the close button ', async () => {
    mockRouter.push('/details/1');
    renderWithProviders(
      <MemoryRouterProvider>
        <MainAsideDetails />
      </MemoryRouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });
});
