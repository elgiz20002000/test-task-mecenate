import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useEffect, useMemo, useRef } from 'react';

import { getPosts } from '@/api/posts';
import type { Post, PostsResponse, Tier } from '@/schemas/post';
import { postsQueryKeys } from './queryKeys';

interface UseFeedPostsArgs {
  tier?: Tier;
  simulateError?: boolean;
  pageSize?: number;
}

interface UseFeedPostsResult {
  posts: Post[];
  isLoading: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: unknown;
  refetch: () => Promise<unknown>;
  fetchNextPage: () => Promise<unknown>;
}

export function useFeedPosts({
  tier,
  simulateError = false,
  pageSize = 10,
}: UseFeedPostsArgs = {}): UseFeedPostsResult {
  const query = useInfiniteQuery<
    PostsResponse,
    Error,
    InfiniteData<PostsResponse>,
    ReturnType<typeof postsQueryKeys.list>,
    string | null
  >({
    queryKey: postsQueryKeys.list(tier, simulateError),
    queryFn: ({ pageParam, signal }) =>
      getPosts({
        limit: pageSize,
        cursor: pageParam,
        tier,
        simulateError,
        signal,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor ?? null : null,
    staleTime: 30_000,
    retry: 1,
  });
  const posts = useMemo<Post[]>(
    () => query.data?.pages.flatMap((page) => page.data.posts) ?? [],
    [query.data],
  );

  const prefetchedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    const fresh: string[] = [];
    for (const post of posts) {
      const uri = post.coverUrl;
      if (!uri) continue;
      if (prefetchedRef.current.has(uri)) continue;
      prefetchedRef.current.add(uri);
      fresh.push(uri);
    }
    if (fresh.length > 0) {
      void Image.prefetch(fresh, 'disk');
    }
  }, [posts]);

  return {
    posts,
    isLoading: query.isPending,
    isRefetching: query.isRefetching && !query.isFetchingNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: Boolean(query.hasNextPage),
    error: query.error,
    refetch: query.refetch,
    fetchNextPage: query.fetchNextPage,
  };
}
