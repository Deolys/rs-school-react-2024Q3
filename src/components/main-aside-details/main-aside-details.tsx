'use client';

import type { JSX, ReactNode } from 'react';
import classes from './main-aside-details.module.scss';
import crossImg from '@/assets/icons/cross.svg';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface MainAsideDetailsProps {
  children?: ReactNode;
}

export function MainAsideDetails({ children }: MainAsideDetailsProps): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const { id } = useParams();

  const handleClose = (): void => {
    if (id) {
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <>
      {id && (
        <aside className={classes.asideWrapper}>
          <button className={classes.closeButton} type="button" onClick={handleClose}>
            <Image src={crossImg} alt="cross" />
          </button>
          {children}
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
