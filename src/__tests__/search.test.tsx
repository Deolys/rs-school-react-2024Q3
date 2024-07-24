import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/search';

describe('Search Component', () => {
  const handleSearch = jest.fn();

  it('looks for the value when clicking on the search button', async () => {
    render(<Search onSearch={handleSearch} initialValue="" />);
    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalledWith('Naruto');
  });

  it('mounts with initial value', async () => {
    render(<Search onSearch={handleSearch} initialValue="One Piece" />);

    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    expect(searchInput).toHaveValue('One Piece');
  });
});
