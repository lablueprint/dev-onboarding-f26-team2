import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Genre } from '@/types/movie';

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
  genre: Genre | null;
  onGenreChange: (genre: Genre | null) => void;
  resultCount: number;
};

// TODO(Taarini, Sprint 1): search bar. Sprint 2: genre chips
export function SearchFilters(props: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary">
        Search goes here
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
});
