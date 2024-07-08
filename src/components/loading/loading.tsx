import { Component } from 'react';
import type { ReactNode } from 'react';
import classes from './loading.module.scss';

export class Loading extends Component {
  render(): ReactNode {
    return (
      <div className={classes.wrapper}>
        <div className={classes.loader}></div>
      </div>
    );
  }
}

export default Loading;
