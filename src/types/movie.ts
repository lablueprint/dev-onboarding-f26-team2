export const GENRES = [
  'Action',
  'Animation',
  'Comedy',
  'Documentary',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
] as const;

export type Genre = (typeof GENRES)[number];

export type Movie = {
  id: string;
  title: string;
  genre: Genre;
  year: number;
  runtimeMinutes: number;
  director: string;
  cast: string[];
  rating: number; // average rating, 0-5
  posterUrl: string;
  synopsis: string;
};

// What the add/edit form produces. The app sets id and rating.
export type NewMovie = Omit<Movie, 'id' | 'rating'>;

export type MovieFilters = {
  search: string;
  genre: Genre | null;
};

export type SortBy = 'title' | 'year' | 'rating';
export type SortDirection = 'asc' | 'desc';
export type WatchedFilter = 'all' | 'watched' | 'unwatched';
