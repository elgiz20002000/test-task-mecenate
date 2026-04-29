import { Image } from 'expo-image';
import { memo } from 'react';
import { Text, View, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import { ActionPill } from '@/components/post/postCard/postCardActions/actionPill';
import { CommentIcon } from '@/components/post/postCard/postCardActions/commentIcon';
import { PostDetailHeader } from '@/components/post/postDetail/postDetailHeader';
import { PostDetailLikeButton } from '@/components/post/postDetail/postDetailLikeButton';
import type { Post } from '@/schemas/post';

interface PostDetailContentProps {
  post: Post;
  screenWidth: number;
  isLikePending: boolean;
  onToggleLike: () => void;
  styles: {
    content: ViewStyle;
    cover: ImageStyle;
    title: TextStyle;
    body: TextStyle;
    actionsRow: ViewStyle;
    commentsHeader: ViewStyle;
    sectionTitle: TextStyle;
    sortLabel: TextStyle;
  };
}

export const PostDetailContent = memo(function PostDetailContent({
  post,
  screenWidth,
  isLikePending,
  onToggleLike,
  styles,
}: PostDetailContentProps) {
  const authorName = post.author.displayName || post.author.username || 'Автор';

  return (
    <View style={styles.content}>
      <PostDetailHeader authorName={authorName} avatarUrl={post.author.avatarUrl} />
      <Image source={{ uri: post.coverUrl }} style={[styles.cover, { width: screenWidth }]} contentFit="cover" />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body || 'Контент скрыт пользователем.'}</Text>

      <View style={styles.actionsRow}>
        <PostDetailLikeButton
          likesCount={post.likesCount}
          isLiked={post.isLiked}
          isPending={isLikePending}
          onPress={onToggleLike}
        />
        <ActionPill
          icon={<CommentIcon />}
          count={post.commentsCount}
          accessibilityLabel={`Комментариев: ${post.commentsCount}`}
        />
      </View>

      <View style={styles.commentsHeader}>
        <Text style={styles.sectionTitle}>
          {post.commentsCount} {post.commentsCount === 1 ? 'комментарий' : 'комментария'}
        </Text>
        <Text style={styles.sortLabel}>Сначала новые</Text>
      </View>
    </View>
  );
});
