import { Component, ReactNode } from 'react';
import classes from './header.module.scss';

interface IHeaderProps {
  children: ReactNode;
}

export class Header extends Component<IHeaderProps> {
  render(): ReactNode {
    return (
      <header className={classes.header}>
        <div className={classes.headerWrapper}>{this.props.children}</div>
      </header>
    );
  }
}

export default Header;
