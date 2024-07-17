import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardData, CardsData } from './interfaces';
import { SERVER_URL } from './variables';

export const api = {
  searchCards: async (query: string, page: number = 1): Promise<CardsData | null> => {
    const params = new URLSearchParams({
      page: page.toString(),
      sfw: 'true',
    });
    if (query) {
      params.append('q', query);
    }
    const response = await fetch(`${SERVER_URL}?${params.toString()}`);
    const data = await response.json();
    return removeDuplicates(data);
  },
  getCardById: async (id: number): Promise<CardData | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await fetch(`${SERVER_URL}/${id}`);
    const data = await response.json();
    return data;
  },
};

//important: removes duplicates from the data due to a backend bug
const removeDuplicates = (fullData: CardsData): CardsData | null => {
  const { pagination, data } = fullData;
  const uniqueData = data.filter((card, index, self) => {
    return self.findIndex((c) => c.mal_id === card.mal_id) === index;
  });
  return { pagination, data: uniqueData };
};

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (builder) => ({
    getCardById: builder.query<CardData, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCardByIdQuery } = animeApi;
