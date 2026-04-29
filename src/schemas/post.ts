import { z } from 'zod';

export const tierSchema = z.enum(['free', 'paid']);

export const feedFilterSchema = z.enum(['all', 'free', 'paid']);
export const authorSchema = z.object({
  id: z.string(),
  username: z.string().optional().default(''),
  displayName: z.string().optional().default(''),
  avatarUrl: z.string().optional().default(''),
  bio: z.string().optional(),
  subscribersCount: z.number().int().nonnegative().optional().default(0),
  isVerified: z.boolean().optional().default(false),
});

export const postSchema = z.object({
  id: z.string(),
  author: authorSchema,
  title: z.string().optional().default(''),
  body: z.string().optional().default(''),
  preview: z.string().optional().default(''),
  coverUrl: z.string().optional().default(''),
  likesCount: z.number().int().nonnegative().optional().default(0),
  commentsCount: z.number().int().nonnegative().optional().default(0),
  isLiked: z.boolean().optional().default(false),
  tier: tierSchema,
  createdAt: z.string(),
});

export const postsResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    posts: z.array(postSchema),
    nextCursor: z.string().nullable().optional(),
    hasMore: z.boolean(),
  }),
});

export const postDetailResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    post: postSchema,
  }),
});

export const likeResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    isLiked: z.boolean(),
    likesCount: z.number().int().nonnegative(),
  }),
});

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  author: authorSchema,
  text: z.string(),
  createdAt: z.string(),
});

export const commentsResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    comments: z.array(commentSchema),
    nextCursor: z.string().nullable().optional(),
    hasMore: z.boolean(),
  }),
});

export const createCommentResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    comment: commentSchema,
  }),
});

export const errorResponseSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export type Tier = z.infer<typeof tierSchema>;
export type FeedFilter = z.infer<typeof feedFilterSchema>;
export type Author = z.infer<typeof authorSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostsResponse = z.infer<typeof postsResponseSchema>;
export type PostDetailResponse = z.infer<typeof postDetailResponseSchema>;
export type LikeResponse = z.infer<typeof likeResponseSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type CommentsResponse = z.infer<typeof commentsResponseSchema>;
export type CreateCommentResponse = z.infer<typeof createCommentResponseSchema>;
export type ApiErrorResponse = z.infer<typeof errorResponseSchema>;
