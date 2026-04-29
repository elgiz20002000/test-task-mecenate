import { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { AnimatedPressable, usePressAnimation } from '@/hooks/animations';
import { useTogglePostLike } from '@/hooks/queries';
import type { Post } from '@/schemas/post';
import { colors, layout, radii, spacing } from '@/theme';

import { PaidCardBody } from './paidCardBody';
import { PostCardActions } from './postCardActions';
import { PostCardBody } from './postCardBody';
import { PostCardCover } from './postCardCover';
import { PostCardHeader } from './postCardHeader';

interface PostCardProps {
  post: Post;
  width: number;
  onPress?: () => void;
}

function PostCardComponent({ post, width, onPress }: PostCardProps) {
  const isPaid = post.tier === 'paid';
  const authorName = post.author.displayName || post.author.username || 'Автор';
  const previewText = (post.preview || post.body || '').trim();
  const [isPressed, setIsPressed] = useState(false);
  const { animatedStyle, onPressIn: animatePressIn, onPressOut: animatePressOut } = usePressAnimation({
    pressedScale: 0.985,
  });
  const likeMutation = useTogglePostLike(post.id);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    animatePressIn();
  }, [animatePressIn]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    animatePressOut();
  }, [animatePressOut]);

  const handleLikePress = useCallback(() => {
    if (likeMutation.isPending) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    likeMutation.mutate();
  }, [likeMutation]);

  const accessibilityLabel = isPaid
    ? `Пост автора ${authorName}, платный — скрыт до доната`
    : [authorName, post.title, previewText].filter(Boolean).join('. ');

  return (
    <AnimatedPressable
      style={[styles.card, { width }, isPressed && styles.pressedCard, animatedStyle]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={8}
      accessibilityHint="Открывает детальную публикацию"
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress || isPaid}
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

        {isPaid ? <PaidCardBody /> : <PostCardBody title={post.title} preview={previewText} />}
      </View>

      {!isPaid && (
        <PostCardActions
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          isLiked={post.isLiked}
          onLikePress={handleLikePress}
          isLikeDisabled={likeMutation.isPending}
        />
      )}
    </AnimatedPressable>
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
  pressedCard: { backgroundColor: colors.pillSurface },
  media: {
    gap: spacing.x2,
    alignItems: 'stretch',
  },
});

export const PostCard = memo(PostCardComponent);
