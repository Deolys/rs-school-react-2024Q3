import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardData, CardsPagesData, SearchParams } from './interfaces';
import { SERVER_URL } from './variables';

//important: removes duplicates from the data due to a backend bug
const removeDuplicates = (fullData: CardsPagesData): CardsPagesData => {
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
    searchCards: builder.query<CardsPagesData, SearchParams>({
      query: ({ queryParam, page = 1 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          sfw: 'true',
        });
        if (queryParam) {
          params.append('q', queryParam);
        }
        return `?${params.toString()}`;
      },
      transformResponse: (response: CardsPagesData) => removeDuplicates(response),
    }),
  }),
});

export const { useGetCardByIdQuery, useSearchCardsQuery } = animeApi;

export const api = {
  searchCards: async (query: string, page: number = 1): Promise<CardsPagesData | null> => {
    const params = new URLSearchParams({
      page: page.toString(),
      sfw: 'true',
    });
    if (query) {
      params.append('q', query);
    }
    const response = await fetch(`${SERVER_URL}?${params.toString()}`, { cache: 'no-store' });
    const data = await response.json();
    return removeDuplicates(data);
  },
  getCardById: async (id: number): Promise<CardData | null> => {
    const response = await fetch(`${SERVER_URL}/${id}`, { cache: 'no-store' });
    const data = await response.json();
    return data;
  },
};
