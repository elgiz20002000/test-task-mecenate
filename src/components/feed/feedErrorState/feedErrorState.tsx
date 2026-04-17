import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, layout, radii, spacing, typography } from '@/theme';

import { PrimaryButton } from '../../primaryButton';
import { ErrorIllustration } from './errorIllustration';

interface FeedErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
}
function FeedErrorStateComponent({ onRetry, isRetrying }: FeedErrorStateProps) {
  return (
    <View style={styles.card} accessibilityRole="alert">
      <ErrorIllustration />
      <Text style={styles.title}>Не удалось загрузить публикации</Text>
      <PrimaryButton
        label={isRetrying ? 'Загружаем…' : 'Повторить'}
        onPress={onRetry}
        disabled={isRetrying}
        fullWidth
      />
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

export const FeedErrorState = memo(FeedErrorStateComponent);
