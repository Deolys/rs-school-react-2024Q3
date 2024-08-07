import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/search';

const mockNavigateFn = jest.fn();
const mockUseNavigateFn = jest.fn().mockReturnValue(mockNavigateFn);
const mockSetSearchParamFn = jest.fn();
const mockSearchParams = { get: () => 'One Piece' };
const mockUseSearchParamsFn = jest.fn().mockReturnValue([mockSearchParams, mockSetSearchParamFn]);

jest.mock('@remix-run/react', () => ({
  useSearchParams: () => mockUseSearchParamsFn(),
  useNavigate: () => mockUseNavigateFn(),
}));

describe('Search Component', () => {
  it('saves the entered value in the url when clicking on the search button', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    fireEvent.click(searchButton);

    expect(mockNavigateFn).toHaveBeenCalledWith('/main?page=1&q=Naruto');
  });

  it('mounts with initial value', async () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    expect(searchInput).toHaveValue('One Piece');
  });
});
