import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from '../store/hooks';
import { cardsActions } from '../store/slices/cards';

const rootActions = {
  ...cardsActions,
};

export function useActions(): ActionCreatorsMapObject {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}

export default useActions;
