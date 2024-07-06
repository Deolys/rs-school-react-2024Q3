import { Component } from 'react';
import type { ReactNode } from 'react';
import classes from './header.module.scss';

interface HeaderProps {
  children: ReactNode;
}

export class Header extends Component<HeaderProps> {
  render(): ReactNode {
    return (
      <header className={classes.header}>
        <div className={classes.headerWrapper}>{this.props.children}</div>
      </header>
    );
  }
}

export default Header;
