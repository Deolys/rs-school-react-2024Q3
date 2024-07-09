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
};

//important: removes duplicates from the data due to a backend bug
const removeDuplicates = (fullData: CardsData): CardsData | null => {
  const { pagination, data } = fullData;
  const uniqueData = data.filter((card, index, self) => {
    return self.findIndex((c) => c.mal_id === card.mal_id) === index;
  });
  return { pagination, data: uniqueData };
};
