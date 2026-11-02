import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { getMovies } from '@/services/movies';
import type { Movie } from '@/types/movie';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (showSpinner: boolean) => {
    if (showSpinner) setLoading(true);
    try {
      setMovies(await getMovies());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload every time the screen comes back into focus so added/edited movies show up.
  useFocusEffect(
    useCallback(() => {
      load(false);
    }, [load])
  );

  const refetch = useCallback(() => load(true), [load]);

  return { movies, loading, error, refetch };
}
