import { CardsData } from './interfaces';
import { SERVER_URL } from './variables';

export const api = {
  fetchCards: async (): Promise<CardsData | null> => {
    const response = await fetch(`${SERVER_URL}?sfw=true`);
    const data = await response.json();
    return data;
  },

  searchCards: async (query: string, page: number = 1): Promise<CardsData | null> => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      sfw: 'true',
    });
    const response = await fetch(`${SERVER_URL}?${params.toString()}`);
    const data = await response.json();
    return removeDuplicates(data);
  },
};

const removeDuplicates = (fullData: CardsData): CardsData => {
  const { pagination, data } = fullData;
  const uniqueData = data.filter((card, index, self) => {
    return self.findIndex((c) => c.mal_id === card.mal_id) === index;
  });
  return { pagination, data: uniqueData };
};
