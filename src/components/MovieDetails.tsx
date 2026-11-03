import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
};

// TODO(Dexton, Sprint 1): show all the movie info
export function MovieDetails({ movie }: Props) {
  return (
    <View>
      <ThemedText type="subtitle">{movie.title}</ThemedText>
    </View>
  );
}
