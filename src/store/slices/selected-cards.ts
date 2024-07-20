import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICard } from '@/services/interfaces';

const initialState: ICard[] = [];

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<ICard>) => {
      const index = state.findIndex((card) => card.mal_id === action.payload.mal_id);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
    unselectAll: () => {
      return [];
    },
  },
});

export const { reducer: selectedCardsReducer, actions: selectedCardsActions } = selectedCardsSlice;
