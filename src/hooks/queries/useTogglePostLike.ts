import { useMutation, useQueryClient } from '@tanstack/react-query';

import { togglePostLike } from '@/api/posts';
import { updatePostLikeAcrossCache } from '@/hooks/cache';
import { postQueryKeys, postsQueryKeys } from './queryKeys';
import type { PostDetailResponse, PostsResponse } from '@/schemas/post';

interface ToggleContext {
  previousState: { isLiked: boolean; likesCount: number } | null;
}

export function useTogglePostLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => togglePostLike(postId),
    onMutate: async (): Promise<ToggleContext> => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.detail(postId) });
      const detailPost = queryClient.getQueryData<PostDetailResponse>(postQueryKeys.detail(postId))?.data.post;
      const feedPost = queryClient
        .getQueriesData<{ pages: PostsResponse[] }>({
          queryKey: postsQueryKeys.all,
          exact: false,
        })
        .flatMap(([, value]) => value?.pages ?? [])
        .flatMap((page) => page.data.posts)
        .find((post) => post.id === postId);

      const post = detailPost ?? feedPost;
      if (!post) return { previousState: null };

      const optimisticLikesCount = post.isLiked
        ? Math.max(0, post.likesCount - 1)
        : post.likesCount + 1;
      const optimisticState = { isLiked: !post.isLiked, likesCount: optimisticLikesCount };
      updatePostLikeAcrossCache(queryClient, postId, optimisticState);

      return {
        previousState: { isLiked: post.isLiked, likesCount: post.likesCount },
      };
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousState) return;
      updatePostLikeAcrossCache(queryClient, postId, context.previousState);
    },
    onSuccess: (response) => {
      updatePostLikeAcrossCache(queryClient, postId, response.data);
    },
  });
}
