import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '@/theme';

interface PostCardBodyProps {
  title: string;
  preview: string;
}

export const PostCardBody = memo(function PostCardBody({ title, preview }: PostCardBodyProps) {
  return (
    <>
      {title.length > 0 && (
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      )}
      {preview.length > 0 && (
        <Text style={styles.preview} numberOfLines={2}>
          {preview}
        </Text>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  preview: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
