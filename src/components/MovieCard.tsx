import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
};

// TODO(Dhruv, Sprint 1): build the real card (poster, title, genre, year, rating)
export function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`} style={styles.placeholder}>
      <ThemedText>{movie.title}</ThemedText>
    </Link>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    paddingVertical: Spacing.two,
  },
});
