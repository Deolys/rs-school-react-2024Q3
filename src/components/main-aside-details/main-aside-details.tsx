import { useEffect, type JSX, useState } from 'react';
import { CardDetails } from '@components/card-details/card-details';
import { api } from '@services/api';
import { ICard } from '@services/interfaces';
import { useSearchParams } from 'react-router-dom';
import classes from './main-aside-details.module.scss';
import crossImg from '@assets/icons/cross.svg';

export function MainAsideDetails(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardData, setCardData] = useState<ICard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const details = searchParams.get('details');

  useEffect(() => {
    if (!details) {
      return;
    }
    setIsLoading(true);
    api
      .getCardById(Number(details))
      .then((fetchedCard) => {
        setCardData(fetchedCard?.data || null);
        setError('');
      })
      .catch((error) => {
        console.error('Error while fetching card:', error);
        setError('Getting the details failed. Please, try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [details]);

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
          <CardDetails card={cardData} isLoading={isLoading} errorMessage={error} />
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
