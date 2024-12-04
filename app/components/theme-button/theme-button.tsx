import { useContext } from 'react';
import type { JSX } from 'react';
import { ThemeContext } from '@/contexts/theme-context';
import SunImg from '@/assets/icons/sun.svg';
import MoonImg from '@/assets/icons/moon.svg';
import classes from './theme-button.module.scss';

export function ThemeButton(): JSX.Element {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <button type="button" className={classes.themeButton} onClick={handleThemeToggle}>
      {theme === 'light' ? (
        <img src={MoonImg} alt="Moon" title="Swith to dark theme" />
      ) : (
        <img src={SunImg} alt="Sun" title="Swith to light theme" />
      )}
    </button>
  );
}

export default ThemeButton;
