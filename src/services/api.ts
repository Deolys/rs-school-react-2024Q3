import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardData, CardsPagesData, SearchParams } from './interfaces';
import { SERVER_URL } from './variables';
import { HYDRATE } from 'next-redux-wrapper';

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
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
