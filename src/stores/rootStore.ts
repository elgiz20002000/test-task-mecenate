import { createContext, useContext } from 'react';

import { UiStore } from './uiStore';

export class RootStore {
  readonly ui: UiStore;

  constructor() {
    this.ui = new UiStore();
  }
}

export const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = StoreContext.Provider;

export function useStores(): RootStore {
  return useContext(StoreContext);
}

export function useUiStore(): UiStore {
  return useStores().ui;
}
