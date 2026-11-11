import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { GENRES, type Genre, type Movie } from '@/types/movie';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ApiTestScreen() {
  const theme = useTheme();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_URL) return;

    let cancelled = false;
    const params = genre ? `?genre=${encodeURIComponent(genre)}` : '';

    async function load() {
      try {
        const response = await fetch(`${API_URL}/movies${params}`);
        if (!response.ok) {
          let message = `Request failed (${response.status})`;
          try {
            const body: unknown = await response.json();
            if (
              body &&
              typeof body === 'object' &&
              'error' in body &&
              typeof body.error === 'string'
            ) {
              message = body.error;
            }
          } catch {
            // The error body was not JSON.
          }
          throw new Error(message);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response from the server');
        }
        if (cancelled) return;
        setMovies(data as Movie[]);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setMovies([]);
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [genre, requestId]);

  function refetch(nextGenre: Genre | null) {
    setGenre(nextGenre);
    setLoading(true);
    setError(null);
    setRequestId((id) => id + 1);
  }

  if (!API_URL) {
    return (
      <View style={styles.center}>
        <ThemedText style={styles.message}>
          EXPO_PUBLIC_API_URL is not set. Add it to .env.local and restart Expo.
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genres}
      >
        <GenreButton label="All" selected={genre === null} onPress={() => refetch(null)} />
        {GENRES.map((item) => (
          <GenreButton
            key={item}
            label={item}
            selected={genre === item}
            onPress={() => refetch(item)}
          />
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={theme.text} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <ThemedText style={styles.message}>{error}</ThemedText>
          <Pressable
            onPress={() => refetch(genre)}
            style={[styles.retry, { backgroundColor: theme.backgroundElement }]}
          >
            <ThemedText type="smallBold">Retry</ThemedText>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <ThemedText type="small" themeColor="textSecondary">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </ThemedText>
          {movies.map((movie) => (
            <View
              key={movie.id}
              style={[styles.row, { backgroundColor: theme.backgroundElement }]}
            >
              <ThemedText type="smallBold">{movie.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {movie.genre} · {movie.year} · {movie.rating.toFixed(1)}
              </ThemedText>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function GenreButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.genre,
        { backgroundColor: selected ? theme.backgroundSelected : theme.backgroundElement },
      ]}
    >
      <ThemedText type="small">{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genres: {
    gap: Spacing.two,
    padding: Spacing.three,
  },
  genre: {
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  message: {
    textAlign: 'center',
  },
  retry: {
    borderRadius: 8,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  list: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
  },
  row: {
    borderRadius: 8,
    gap: Spacing.half,
    padding: Spacing.three,
  },
});
