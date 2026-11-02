import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

// TODO(Isaiah, Sprint 1): render <MovieForm />, call addMovie() on submit, then router.back()
export default function AddMovieScreen() {
  return (
    <View style={styles.container}>
      <ThemedText>Add movie (coming soon)</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.three,
  },
});
