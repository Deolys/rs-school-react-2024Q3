import type { JSX } from 'react';
import { CardDetails } from '@/components/card-details';
import classes from './main-aside-details.module.scss';
import crossImg from '@/assets/icons/cross.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';

export function MainAsideDetails(): JSX.Element {
  const router = useRouter();
  const { details, ...params } = router.query;

  const handleClose = (): void => {
    if (details) {
      router.push({ query: { ...params } }, undefined, { scroll: false });
    }
  };

  return (
    <>
      {details && (
        <aside className={classes.asideWrapper}>
          <button className={classes.closeButton} type="button" onClick={handleClose}>
            <Image src={crossImg} alt="cross" />
          </button>
          <CardDetails />
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
