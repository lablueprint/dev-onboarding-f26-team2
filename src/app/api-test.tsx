import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

// TODO(Linn, Sprint 1): fetch from EXPO_PUBLIC_API_URL and show the results
export default function ApiTestScreen() {
  return (
    <View style={styles.container}>
      <ThemedText>Nothing here yet. This screen will show data from the API.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.three,
  },
});
