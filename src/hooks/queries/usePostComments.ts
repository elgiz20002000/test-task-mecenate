import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getPostComments } from '@/api/posts';
import type { Comment, CommentsResponse } from '@/schemas/post';
import { commentsQueryKeys } from './queryKeys';

interface UsePostCommentsResult {
  comments: Comment[];
  isLoading: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: unknown;
  refetch: () => Promise<unknown>;
  fetchNextPage: () => Promise<unknown>;
}

export function usePostComments(postId: string): UsePostCommentsResult {
  const query = useInfiniteQuery<
    CommentsResponse,
    Error,
    InfiniteData<CommentsResponse>,
    ReturnType<typeof commentsQueryKeys.list>,
    string | null
  >({
    queryKey: commentsQueryKeys.list(postId),
    queryFn: ({ pageParam, signal }) =>
      getPostComments({
        postId,
        limit: 20,
        cursor: pageParam,
        signal,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor ?? null : null,
    enabled: postId.length > 0,
    staleTime: 10_000,
  });

  const comments = useMemo<Comment[]>(
    () => query.data?.pages.flatMap((page) => page.data.comments) ?? [],
    [query.data],
  );

  return {
    comments,
    isLoading: query.isPending,
    isRefetching: query.isRefetching && !query.isFetchingNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: Boolean(query.hasNextPage),
    error: query.error,
    refetch: query.refetch,
    fetchNextPage: query.fetchNextPage,
  };
}
