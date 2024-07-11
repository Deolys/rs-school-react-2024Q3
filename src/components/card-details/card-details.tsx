import type { JSX } from 'react';
import { Loading } from '@components/loading';
import { ICard } from '@services/interfaces';

interface CardDetailsProps {
  card: ICard | null;
  isLoading: boolean;
  error: string;
}

export function CardDetails({ card, isLoading, error }: CardDetailsProps): JSX.Element {
  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{card?.title}</h1>
      <p>{card?.duration}</p>
      <p>{card?.rank}</p>
      <p>{card?.synopsis}</p>
    </div>
  );
}
