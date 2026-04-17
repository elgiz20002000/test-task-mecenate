import type { FeedFilter } from '@/schemas/post';

export interface FeedTabDefinition {
  readonly id: FeedFilter;
  readonly label: string;
}

export const FEED_TABS: readonly FeedTabDefinition[] = [
  { id: 'all', label: 'Все' },
  { id: 'free', label: 'Бесплатные' },
  { id: 'paid', label: 'Платные' },
];
