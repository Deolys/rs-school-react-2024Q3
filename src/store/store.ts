import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import { animeApi } from '@services/api';
import { cardsReducer } from './slices/cards';

const rootReducer = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  cards: cardsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
  });

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
