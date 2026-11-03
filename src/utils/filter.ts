import type { Movie, MovieFilters } from '@/types/movie';

// TODO(Taarini): filter by search (Sprint 1) and genre (Sprint 2)
export function filterMovies(movies: Movie[], { search, genre }: MovieFilters): Movie[] {
  return movies;
}
