import { createContext, useState, useEffect } from 'react';
import type { ReactNode, JSX } from 'react';

interface ContextTheme {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const themes = {
  light: 'light',
  dark: 'dark',
};

const getCurrentTheme = (): string => {
  if (typeof window !== 'undefined') {
    {
      const theme = `${window.localStorage.getItem('theme')}`;
      if (Object.values(themes).includes(theme)) return theme;

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) return themes.dark;
    }
  }

  return themes.light;
};

export const ThemeContext = createContext<ContextTheme>({
  theme: themes.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
