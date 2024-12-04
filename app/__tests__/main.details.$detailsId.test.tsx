import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { loader, MainAsideDetails } from '@/routes/main.details.$detailsId';
import renderWithProviders from '../test/utils/redux-provider';
import { mockCard } from '@/test/__mocks__/mock-data';
import fetchMock from 'jest-fetch-mock';

const mockUseLoaderDataFn = jest.fn().mockReturnValue(mockCard);
const mockNavigateFn = jest.fn();
const mockUseNavigateFn = jest.fn().mockReturnValue(mockNavigateFn);
const mockUseNavigationFn = jest.fn().mockReturnValue({
  state: 'idle',
  location: {},
});
const mockUseSearchParamsFn = jest.fn().mockReturnValue(['']);

jest.mock('@remix-run/react', () => ({
  useLoaderData: () => mockUseLoaderDataFn(),
  useNavigate: () => mockUseNavigateFn(),
  useNavigation: () => mockUseNavigationFn(),
  useSearchParams: () => mockUseSearchParamsFn(),
  useParams: () => ({ detailsId: '1' }),
}));

jest.mock('@remix-run/node', () => ({
  json: () => mockCard,
}));

describe('MainAsideDetails', () => {
  it('hides the component by clicking the close button ', async () => {
    renderWithProviders(<MainAsideDetails />);

    const crossButton = screen.getByRole('button', { name: /cross/i });
    fireEvent.click(crossButton);
    await waitFor(() => {
      expect(mockNavigateFn).toHaveBeenCalledWith('/main?');
    });
  });

  it('triggers additional api call for getting card details data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockCard));
    const request = new Request('http://foo.bar');
    const result = await loader({
      request,
      context: {},
      params: { detailsId: '1' },
    });

    expect(result).toEqual(mockCard);
  });
});
