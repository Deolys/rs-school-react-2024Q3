import type { JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

export function CardDetails(): JSX.Element {
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');

  return <>{details && <aside>some details. {searchParams.get('details')}</aside>}</>;
}

export default CardDetails;
