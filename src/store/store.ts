import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import { animeApi } from '@/services/api';
import { cardsReducer } from './slices/cards';
import { selectedCardsReducer } from './slices/selected-cards';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  cards: cardsReducer,
  selectedCards: selectedCardsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
  });

const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
  });

export const store = setupStore();
export type RootState = { [Key: string]: typeof rootReducer };
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
