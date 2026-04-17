import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { Avatar } from './avatar';

interface PostCardHeaderProps {
  avatarUrl: string;
  authorName: string;
}

export const PostCardHeader = memo(function PostCardHeader({
  avatarUrl,
  authorName,
}: PostCardHeaderProps) {
  return (
    <View style={styles.header}>
      <Avatar uri={avatarUrl} />
      <Text style={styles.authorName} numberOfLines={1}>
        {authorName}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  authorName: {
    ...typography.authorName,
    color: colors.textPrimary,
    flexShrink: 1,
  },
});
