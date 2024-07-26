import '@testing-library/jest-dom';
import { MainLayout } from '@/components/main-layout';
import renderWithProviders from '@/test/utils/redux-provider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => {
    jest.requireActual('next-router-mock');
  }),
  useSearchParams: jest.fn(() => {
    const searchParams = new URLSearchParams('/?page=1');
    return {
      get: (key: string) => searchParams.get(key),
      set: (key: string, value: string) => searchParams.set(key, value),
    };
  }),
  useParams: jest.fn(() => {
    return { id: '' };
  }),
}));

describe('main-layout', () => {
  it('renders correctly', () => {
    const { container } = renderWithProviders(<MainLayout />);
    expect(container).toBeInTheDocument();
  });
});
