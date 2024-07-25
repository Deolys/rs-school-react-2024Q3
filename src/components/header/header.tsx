import type { JSX, ReactNode } from 'react';
import classes from './header.module.scss';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className={classes.header}>
      <div className={classes.headerWrapper}>{children}</div>
    </header>
  );
}

export default Header;
