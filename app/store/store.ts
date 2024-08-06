import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from './slices/cards';
import { selectedCardsReducer } from './slices/selected-cards';

const rootReducer = combineReducers({
  cards: cardsReducer,
  selectedCards: selectedCardsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
