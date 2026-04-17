import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { Post } from '@/schemas/post';
import { colors, layout, radii, spacing } from '@/theme';

import { PostCardActions } from './postCardActions';
import { PostCardBody } from './postCardBody';
import { PostCardCover } from './postCardCover';
import { PostCardHeader } from './postCardHeader';

interface PostCardProps {
  post: Post;
  width: number;
}

function PostCardComponent({ post, width }: PostCardProps) {
  const isPaid = post.tier === 'paid';
  const authorName = post.author.displayName || post.author.username || 'Автор';
  const previewText = (post.preview || post.body || '').trim();

  const accessibilityLabel = isPaid
    ? `Пост автора ${authorName}, платный — скрыт до доната`
    : [authorName, post.title, previewText].filter(Boolean).join('. ');

  return (
    <View
      style={[styles.card, { width }]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
    >
      <PostCardHeader avatarUrl={post.author.avatarUrl} authorName={authorName} />

      <View style={styles.media}>
        <PostCardCover
          postId={post.id}
          coverUrl={post.coverUrl}
          size={width}
          horizontalBleed={layout.cardPaddingH}
          isPaid={isPaid}
        />

        {!isPaid && <PostCardBody title={post.title} preview={previewText} />}
      </View>

      <PostCardActions likesCount={post.likesCount} commentsCount={post.commentsCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    paddingHorizontal: layout.cardPaddingH,
    paddingVertical: layout.cardPaddingV,
    gap: layout.cardGap,
    overflow: 'hidden',
  },
  media: {
    gap: spacing.x2,
    alignItems: 'stretch',
  },
});

export const PostCard = memo(PostCardComponent);
