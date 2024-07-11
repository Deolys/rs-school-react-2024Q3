import { CardDetails } from '@components/card-details/card-details';
import { api } from '@services/api';
import { ICard } from '@services/interfaces';
import { useEffect, type JSX, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function MainAsideDetails(): JSX.Element {
  const [searchParams] = useSearchParams();
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
      })
      .catch((error) => {
        console.error('Error while fetching card:', error);
        setError('Getting the details failed. Please, try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [details]);

  return (
    <>
      {details && (
        <aside>
          <CardDetails card={cardData} isLoading={isLoading} error={error} />
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
