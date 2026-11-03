import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ReviewsSection } from '@/components/ReviewsSection';
import { ThemedText } from '@/components/themed-text';
import { WatchedToggle } from '@/components/WatchedToggle';
import { Spacing } from '@/constants/theme';

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO(Dexton, Sprint 1): load the movie with useMovie(id) and render <MovieDetails />
  // Keep the Edit link (Isaiah), <WatchedToggle /> (Eda), and <ReviewsSection /> (Benjamin) on this screen.
  return (
    <View style={styles.container}>
      <ThemedText>Movie {id}</ThemedText>

      <Link href={`/edit/${id}`} style={styles.editLink}>
        <ThemedText type="linkPrimary">Edit</ThemedText>
      </Link>

      <WatchedToggle movieId={id} />
      <ReviewsSection movieId={id} />
    </View>
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
