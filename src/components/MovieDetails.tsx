import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
};

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// TODO(Dexton, Sprint 1): show all the movie info
export function MovieDetails({ movie }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Image source={{ uri: movie.posterUrl }} style={styles.poster} />

      <ThemedText type="subtitle">{movie.title}</ThemedText>
      <ThemedText>
        {movie.genre} • {movie.year}
      </ThemedText>
      <ThemedText>{formatRuntime(movie.runtimeMinutes)} </ThemedText>
      <ThemedText>Directed by {movie.director}</ThemedText>
      <ThemedText>Rating: {movie.rating} / 5</ThemedText>

         <ThemedText type="subtitle">Cast</ThemedText>
      {movie.cast.map((actor) => (
        <ThemedText key={actor}>{actor}</ThemedText>
      ))}

      <ThemedText type="subtitle">Synopsis</ThemedText>
      <ThemedText numberOfLines={expanded ? undefined : 3}>
        {movie.synopsis}
      </ThemedText>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <ThemedText type="linkPrimary">
          {expanded ? 'Show less' : 'Read more'}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: Spacing.two,
    marginBottom: Spacing.two,
  },
});