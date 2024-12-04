import type { JSX } from 'react';
import { CardDetails } from '@/components/card-details';
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from '@remix-run/react';
import classes from '@/styles/main-aside-details.module.scss';
import crossImg from '@/assets/icons/cross.svg';
import { api } from '@/services/api';
import { json, TypedResponse } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { CardData } from '@/services/interfaces';
import { Loading } from '@/components/loading';

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<CardData | null>> {
  const details = Number(params.detailsId);
  const data = await api.getCardById(details);
  return json(data);
}

export function MainAsideDetails(): JSX.Element {
  const detailsData = useLoaderData<CardData | null>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const details = params.detailsId;

  const handleClose = (): void => {
    navigate(`/main?${searchParams.toString()}`);
  };

  return (
    <>
      {details && (
        <aside className={classes.asideWrapper}>
          <button className={classes.closeButton} type="button" onClick={handleClose}>
            <img src={crossImg} alt="cross" />
          </button>
          {navigation.state === 'loading' ? <Loading /> : <CardDetails detailsData={detailsData} />}
        </aside>
      )}
    </>
  );
}

export default MainAsideDetails;
