import {
  LegendList,
  type LegendListRef,
  type LegendListRenderItemProps,
} from '@legendapp/list';
import { useLocalSearchParams } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedErrorState } from '@/components/feed';
import {
  PostCommentComposer,
  PostDetailContent,
  PostCommentItem,
} from '@/components/post';
import type { Comment } from '@/schemas/post';
import { colors } from '@/theme';

import { usePostDetailScreen } from './hooks/use-post-detail-screen';
import { styles } from './styles';

export const PostDetailScreen = observer(function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] ?? '' : '';
  const { width: screenWidth } = useWindowDimensions();
  const listRef = useRef<LegendListRef>(null);
  const {
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
  } = usePostDetailScreen(postId);

  const headerNode = useMemo(() => {
    if (!post) return null;
    return (
      <PostDetailContent
        post={post}
        screenWidth={screenWidth}
        isLikePending={likeMutation.isPending}
        onToggleLike={handleToggleLike}
        styles={styles}
      />
    );
  }, [handleToggleLike, likeMutation.isPending, post, screenWidth]);

  const footerNode = (
    <View style={styles.footer}>
      {commentsQuery.isFetchingNextPage && <ActivityIndicator color={colors.textSecondary} />}
    </View>
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={postQuery.isRefetching || commentsQuery.isRefetching}
        onRefresh={handleRefresh}
        tintColor={colors.textSecondary}
        colors={[colors.brandPurple]}
      />
    ),
    [commentsQuery.isRefetching, handleRefresh, postQuery.isRefetching],
  );

  if (showFullError) {
    return (
      <SafeAreaView style={styles.safe}>
        <FeedErrorState onRetry={handleRefresh} isRetrying={postQuery.isRefetching} />
      </SafeAreaView>
    );
  }

  if (isScreenLoading) {
    return (
      <SafeAreaView style={styles.safeCenter}>
        <ActivityIndicator size="large" color={colors.brandPurple} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <LegendList<Comment>
        ref={listRef}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: LegendListRenderItemProps<Comment>) => (
          <View style={styles.commentRow}>
            <PostCommentItem comment={item} />
          </View>
        )}
        ListHeaderComponent={headerNode}
        ListFooterComponent={footerNode}
        contentContainerStyle={styles.listContent}
        refreshControl={refreshControl}
        onEndReached={handleLoadMoreComments}
        onEndReachedThreshold={0.4}
        estimatedItemSize={72}
        recycleItems
        showsVerticalScrollIndicator={false}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <PostCommentComposer
          value={commentText}
          onChange={setCommentText}
          onSubmit={handleSubmitComment}
          isSubmitting={commentMutation.isPending}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});
