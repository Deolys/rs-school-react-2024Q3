import '@testing-library/jest-dom';
import Main, { loader } from '@/routes/main';
import { mockCardsPagesData } from '@/test/__mocks__/mock-data';
import renderWithProviders from '@/test/utils/redux-provider';
import { ReactNode } from 'react';
import { screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

const mockUseLoaderDataFn = jest.fn().mockReturnValue(mockCardsPagesData);
const mockNavigateFn = jest.fn();
const mockUseNavigateFn = jest.fn().mockReturnValue(mockNavigateFn);
const mockUseNavigationFn = jest
  .fn()
  .mockReturnValueOnce({
    state: 'idle',
    location: { pathname: '/main' },
  })
  .mockReturnValueOnce({
    state: 'loading',
    location: { pathname: '/main' },
  });
const mockUseSearchParamsFn = jest
  .fn()
  .mockReturnValue([{ get: (param: string) => param, entries: () => [] }]);

jest.mock('@remix-run/react', () => ({
  Link: (props: { children: ReactNode }) => <>{props.children}</>,
  useLoaderData: () => mockUseLoaderDataFn(),
  useNavigate: () => mockUseNavigateFn(),
  useNavigation: () => mockUseNavigationFn(),
  useSearchParams: () => mockUseSearchParamsFn(),
  Outlet: () => {},
}));

jest.mock('@remix-run/node', () => ({
  json: () => mockCardsPagesData,
}));

describe('Main page', () => {
  it('should render', () => {
    const { container } = renderWithProviders(<Main />);
    expect(container).toBeInTheDocument();
  });

  it('should display loading ui', () => {
    renderWithProviders(<Main />);
    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  it('triggers api call for getting cards data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCardsPagesData));
    const request = new Request('http://foo.bar/?page=1', { method: 'GET' });
    const result = await loader({
      request,
      context: {},
      params: { page: '1' },
    });

    expect(result).toEqual(mockCardsPagesData);
  });
});
