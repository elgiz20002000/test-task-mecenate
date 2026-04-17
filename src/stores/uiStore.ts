import { makeAutoObservable } from 'mobx';

import type { FeedFilter, Tier } from '@/schemas/post';

export class UiStore {
  tierFilter: FeedFilter = 'all';
  simulateError = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTierFilter = (tier: FeedFilter): void => {
    this.tierFilter = tier;
  };

  toggleSimulateError = (): void => {
    this.simulateError = !this.simulateError;
  };

  setSimulateError = (value: boolean): void => {
    this.simulateError = value;
  };

  get tierQueryParam(): Tier | undefined {
    return this.tierFilter === 'all' ? undefined : this.tierFilter;
  }
}
