import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { CardList } from '@/components/card-list';
import { mockCardsPagesData } from '../test/__mocks__/mock-data';
import renderWithProviders from '../test/utils/redux-provider';
import type { ReactNode } from 'react';

const mockSearchParamFn = jest.fn();
const mockUseSearchParamsFn = jest
  .fn()
  .mockReturnValue([{ get: (param: string) => param, entries: () => [] }, mockSearchParamFn]);

jest.mock('@remix-run/react', () => ({
  Link: (props: { children: ReactNode }) => <>{props.children}</>,
  useSearchParams: () => mockUseSearchParamsFn(),
}));

describe('CardList Component', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should render the specified number of cards', async () => {
    const { container } = renderWithProviders(<CardList cardsData={mockCardsPagesData} />);
    expect(container.querySelector('.card')).toBeInTheDocument();
    expect(container.querySelectorAll('.card')).toHaveLength(mockCardsPagesData.data.length);
  });

  it('displays a message if no cards are present', async () => {
    renderWithProviders(<CardList cardsData={null} />);
    expect(screen.getByText(/no cards found/i)).toBeInTheDocument();
  });
});
