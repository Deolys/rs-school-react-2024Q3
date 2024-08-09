import type { JSX } from 'react';
import classes from './fallback-ui.module.scss';
import CatFailImg from '@/assets/images/cat-fail.jpg';

export function FallbackUI(): JSX.Element {
  const handleReloadPage = (): void => {
    window.location.reload();
  };

  return (
    <div className={classes.fallbackWrapper}>
      <img src={CatFailImg} alt="The image of a cat's failure" />
      <h3>Something went wrong...</h3>
      <button className={classes.retryButton} onClick={handleReloadPage} type="button">
        Retry
      </button>
    </div>
  );
}

export default FallbackUI;
