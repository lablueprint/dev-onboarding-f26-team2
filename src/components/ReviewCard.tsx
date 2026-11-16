import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Review } from '@/types/review';
import { timeAgo } from '@/utils/date';

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { borderColor: theme.backgroundSelected }]}>
      <View style={styles.header}>
        <View
          style={[styles.avatar, { backgroundColor: theme.backgroundElement }]}
          accessible={false}>
          <ThemedText type="smallBold">{review.author.charAt(0).toUpperCase()}</ThemedText>
        </View>
        <View style={styles.author}>
          <ThemedText type="smallBold">{review.author}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {timeAgo(review.createdAt)}
          </ThemedText>
        </View>
        <ThemedText type="small" accessibilityLabel={`${review.rating} out of 5 stars`}>
          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
        </ThemedText>
      </View>
      <ThemedText type="small">{review.text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  author: {
    flex: 1,
  },
});
