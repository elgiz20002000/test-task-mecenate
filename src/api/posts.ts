import {
  commentsResponseSchema,
  createCommentResponseSchema,
  likeResponseSchema,
  postDetailResponseSchema,
  postsResponseSchema,
  type CommentsResponse,
  type CreateCommentResponse,
  type LikeResponse,
  type PostDetailResponse,
  type PostsResponse,
  type Tier,
} from '@/schemas/post';

import { request } from './client';

interface GetPostsArgs {
  limit?: number;
  cursor?: string | null;
  tier?: Tier;
  simulateError?: boolean;
  signal?: AbortSignal;
}
export async function getPosts({
  limit = 10,
  cursor,
  tier,
  simulateError,
  signal,
}: GetPostsArgs = {}): Promise<PostsResponse> {
  return request({
    path: '/posts',
    method: 'GET',
    query: {
      limit,
      cursor: cursor ?? undefined,
      tier,
      simulate_error: simulateError ? 'true' : undefined,
    },
    schema: postsResponseSchema,
    signal,
  });
}

export async function getPostById(id: string, signal?: AbortSignal): Promise<PostDetailResponse> {
  return request({
    path: `/posts/${id}`,
    method: 'GET',
    schema: postDetailResponseSchema,
    signal,
  });
}

interface GetPostCommentsArgs {
  postId: string;
  limit?: number;
  cursor?: string | null;
  signal?: AbortSignal;
}

export async function getPostComments({
  postId,
  limit = 20,
  cursor,
  signal,
}: GetPostCommentsArgs): Promise<CommentsResponse> {
  return request({
    path: `/posts/${postId}/comments`,
    method: 'GET',
    query: {
      limit,
      cursor: cursor ?? undefined,
    },
    schema: commentsResponseSchema,
    signal,
  });
}

export async function togglePostLike(postId: string): Promise<LikeResponse> {
  return request({
    path: `/posts/${postId}/like`,
    method: 'POST',
    body: {},
    schema: likeResponseSchema,
  });
}

export async function createPostComment(postId: string, text: string): Promise<CreateCommentResponse> {
  return request({
    path: `/posts/${postId}/comments`,
    method: 'POST',
    body: { text },
    schema: createCommentResponseSchema,
  });
}
