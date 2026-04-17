import { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

interface FeedFooterProps {
  isFetchingNextPage: boolean;
  isEmpty: boolean;
}
function FeedFooterComponent({ isFetchingNextPage, isEmpty }: FeedFooterProps) {
  if (isEmpty || !isFetchingNextPage) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.x4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const FeedFooter = memo(FeedFooterComponent);
