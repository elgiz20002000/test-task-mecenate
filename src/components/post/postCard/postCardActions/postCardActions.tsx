import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { ActionPill } from './actionPill';
import { CommentIcon } from './commentIcon';
import { HeartIcon } from './heartIcon';
import { HeartSolidIcon } from './heartSolidIcon';

interface PostCardActionsProps {
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  onLikePress?: () => void;
  isLikeDisabled?: boolean;
}

export const PostCardActions = memo(function PostCardActions({
  likesCount,
  commentsCount,
  isLiked = false,
  onLikePress,
  isLikeDisabled = false,
}: PostCardActionsProps) {
  return (
    <View style={styles.actions}>
      <ActionPill
        icon={isLiked ? <HeartSolidIcon size={15} /> : <HeartIcon />}
        count={likesCount}
        accessibilityLabel={`Лайков: ${likesCount}`}
        onPress={onLikePress}
        disabled={isLikeDisabled}
      />
      <ActionPill
        icon={<CommentIcon />}
        count={commentsCount}
        accessibilityLabel={`Комментариев: ${commentsCount}`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
});
