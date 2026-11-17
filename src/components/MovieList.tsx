import { FlatList, StyleSheet } from 'react-native';

import { MovieCard } from '@/components/MovieCard';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Movie } from '@/types/movie';

type Props = {
  movies: Movie[];
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function MovieList({ movies, refreshing = false, onRefresh }: Props) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(movie) => movie.id}
      renderItem={({ item }) => <MovieCard movie={item} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <ThemedText themeColor="textSecondary" style={styles.empty}>
          No movies found
        </ThemedText>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
