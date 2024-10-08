export type CardKeyTypes =
  | string
  | number
  | null
  | { [key: string]: { [key: string]: string } }
  | { [key: string]: string }[];

export interface ICard {
  [key: string]: CardKeyTypes;
  mal_id: number;
  title: string;
  score: number;
  duration: string;
  rank: number;
  synopsis: string;
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

export interface CardsPagesData {
  data: ICard[];
  pagination: PaginationData;
}

export interface CardData {
  data: ICard;
}

export interface CardAndPagesData {
  data: ICard;
  pagination: PaginationData;
}

export interface SearchParams {
  queryParam: string;
  page: number;
}
