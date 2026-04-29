import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { layout } from '@/theme';

import { PostCardSkeleton } from '../post/postCard/postCardSkeleton';

const PLACEHOLDERS = [0, 1, 2] as const;

interface FeedSkeletonListProps {
  width: number;
}
function FeedSkeletonListComponent({ width }: FeedSkeletonListProps) {
  return (
    <View style={styles.container}>
      {PLACEHOLDERS.map((key) => (
        <PostCardSkeleton key={key} width={width} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: layout.feedGap,
  },
});

export const FeedSkeletonList = memo(FeedSkeletonListComponent);
