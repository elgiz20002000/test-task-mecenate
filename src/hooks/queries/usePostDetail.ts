import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/api/posts';
import type { Post } from '@/schemas/post';
import { postQueryKeys } from './queryKeys';

interface UsePostDetailResult {
  post: Post | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: unknown;
  refetch: () => Promise<unknown>;
}

export function usePostDetail(postId: string): UsePostDetailResult {
  const query = useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: ({ signal }) => getPostById(postId, signal),
    enabled: postId.length > 0,
    staleTime: 15_000,
  });

  return {
    post: query.data?.data.post,
    isLoading: query.isPending,
    isRefetching: query.isRefetching,
    error: query.error,
    refetch: query.refetch,
  };
}
