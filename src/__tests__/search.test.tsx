import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@components/search';

describe('Search Component', () => {
  const searchCards = jest.fn();
  const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
  const getItemMock = jest.spyOn(Storage.prototype, 'getItem');

  beforeEach(() => {
    setItemMock.mockClear();
    getItemMock.mockClear();
    searchCards.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('сохраняет введенное значение в localStorage при клике на кнопку поиска', () => {
    render(<Search searchCards={searchCards} queryParam="" />);
    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    fireEvent.click(searchButton);

    expect(setItemMock).toHaveBeenCalledWith('search-term', '"Naruto"');
  });

  it('извлекает значение из localStorage при монтировании компонента', async () => {
    localStorage.setItem('search-term', JSON.stringify('One Piece'));
    render(<Search searchCards={searchCards} queryParam="" />);

    const searchInput = screen.getByPlaceholderText(/search for anime.../i);
    expect(getItemMock).toHaveBeenCalledWith('search-term');
    expect(searchInput).toHaveValue('One Piece');
  });
});
