import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HeartIcon } from '@/components/post/postCard/postCardActions/heartIcon';
import { Avatar } from '@/components/post/postCard/postCardHeader/avatar';
import type { Comment } from '@/schemas/post';
import { colors, spacing, typography } from '@/theme';

interface PostCommentItemProps {
  comment: Comment;
}

export const PostCommentItem = memo(function PostCommentItem({ comment }: PostCommentItemProps) {
  const authorName = comment.author.displayName || comment.author.username || 'Автор';
  // TODO: Missed like count from API
  const commentLikeCount = 2;

  return (
    <View style={styles.container}>
      <Avatar uri={comment.author.avatarUrl} size={40} />
      <View style={styles.body}>
        <Text style={styles.authorName}>{authorName}</Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
      <Pressable
        style={styles.likeButton}
        accessibilityRole="button"
        accessibilityLabel="Лайк комментария"
      >
        <View style={styles.likeIconBox}>
          <HeartIcon color={colors.iconDefault} />
        </View>
        <Text style={styles.likeCount}>{commentLikeCount}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    width: '100%',
  },
  body: {
    flex: 1,
    gap: spacing.x1,
  },
  authorName: {
    ...typography.authorName,
    color: colors.textPrimary,
  },
  text: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'center',
  },
  likeIconBox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeCount: {
    ...typography.actionCount,
    color: colors.textSecondary,
  },
});
