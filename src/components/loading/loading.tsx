import type { JSX } from 'react';
import classes from './loading.module.scss';

export function Loading(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader} data-testid="loading"></div>
    </div>
  );
}

export default Loading;
