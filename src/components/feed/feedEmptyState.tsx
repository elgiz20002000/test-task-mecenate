import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, layout, radii, spacing, typography } from '@/theme';

function FeedEmptyStateComponent() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>По вашему запросу ничего не найдено</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    paddingHorizontal: layout.cardPaddingH,
    paddingVertical: layout.cardPaddingV,
    alignItems: 'center',
    gap: spacing.x4,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export const FeedEmptyState = memo(FeedEmptyStateComponent);
