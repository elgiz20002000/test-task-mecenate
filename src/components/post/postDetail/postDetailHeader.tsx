import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/post/postCard/postCardHeader/avatar';
import { colors, spacing, typography } from '@/theme';

interface PostDetailHeaderProps {
  authorName: string;
  avatarUrl: string;
}

export const PostDetailHeader = memo(function PostDetailHeader({
  authorName,
  avatarUrl,
}: PostDetailHeaderProps) {
  return (
    <View style={styles.authorRow}>
      <Avatar uri={avatarUrl} size={40} />
      <Text style={styles.authorName} numberOfLines={1}>
        {authorName}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  authorRow: {
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
