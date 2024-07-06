import { Component } from 'react';
import type { ReactNode } from 'react';
import classes from './fallback-ui.module.scss';
import CatFailImg from '@assets/images/cat-fail.jpg';

export class FallbackUI extends Component {
  handleReloadPage = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    return (
      <div className={classes.fallbackWrapper}>
        <img src={CatFailImg} alt="The image of a cat's failure" />
        <h3>Something went wrong...</h3>
        <button className={classes.retryButton} onClick={this.handleReloadPage} type="button">
          Retry
        </button>
      </div>
    );
  }
}

export default FallbackUI;
