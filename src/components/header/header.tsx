import type { JSX } from 'react';
import classes from './header.module.scss';

interface HeaderProps {
  children: JSX.Element[];
}

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className={classes.header}>
      <div className={classes.headerWrapper}>{children}</div>
    </header>
  );
}

export default Header;
