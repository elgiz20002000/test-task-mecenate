import { memo, useCallback, useState } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { AnimatedPressable, usePressAnimation } from '@/hooks/animations';
import { colors, radii, spacing, typography } from '@/theme';

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

function PrimaryButtonComponent({
  label,
  onPress,
  disabled = false,
  fullWidth = false,
  style,
  accessibilityLabel,
}: PrimaryButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { animatedStyle, onPressIn: animIn, onPressOut: animOut } = usePressAnimation();

  const handlePressIn = useCallback(() => {
    setPressed(true);
    animIn();
  }, [animIn]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
    animOut();
  }, [animOut]);

  const backgroundColor = disabled
    ? colors.brandPurpleDisabled
    : pressed
      ? colors.brandPurplePressed
      : colors.brandPurple;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        { backgroundColor },
        animatedStyle,
        style,
      ]}
    >
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    paddingHorizontal: spacing.x8,
    paddingVertical: spacing.x2,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.button,
    color: colors.textOnPurple,
  },
});

export const PrimaryButton = memo(PrimaryButtonComponent);
