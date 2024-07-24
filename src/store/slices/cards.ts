import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '@/services/api';
import { CardsPagesData, ICard, PaginationData } from '@/services/interfaces';

interface InitialState {
  cards: {
    items: ICard[];
    status: string;
  };
  pagination: {
    data: PaginationData | null;
    status: string;
  };
  currentPage: number;
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
  currentPage: 1,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPagination: (state, action: PayloadAction<PaginationData>) => {
      state.pagination.data = action.payload;
      state.pagination.status = 'success';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(animeApi.endpoints.searchCards.matchPending, (state) => {
      state.cards.items = [];
      state.pagination.data = null;
      state.cards.status = 'loading';
      state.pagination.status = 'loading';
    });
    builder.addMatcher(
      animeApi.endpoints.searchCards.matchFulfilled,
      (state, action: PayloadAction<CardsPagesData>) => {
        state.cards.items = action.payload.data;
        state.pagination.data = action.payload.pagination;
        state.cards.status = 'success';
        state.pagination.status = 'success';
      },
    );
    builder.addMatcher(animeApi.endpoints.searchCards.matchRejected, (state) => {
      state.cards.items = [];
      state.pagination.data = null;
      state.cards.status = 'error';
      state.pagination.status = 'error';
    });
  },
});

export const { reducer: cardsReducer, actions: cardsActions } = cardsSlice;
