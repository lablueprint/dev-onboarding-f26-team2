import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

// TODO(Dhruv, Sprint 2): show movies on the watchlist
export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <ThemedText themeColor="textSecondary">Movies on your watchlist will show up here.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
});
