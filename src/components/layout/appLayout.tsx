import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAppRealtime } from '@/hooks/realtime';
import { colors } from '@/theme';

export function AppLayout() {
  useAppRealtime();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.pageBackground },
          animation: 'fade',
        }}
      />
    </>
  );
}
