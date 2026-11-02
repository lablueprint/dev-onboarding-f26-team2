import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function HeaderButtons() {
  const theme = useTheme();

  return (
    <View style={styles.headerButtons}>
      <Link href="/api-test" asChild>
        <Pressable hitSlop={8}>
          <Ionicons name="construct-outline" size={22} color={theme.text} />
        </Pressable>
      </Link>
      <Link href="/add" asChild>
        <Pressable hitSlop={8}>
          <Ionicons name="add" size={28} color={theme.text} />
        </Pressable>
      </Link>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          headerRight: () => <HeaderButtons />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" color={color as string} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginRight: Spacing.three,
  },
});
