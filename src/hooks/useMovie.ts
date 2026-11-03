import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { getMovieById } from '@/services/movies';
import type { Movie } from '@/types/movie';

export function useMovie(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reload on focus so the screen is up to date after editing.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getMovieById(id)
        .then((r) => {
          if (!cancelled) {
            setMovie(r);
            setError(null);
          }
        })
        .catch((e) => {
          if (!cancelled) setError(e instanceof Error ? e.message : 'Something went wrong');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, [id])
  );

  return { movie, loading, error };
}
