import Main from '@/app/page';
import renderWithProviders from '@/test/utils/redux-provider';
import '@testing-library/jest-dom';

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

jest.mock('@/components/cards-and-pages', () => {
  return {
    CardsAndPages: () => null,
  };
});

describe('Layout', () => {
  it('should render', async () => {
    const { container } = renderWithProviders(await Main({ searchParams: { q: '', page: '1' } }));
    expect(container).toBeInTheDocument();
  });
});
