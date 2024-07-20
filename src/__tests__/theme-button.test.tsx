import '@testing-library/jest-dom';
import { ThemeButton } from '@/components/theme-button';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from '@/contexts/theme-context';

describe('ThemeButton', () => {
  window.matchMedia = jest.fn().mockImplementation(() => 'light');
  const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
  beforeEach(() => {
    setItemMock.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('sets user theme to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>,
    );
    expect(setItemMock).toHaveBeenCalledWith('theme', 'light');
  });

  it('changes theme when clicked', () => {
    const setThemeMock = jest.fn();
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: setThemeMock }}>
        <ThemeButton />
      </ThemeContext.Provider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
