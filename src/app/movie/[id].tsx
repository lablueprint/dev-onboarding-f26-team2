import { MovieDetails } from '@/components/MovieDetails';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { ReviewsSection } from '@/components/ReviewsSection';
import { ThemedText } from '@/components/themed-text';
import { WatchedToggle } from '@/components/WatchedToggle';
import { Spacing } from '@/constants/theme';
import { useMovie } from '@/hooks/useMovie';

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movie, loading } = useMovie(id);
  if (loading) {
    return <ActivityIndicator />;
  }

  if (!movie) {
    return <ThemedText>Movie not found</ThemedText>;
  }

  // TODO(Dexton, Sprint 1): load the movie with useMovie(id) and render <MovieDetails />
  // Keep the Edit link (Isaiah), <WatchedToggle /> (Eda), and <ReviewsSection /> (Benjamin) on this screen.
  return (
    <ScrollView style={styles.container}>
        <Stack.Screen options={{ title: movie.title }} />
      <MovieDetails movie={movie} />

      <Link href={`/edit/${id}`} style={styles.editLink}>
        <ThemedText type="linkPrimary">Edit</ThemedText>
      </Link>

      <WatchedToggle movieId={id} />
      <ReviewsSection movieId={id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.three,
  },
  editLink: {
    marginTop: Spacing.two,
  },
});
