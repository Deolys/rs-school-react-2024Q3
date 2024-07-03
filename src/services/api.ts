export const api = {
  fetchCards: async () => {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    const data = await response.json();
    return data;
  },

  searchCards: async (query: string, page: number = 1) => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      sfw: 'true',
    });
    const response = await fetch(`https://api.jikan.moe/v4/anime}?${params.toString()}`);
    const data = await response.json();
    return data;
  },
};
