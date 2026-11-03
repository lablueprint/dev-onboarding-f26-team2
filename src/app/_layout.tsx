import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { WatchedProvider } from '@/context/WatchedContext';
import { WatchlistProvider } from '@/context/WatchlistContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <WatchlistProvider>
        <WatchedProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Discover' }} />
            <Stack.Screen name="movie/[id]" options={{ title: '' }} />
            <Stack.Screen name="add" options={{ title: 'Add Movie', presentation: 'modal' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Edit Movie' }} />
            <Stack.Screen name="api-test" options={{ title: 'API Test' }} />
          </Stack>
        </WatchedProvider>
      </WatchlistProvider>
    </ThemeProvider>
  );
}
