import { MOVIES } from '@/data/movies';
import type { Movie, NewMovie } from '@/types/movie';

// Mock data layer. Everything is stored in memory, so changes reset when the app reloads.
// In Sprint 2 these functions will call the real API instead. The function signatures
// should stay the same so nothing else in the app has to change.

let movies: Movie[] = [...MOVIES];

const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 300));

export async function getMovies(): Promise<Movie[]> {
  await fakeDelay();
  return [...movies];
}

export async function getMovieById(id: string): Promise<Movie | null> {
  await fakeDelay();
  return movies.find((m) => m.id === id) ?? null;
}

export async function addMovie(input: NewMovie): Promise<Movie> {
  await fakeDelay();
  const movie: Movie = { ...input, id: String(Date.now()), rating: 0 };
  movies = [movie, ...movies];
  return movie;
}

export async function updateMovie(id: string, input: NewMovie): Promise<Movie> {
  await fakeDelay();
  const existing = movies.find((m) => m.id === id);
  if (!existing) {
    throw new Error('Movie not found');
  }
  const updated: Movie = { ...input, id: existing.id, rating: existing.rating };
  movies = movies.map((m) => (m.id === id ? updated : m));
  return updated;
}
