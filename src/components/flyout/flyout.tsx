import type { JSX } from 'react';
import { useAppSelector } from '../../store/hooks';
import classes from './flyout.module.scss';
import useActions from '../../hooks/use-actions';

export function Flyout(): JSX.Element {
  const selectedCount = useAppSelector((state) => state.cards.selectedCards.length);
  const { unselectAll } = useActions();

  const handleUnselectAll = (): void => {
    unselectAll();
  };
  return (
    <>
      {selectedCount > 0 && (
        <div className={classes.flyout}>
          <p>
            Total selected cards: <span className={classes.selectedCount}>{selectedCount}</span>
          </p>
          <button type="button" className={classes.unselectButton} onClick={handleUnselectAll}>
            Unselect all
          </button>
          <button type="button" className={classes.downloadButton}>
            Download
          </button>
        </div>
      )}
    </>
  );
}

export default Flyout;
