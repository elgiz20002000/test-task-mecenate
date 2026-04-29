import type { Tier } from '@/schemas/post';

export const postsQueryKeys = {
  all: ['posts'] as const,
  list: (tier: Tier | undefined, simulateError: boolean) =>
    [...postsQueryKeys.all, 'list', { tier: tier ?? 'all', simulateError }] as const,
};

export const commentsQueryKeys = {
  all: ['comments'] as const,
  list: (postId: string) => [...commentsQueryKeys.all, 'list', postId] as const,
};

export const postQueryKeys = {
  all: ['post'] as const,
  detail: (postId: string) => [...postQueryKeys.all, 'detail', postId] as const,
};
