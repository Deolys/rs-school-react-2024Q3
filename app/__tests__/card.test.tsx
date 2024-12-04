import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { Card } from '@/components/card';
import { mockCard } from '../test/__mocks__/mock-data';
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

describe('Card Component', () => {
  it('renders the relevant card data', () => {
    renderWithProviders(<Card card={mockCard} />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByAltText('Title 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });
});
