import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPostComment } from '@/api/posts';
import { prependCommentToCache } from '@/hooks/cache';
import { commentsQueryKeys } from './queryKeys';

export function useCreatePostComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createPostComment(postId, text),
    onSuccess: (response) => {
      const hasCommentsQuery = Boolean(queryClient.getQueryData(commentsQueryKeys.list(postId)));
      prependCommentToCache(queryClient, postId, response.data.comment, hasCommentsQuery);
    },
  });
}
