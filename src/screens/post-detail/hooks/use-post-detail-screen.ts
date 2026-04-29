import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { usePostRealtime } from '@/hooks/realtime';
import {
  useCreatePostComment,
  usePostComments,
  usePostDetail,
  useTogglePostLike,
} from '@/hooks/queries';

interface UsePostDetailScreenResult {
  commentText: string;
  setCommentText: (value: string) => void;
  commentsQuery: ReturnType<typeof usePostComments>;
  postQuery: ReturnType<typeof usePostDetail>;
  likeMutation: ReturnType<typeof useTogglePostLike>;
  commentMutation: ReturnType<typeof useCreatePostComment>;
  post: ReturnType<typeof usePostDetail>['post'];
  comments: ReturnType<typeof usePostComments>['comments'];
  isScreenLoading: boolean;
  showFullError: boolean;
  handleLoadMoreComments: () => void;
  handleRefresh: () => void;
  handleSubmitComment: () => void;
  handleToggleLike: () => void;
}

export function usePostDetailScreen(postId: string): UsePostDetailScreenResult {
  const [commentText, setCommentText] = useState('');

  const postQuery = usePostDetail(postId);
  const commentsQuery = usePostComments(postId);
  const likeMutation = useTogglePostLike(postId);
  const commentMutation = useCreatePostComment(postId);
  
  const { refetch: refetchPost } = postQuery;
  const {
    refetch: refetchComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = commentsQuery;

  usePostRealtime(postId);

  const post = postQuery.post;
  const comments = commentsQuery.comments;
  const isScreenLoading = postQuery.isLoading && !post;
  const showFullError = Boolean(postQuery.error) && !post;

  const handleRefresh = useCallback(() => {
    void Promise.all([refetchPost(), refetchComments()]);
  }, [refetchComments, refetchPost]);

  const handleLoadMoreComments = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleToggleLike = useCallback(() => {
    if (likeMutation.isPending || postId.length === 0) return;
    likeMutation.mutate(undefined, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Не удалось поставить лайк';
        Alert.alert('Ошибка', message);
      },
    });
  }, [likeMutation, postId]);

  const handleSubmitComment = useCallback(() => {
    const nextValue = commentText.trim();
    if (nextValue.length === 0 || commentMutation.isPending || postId.length === 0) return;
    commentMutation.mutate(nextValue, {
      onSuccess: () => {
        setCommentText('');
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => { });
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Не удалось отправить комментарий';
        Alert.alert('Ошибка', message);
      },
    });
  }, [commentMutation, commentText, postId]);

  return {
    commentText,
    setCommentText,
    commentsQuery,
    postQuery,
    likeMutation,
    commentMutation,
    post,
    comments,
    isScreenLoading,
    showFullError,
    handleLoadMoreComments,
    handleRefresh,
    handleSubmitComment,
    handleToggleLike,
  };
}
