import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  movieId: string;
};

// TODO(Benjamin, Sprint 1): reviews list + rating summary
export function ReviewsSection({ movieId }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="smallBold">Reviews</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Reviews for movie {movieId} go here
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.four,
    gap: Spacing.one,
  },
});
