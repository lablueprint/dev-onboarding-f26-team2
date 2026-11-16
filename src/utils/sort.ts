import type { Movie, SortBy, SortDirection } from '@/types/movie';

// TODO(Eda, Sprint 1): sort by title, year, or rating
export function sortMovies(movies: Movie[], sortBy: SortBy, direction: SortDirection): Movie[] {
  const sorted = [...movies].sort((a, b) => {
    let result = 0;
    if (sortBy === 'title') {
      result = a.title.localeCompare(b.title);
    } else if (sortBy === 'year') {
      result = a.year - b.year;
    } else if (sortBy === 'rating') {
      result = a.rating - b.rating;
    }

    if (result === 0) {
      result = a.title.localeCompare(b.title);
    }

    if (direction === 'desc') {
      return -result;
    }
    
    return result;
  });

  return sorted;
}
