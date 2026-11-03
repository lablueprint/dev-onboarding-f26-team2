import { ScrollView, StyleSheet } from 'react-native';

import { MovieCard } from '@/components/MovieCard';
import { Spacing } from '@/constants/theme';
import type { Movie } from '@/types/movie';

type Props = {
  movies: Movie[];
  refreshing?: boolean;
  onRefresh?: () => void;
};

// TODO(Dhruv, Sprint 1): replace with a FlatList (pull-to-refresh, empty state)
export function MovieList({ movies }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
  },
});
