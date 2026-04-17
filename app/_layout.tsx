import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryProvider } from '@/providers/queryProvider';
import { AppStoreProvider } from '@/providers/storeProvider';
import { colors, useManropeFonts } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});
export default function RootLayout() {
  const fontsLoaded = useManropeFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppStoreProvider>
      <QueryProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.pageBackground },
              animation: 'fade',
            }}
          />
        </SafeAreaProvider>
      </QueryProvider>
    </AppStoreProvider>
  );
}
