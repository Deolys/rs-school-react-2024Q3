import { CardsAndPages } from '@/components/cards-and-pages';
import { mockCardsPagesData } from '@/test/__mocks__/mock-data';
import renderWithProviders from '@/test/utils/redux-provider';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

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
  usePathname: jest.fn(() => '/'),
}));

describe('cards and pages', () => {
  fetchMock.enableMocks();

  afterEach(() => {
    fetchMock.resetMocks();
  });

  afterAll(() => {
    fetchMock.mockClear();
  });

  it('renders correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    const { container } = renderWithProviders(await CardsAndPages({ query: '', page: 1 }));
    expect(container).toBeInTheDocument();
  });
});
