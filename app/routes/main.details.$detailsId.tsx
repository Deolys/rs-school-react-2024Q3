import type { JSX } from 'react';
import { CardDetails } from '@/components/card-details';
import { useSearchParams } from '@remix-run/react';
import classes from '@/components/main-aside-details/main-aside-details.module.scss';
import crossImg from '@/assets/icons/cross.svg';

export function MainAsideDetails(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details');

  const handleClose = (): void => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <>
      {details && (
        <aside className={classes.asideWrapper}>
          <button className={classes.closeButton} type="button" onClick={handleClose}>
            <img src={crossImg} alt="cross" />
          </button>
          <CardDetails />
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
