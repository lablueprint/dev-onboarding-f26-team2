import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ReviewCard } from '@/components/ReviewCard';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { REVIEWS } from '@/data/reviews';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  movieId: string;
};

/** Movie-scoped rating summary and sortable reviews, initially limited to three cards. */
export function ReviewsSection({ movieId }: Props) {
  // Reset sorting and expansion when the detail screen switches movies.
  return <MovieReviews key={movieId} movieId={movieId} />;
}

function MovieReviews({ movieId }: Props) {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState<'newest' | 'rating'>('newest');
  const [showAll, setShowAll] = useState(false);
  const reviews = REVIEWS.filter((review) => review.movieId === movieId);
  const total = reviews.length;

  if (total === 0) {
    return (
      <View style={styles.container}>
        <ThemedText type="smallBold" accessibilityRole="header">Reviews (0)</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          No reviews yet.
        </ThemedText>
      </View>
    );
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / total;
  const sortedReviews = [...reviews].sort((a, b) => {
    const newestFirst = Date.parse(b.createdAt) - Date.parse(a.createdAt);
    return sortBy === 'rating' ? b.rating - a.rating || newestFirst : newestFirst;
  });
  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  return (
    <View style={styles.container}>
      <ThemedText type="smallBold" accessibilityRole="header">Reviews ({total})</ThemedText>

      <View style={styles.summary}>
        <View style={styles.average}>
          <ThemedText type="subtitle" accessibilityLabel={`Average rating: ${average.toFixed(1)} out of 5`}>
            {average.toFixed(1)}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">out of 5</ThemedText>
        </View>
        <View style={styles.breakdown}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((review) => review.rating === stars).length;
            const percent = (count / total) * 100;

            return (
              <View
                key={stars}
                style={styles.ratingRow}
                accessible
                accessibilityLabel={`${stars} stars: ${count} of ${total} reviews`}>
                <ThemedText type="small">{stars} ★</ThemedText>
                <View style={[styles.bar, { backgroundColor: theme.backgroundElement }]}>
                  <View style={[styles.barFill, { backgroundColor: theme.text, width: `${percent}%` }]} />
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.count}>
                  {count}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.sortControls}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: sortBy === 'newest' }}
          onPress={() => setSortBy('newest')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: sortBy === 'newest' ? theme.backgroundSelected : theme.backgroundElement },
            pressed && styles.pressed,
          ]}>
          <ThemedText type="smallBold">Newest</ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: sortBy === 'rating' }}
          onPress={() => setSortBy('rating')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: sortBy === 'rating' ? theme.backgroundSelected : theme.backgroundElement },
            pressed && styles.pressed,
          ]}>
          <ThemedText type="smallBold">Highest rated</ThemedText>
        </Pressable>
      </View>

      {visibleReviews.map((review) => <ReviewCard key={review.id} review={review} />)}

      {!showAll && total > 3 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`See all ${total} reviews`}
          onPress={() => setShowAll(true)}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.backgroundElement },
            pressed && styles.pressed,
          ]}>
          <ThemedText type="smallBold">See all</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.four,
    gap: Spacing.three,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  average: {
    alignItems: 'center',
  },
  breakdown: {
    flex: 1,
    gap: Spacing.one,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  count: {
    minWidth: 20,
    textAlign: 'right',
  },
  sortControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
