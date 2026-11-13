import type { Movie, MovieFilters } from "@/types/movie";

// TODO(Taarini): filter by search (Sprint 1) and genre (Sprint 2)
export function filterMovies(
  movies: Movie[],
  { search, genre }: MovieFilters,
): Movie[] {
  const query = search.trim().toLowerCase();
  if (query.length === 0) {
    return movies;
  }

  return movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(query);
    const directorMatch = movie.director.toLowerCase().includes(query);
    return titleMatch || directorMatch;
  });
}
