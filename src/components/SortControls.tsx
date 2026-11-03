import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { SortBy, SortDirection, WatchedFilter } from '@/types/movie';

type Props = {
  sortBy: SortBy;
  onSortByChange: (sortBy: SortBy) => void;
  direction: SortDirection;
  onDirectionChange: (direction: SortDirection) => void;
  watchedFilter: WatchedFilter; // Sprint 2
  onWatchedFilterChange: (filter: WatchedFilter) => void; // Sprint 2
  totalCount: number; // Sprint 2
};

// TODO(Eda, Sprint 1): sort controls. Sprint 2: watched filter
export function SortControls(props: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary">
        Sort controls go here
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
