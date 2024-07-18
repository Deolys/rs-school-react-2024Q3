import { type JSX, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import classes from './flyout.module.scss';
import useActions from '../../hooks/use-actions';
import convertJSONToCSV from './convert-json-to-csv';

const fileHeaders = ['title', 'year', 'rank', 'duration', 'synopsis'];

export function Flyout(): JSX.Element {
  const selectedCards = useAppSelector((state) => state.cards.selectedCards);
  const selectedCount = selectedCards.length;
  const { unselectAll } = useActions();
  const [blob, setBlob] = useState(new Blob());

  const handleUnselectAll = (): void => {
    unselectAll();
  };

  const handleDownload = (): void => {
    if (selectedCount) {
      const csvData = convertJSONToCSV(selectedCards, fileHeaders);
      const newBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      setBlob(newBlob);
    }
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
          <a href={URL.createObjectURL(blob)} download={`${selectedCount}_animes.csv`}>
            <button type="button" className={classes.downloadButton} onClick={handleDownload}>
              Download
            </button>
          </a>
        </div>
      )}
    </>
  );
}

export default Flyout;
