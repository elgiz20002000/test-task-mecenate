import type { Comment } from '@/schemas/post';

export interface LikeUpdatedPayload {
  postId?: string;
  likesCount?: number;
  isLiked?: boolean;
}

export interface CommentAddedPayload {
  postId?: string;
  comment?: Comment;
}

export interface WsEventPayload {
  type?: string;
  data?: unknown;
  payload?: unknown;
  postId?: string;
  likesCount?: number;
  isLiked?: boolean;
  comment?: Comment;
}
