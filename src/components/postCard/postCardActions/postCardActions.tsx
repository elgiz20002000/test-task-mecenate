import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { ActionPill } from './actionPill';
import { CommentIcon } from './commentIcon';
import { HeartIcon } from './heartIcon';

interface PostCardActionsProps {
  likesCount: number;
  commentsCount: number;
}

export const PostCardActions = memo(function PostCardActions({
  likesCount,
  commentsCount,
}: PostCardActionsProps) {
  return (
    <View style={styles.actions}>
      <ActionPill
        icon={<HeartIcon />}
        count={likesCount}
        accessibilityLabel={`Лайков: ${likesCount}`}
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
