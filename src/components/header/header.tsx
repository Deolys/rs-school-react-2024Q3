import { Component, ReactNode } from 'react';
import classes from './header.module.scss';

interface IHeaderProps {
  children: ReactNode;
}

export class Header extends Component<IHeaderProps> {
  render(): ReactNode {
    return <header className={classes.header}>{this.props.children}</header>;
  }
}

export default Header;
