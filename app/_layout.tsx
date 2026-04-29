import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppLayout } from '@/components/layout';
import { QueryProvider } from '@/providers/queryProvider';
import { AppStoreProvider } from '@/providers/storeProvider';
import { useManropeFonts } from '@/theme';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function RootLayout() {
  const fontsLoaded = useManropeFonts();


  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => { });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppStoreProvider>
      <QueryProvider>
        <KeyboardProvider>
          <SafeAreaProvider>
            <AppLayout />
          </SafeAreaProvider>
        </KeyboardProvider>
      </QueryProvider>
    </AppStoreProvider>
  );
}
