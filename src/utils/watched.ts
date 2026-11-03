import type { Movie, WatchedFilter } from '@/types/movie';

// TODO(Eda, Sprint 2): filter by all / watched / unwatched
export function filterByWatched(
  movies: Movie[],
  filter: WatchedFilter,
  watchedIds: string[]
): Movie[] {
  return movies;
}
