import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@components/search';
import { MemoryRouter } from 'react-router-dom';

describe('Search Component', () => {
  const handleSearch = jest.fn((value: string) => {
    localStorage.setItem('search-term', JSON.stringify(value));
  });
  const setItemMock = jest.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    setItemMock.mockClear();
    handleSearch.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('saves the entered value in localStorage when clicking on the search button', () => {
    render(
      <MemoryRouter>
        <Search onSearch={handleSearch} initialValue="" />
      </MemoryRouter>,
    );
    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    fireEvent.click(searchButton);

    expect(setItemMock).toHaveBeenCalledWith('search-term', '"Naruto"');
  });

  it('mounts with initial value', async () => {
    render(
      <MemoryRouter>
        <Search onSearch={handleSearch} initialValue="One Piece" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    expect(searchInput).toHaveValue('One Piece');
  });
});
