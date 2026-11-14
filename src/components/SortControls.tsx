import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { SortBy, SortDirection, WatchedFilter } from '@/types/movie';
import { useState } from 'react';

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
const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'title', label: 'Title' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating' },
];

const DIRECTION_LABELS: Record<SortBy, Record<SortDirection, string>> = {
  title: { asc: 'A → Z', desc: 'Z → A' },
  year: { asc: 'Oldest', desc: 'Newest' },
  rating: { asc: 'Lowest', desc: 'Highest' },
};

export function SortControls(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>  
        <ThemedText type="small" themeColor="textSecondary">
          Sort ▾
        </ThemedText>
      </Pressable>

      {isOpen && (
        <View style = {styles.row}>
          {SORT_OPTIONS.map((option) => (
            <Pressable 
              key = {option.value} 
              style = {[styles.button, props.sortBy === option.value && styles.selected]}
              onPress={() => {
                props.onSortByChange(option.value);
                
                if (option.value === 'title') {
                  props.onDirectionChange('asc');
                } else {
                  props.onDirectionChange('desc');
                }
              }}>
              <ThemedText type="small" themeColor="textSecondary">
                {option.label}
              </ThemedText>
            </Pressable>
          ))}

          <Pressable
            style = {styles.button}
            onPress={() => props.onDirectionChange(props.direction === 'asc' ? 'desc' : 'asc')}>
            <ThemedText type="small" themeColor="textSecondary">
              {DIRECTION_LABELS[props.sortBy][props.direction]}
            </ThemedText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  button: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  selected: {
    backgroundColor: 'rgba(241, 206, 153, 0.3)',
  },
});
