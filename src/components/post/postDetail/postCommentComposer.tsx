import PaperPlaneTopGlyph from '@assets/icons/paper-plane-top.svg';
import type { ComponentType } from 'react';
import { memo, useCallback } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useAnimatedColorTransition } from '@/hooks/animations';
import { colors, radii, spacing, typography } from '@/theme';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PostCommentComposerProps {
  value: string;
  isSubmitting: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const AnimatedPaperPlaneTopGlyph = Animated.createAnimatedComponent(PaperPlaneTopGlyph as ComponentType<any>);


export const PostCommentComposer = memo(function PostCommentComposer({
  value,
  isSubmitting,
  onChange,
  onSubmit,
}: PostCommentComposerProps) {
  const handleChangeText = useCallback((text: string) => onChange(text), [onChange]);
  const insets = useSafeAreaInsets();
  const isDisabled = isSubmitting || value.trim().length === 0;
  const { progress } = useReanimatedKeyboardAnimation();
  const animatedIconProps = useAnimatedColorTransition({
    isActive: !isDisabled,
    fromColor: colors.brandPurpleDisabled,
    toColor: colors.brandPurple,
  });

  const wrapAnimatedStyle = useAnimatedStyle(() => {
    const closedPadding = insets.bottom;
    const openPadding = spacing.x3;
    return {
      paddingBottom: closedPadding + (openPadding - closedPadding) * progress.value,
    };
  });

  return (
    <Animated.View style={[styles.wrap, wrapAnimatedStyle]}>
      <View style={styles.row}>
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          style={styles.input}
          placeholder="Ваш комментарий"
          placeholderTextColor={colors.textDisabled}
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          accessibilityRole="button"
          accessibilityLabel={isSubmitting ? 'Отправка комментария' : 'Отправить комментарий'}
          disabled={isDisabled}
          onPress={onSubmit}
          activeOpacity={0.7}
        >
          <AnimatedPaperPlaneTopGlyph width={18} height={18} animatedProps={animatedIconProps} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x4,
    paddingBottom: spacing.x4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  input: {
    ...typography.body,
    flex: 1,
    height: 40,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.x4,
    paddingVertical: 0,
    borderWidth: 2,
    borderColor: colors.pillSurface,
    backgroundColor: colors.cardBackground,
    color: colors.textPrimary,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  sendButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
