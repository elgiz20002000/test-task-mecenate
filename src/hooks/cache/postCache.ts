import type { InfiniteData, QueryClient } from '@tanstack/react-query';

import { commentsQueryKeys, postQueryKeys, postsQueryKeys } from '@/hooks/queries/queryKeys';
import type { Comment, CommentsResponse, PostDetailResponse, PostsResponse } from '@/schemas/post';

export function updatePostLikeAcrossCache(
  queryClient: QueryClient,
  postId: string,
  nextLike: { isLiked: boolean; likesCount: number },
): void {
  queryClient.setQueryData(postQueryKeys.detail(postId), (current: PostDetailResponse | undefined) => {
    if (!current) return current;
    return {
      ...current,
      data: {
        ...current.data,
        post: {
          ...current.data.post,
          isLiked: nextLike.isLiked,
          likesCount: nextLike.likesCount,
        },
      },
    };
  });

  queryClient.setQueriesData(
    {
      queryKey: postsQueryKeys.all,
      exact: false,
    },
    (current: InfiniteData<PostsResponse> | undefined) => {
      if (!current) return current;
      return {
        ...current,
        pages: current.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            posts: page.data.posts.map((post) =>
              post.id === postId
                ? {
                  ...post,
                  isLiked: nextLike.isLiked,
                  likesCount: nextLike.likesCount,
                }
                : post,
            ),
          },
        })),
      };
    },
  );
}

export function prependCommentToCache(
  queryClient: QueryClient,
  postId: string,
  comment: Comment,
  shouldIncrementCount: boolean,
): void {
  const hasCommentsCache = Boolean(queryClient.getQueryData(commentsQueryKeys.list(postId)));
  let wasInserted = false;

  queryClient.setQueryData(
    commentsQueryKeys.list(postId),
    (current: InfiniteData<CommentsResponse> | undefined) => {
      if (!current) return current;
      const alreadyExists = current.pages.some((page) =>
        page.data.comments.some((item) => item.id === comment.id),
      );
      if (alreadyExists) return current;

      const [firstPage, ...tailPages] = current.pages;
      if (!firstPage) return current;
      wasInserted = true;

      return {
        ...current,
        pages: [
          {
            ...firstPage,
            data: {
              ...firstPage.data,
              comments: [comment, ...firstPage.data.comments],
            },
          },
          ...tailPages,
        ],
      };
    },
  );

  if (!shouldIncrementCount) return;
  if (hasCommentsCache && !wasInserted) return;

  queryClient.setQueryData(postQueryKeys.detail(postId), (current: PostDetailResponse | undefined) => {
    if (!current) return current;
    return {
      ...current,
      data: {
        ...current.data,
        post: {
          ...current.data.post,
          commentsCount: current.data.post.commentsCount + 1,
        },
      },
    };
  });

  queryClient.setQueriesData(
    {
      queryKey: postsQueryKeys.all,
      exact: false,
    },
    (current: InfiniteData<PostsResponse> | undefined) => {
      if (!current) return current;
      return {
        ...current,
        pages: current.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            posts: page.data.posts.map((post) =>
              post.id === postId
                ? {
                  ...post,
                  commentsCount: post.commentsCount + 1,
                }
                : post,
            ),
          },
        })),
      };
    },
  );
}
