import type { ReactNode } from 'react';

import { StoreProvider, rootStore } from '@/stores/rootStore';

interface AppStoreProviderProps {
  children: ReactNode;
}
export function AppStoreProvider({ children }: AppStoreProviderProps) {
  return <StoreProvider value={rootStore}>{children}</StoreProvider>;
}
