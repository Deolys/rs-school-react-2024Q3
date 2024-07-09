export interface ICard {
  mal_id: number;
  title: string;
  score: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  year: number | null;
  genres: {
    name: string;
  }[];
}

export interface PaginationData {
  last_visible_page: number;
  has_next_page: boolean;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface CardsData {
  data: ICard[];
  pagination: PaginationData;
}
