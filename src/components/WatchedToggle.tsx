import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  movieId: string;
};

// TODO(Eda, Sprint 2): "Mark as watched" button
export function WatchedToggle({ movieId }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary">
        Watched button for movie {movieId} goes here
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.three,
  },
});
