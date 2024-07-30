import { useState, type JSX, useEffect } from 'react';
import { CardDetails } from '@/components/card-details';
import classes from './main-aside-details.module.scss';
import crossImg from '@/assets/icons/cross.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Loading } from '../loading';
import useActions from '@/hooks/use-actions';
import { useAppSelector } from '@/store/hooks';
import { ICard } from '@/services/interfaces';

interface MainAsideDetailsProps {
  cardDetails: ICard;
}

export function MainAsideDetails({ cardDetails }: MainAsideDetailsProps): JSX.Element {
  const router = useRouter();
  const { details, ...params } = router.query;
  const { setAsideIsOpen } = useActions();
  const asideIsOpen = useAppSelector((state) => state.cards.asideIsOpen);

  useEffect(() => {
    if (details && !asideIsOpen) {
      setAsideIsOpen(true);
    }
  }, [asideIsOpen, details, setAsideIsOpen]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router.events]);

  const handleClose = (): void => {
    if (details) {
      setAsideIsOpen(false);
      router.push({ query: { ...params } }, undefined, { scroll: false });
    }
  };

  return (
    <>
      {asideIsOpen && (
        <aside className={classes.asideWrapper}>
          <button className={classes.closeButton} type="button" onClick={handleClose}>
            <Image src={crossImg} alt="cross" />
          </button>
          {isLoading ? <Loading /> : <CardDetails card={cardDetails} />}
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
