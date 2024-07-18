import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '@services/api';
import { ICard, PaginationData } from '@services/interfaces';

interface InitialState {
  cards: {
    items: ICard[];
    status: string;
  };
  pagination: {
    data: PaginationData | null;
    status: string;
  };
  selectedCards: ICard[];
}

const initialState: InitialState = {
  cards: {
    items: [],
    status: 'loading',
  },
  pagination: {
    data: null,
    status: 'loading',
  },
  selectedCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<ICard>) => {
      const index = state.selectedCards.findIndex((card) => card.mal_id === action.payload.mal_id);
      if (index !== -1) {
        state.selectedCards.splice(index, 1);
      } else {
        state.selectedCards.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(animeApi.endpoints.searchCards.matchPending, (state) => {
      state.cards.items = [];
      state.pagination.data = null;
      state.cards.status = 'loading';
      state.pagination.status = 'loading';
    });
    builder.addMatcher(animeApi.endpoints.searchCards.matchFulfilled, (state, action) => {
      state.cards.items = action.payload.data;
      state.pagination.data = action.payload.pagination;
      state.cards.status = 'success';
      state.pagination.status = 'success';
    });
    builder.addMatcher(animeApi.endpoints.searchCards.matchRejected, (state) => {
      state.cards.items = [];
      state.pagination.data = null;
      state.cards.status = 'error';
      state.pagination.status = 'error';
    });
  },
});

export const { reducer: cardsReducer, actions: cardsActions } = cardsSlice;
