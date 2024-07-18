import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { animeApi } from '@services/api';
import { cardsReducer } from './slices/cards';

const rootReducer = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  cards: cardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
