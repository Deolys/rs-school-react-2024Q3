import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardData, CardsData, SearchParams } from './interfaces';
import { SERVER_URL } from './variables';

//important: removes duplicates from the data due to a backend bug
const removeDuplicates = (fullData: CardsData): CardsData => {
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
    searchCards: builder.query<CardsData, SearchParams>({
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
      transformResponse: (response: CardsData) => removeDuplicates(response),
    }),
  }),
});

export const { useGetCardByIdQuery, useSearchCardsQuery } = animeApi;
