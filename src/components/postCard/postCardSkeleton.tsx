import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, layout, radii, spacing } from '@/theme';

interface PostCardSkeletonProps {
  width: number;
}
function PostCardSkeletonComponent({ width }: PostCardSkeletonProps) {
  const coverSize = width;

  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={[styles.line, styles.avatarLine]} />
      </View>
      <View
        style={[
          styles.cover,
          {
            width: coverSize,
            height: coverSize,
            marginHorizontal: -layout.cardPaddingH,
          },
        ]}
      />
      <View style={[styles.line, { width: 164, height: 26, borderRadius: radii.xxl }]} />
      <View style={[styles.line, { width: '100%', height: 20, borderRadius: radii.xxl }]} />
      <View style={styles.actions}>
        <View style={styles.pillSkeleton} />
        <View style={styles.pillSkeleton} />
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  avatar: {
    width: layout.avatarSize,
    height: layout.avatarSize,
    borderRadius: radii.pill,
    backgroundColor: colors.skeleton,
  },
  avatarLine: {
    width: 120,
    height: 20,
    borderRadius: radii.xxl,
  },
  line: {
    backgroundColor: colors.skeleton,
  },
  cover: {
    backgroundColor: colors.skeleton,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.x2,
  },
  pillSkeleton: {
    width: 64,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.skeleton,
  },
});

export const PostCardSkeleton = memo(PostCardSkeletonComponent);
