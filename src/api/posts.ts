import { postsResponseSchema, type PostsResponse, type Tier } from '@/schemas/post';

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
