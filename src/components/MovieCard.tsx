import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => router.push(`/movie/${movie.id}`)}
      style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <Image source={movie.posterUrl} style={styles.poster} contentFit="cover" />
      <View style={styles.info}>
        <ThemedText type="smallBold">{movie.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {movie.genre} · {movie.year}
        </ThemedText>
        <ThemedText type="small">⭐ {movie.rating}</ThemedText>

        {expanded && <ThemedText type="small">{movie.synopsis}</ThemedText>}

        <Pressable onPress={() => setExpanded(!expanded)} hitSlop={8}>
          <ThemedText type="linkPrimary">{expanded ? 'Show less' : 'Show more'}</ThemedText>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  info: {
    marginTop: Spacing.two,
    gap: Spacing.one,
  },
});
