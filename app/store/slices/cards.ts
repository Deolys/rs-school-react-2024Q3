import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICard, PaginationData } from '@/services/interfaces';

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
});

export const { reducer: cardsReducer, actions: cardsActions } = cardsSlice;
