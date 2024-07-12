import { CardsData, ICard, PaginationData } from '@services/interfaces';

export const mockCards: ICard[] = [
  {
    mal_id: 1,
    title: 'Title 1',
    score: 7.5,
    duration: '12 episodes',
    rank: 1,
    synopsis: 'Synopsis for Title 1',
    images: {
      jpg: {
        image_url: 'https://example.com/image1.jpg',
      },
    },
    year: 2020,
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
  },
  {
    mal_id: 2,
    title: 'Title 2',
    score: 9.0,
    duration: '24 episodes',
    rank: 2,
    synopsis: 'Synopsis for Title 2',
    images: {
      jpg: {
        image_url: 'https://example.com/image2.jpg',
      },
    },
    year: null,
    genres: [{ name: 'Comedy' }, { name: 'Drama' }],
  },
  {
    mal_id: 3,
    title: 'Title 3',
    score: 8.5,
    duration: '16 episodes',
    rank: 3,
    synopsis: 'Synopsis for Title 3',
    images: {
      jpg: {
        image_url: 'https://example.com/image3.jpg',
      },
    },
    year: 2019,
    genres: [{ name: 'Fantasy' }, { name: 'Romance' }],
  },
];

export const mockCard: ICard = mockCards[0];

export const mockPagination: PaginationData = {
  last_visible_page: 1013,
  has_next_page: true,
  items: {
    count: 25,
    total: 25324,
    per_page: 25,
  },
};

export const mockCardData: CardsData = {
  data: [mockCards[0]],
  pagination: mockPagination,
};
