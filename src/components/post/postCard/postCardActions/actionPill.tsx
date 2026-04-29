import { memo, useCallback, useState, type ReactNode } from 'react';
import { StyleSheet, Text, type GestureResponderEvent, type TextStyle, type ViewStyle } from 'react-native';

import { AnimatedPressable, usePressAnimation } from '@/hooks/animations';
import { colors, radii, spacing, typography } from '@/theme';

interface ActionPillProps {
  icon: ReactNode;
  count: number;
  accessibilityLabel?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  countNode?: ReactNode;
  style?: ViewStyle;
  pressedBackgroundColor?: string;
  defaultBackgroundColor?: string;
  countStyle?: TextStyle;
}

function ActionPillComponent({
  icon,
  count,
  accessibilityLabel,
  onPress,
  disabled = false,
  countNode,
  style,
  pressedBackgroundColor = colors.pillSurfacePressed,
  defaultBackgroundColor = colors.pillSurface,
  countStyle,
}: ActionPillProps) {
  const [pressed, setPressed] = useState(false);
  const { animatedStyle, onPressIn: animIn, onPressOut: animOut } = usePressAnimation({
    pressedScale: 0.94,
  });

  const handlePressIn = useCallback(() => {
    setPressed(true);
    animIn();
  }, [animIn]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
    animOut();
  }, [animOut]);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={8}
      style={[
        styles.pill,
        { backgroundColor: pressed ? pressedBackgroundColor : defaultBackgroundColor },
        animatedStyle,
        style,
      ]}
    >
      {icon}
      {countNode ?? <Text style={[styles.count, countStyle]}>{String(count)}</Text>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x1,
    height: 42,
    paddingHorizontal: spacing.x3,
    borderRadius: radii.pill,
  },
  count: {
    ...typography.actionCount,
    color: colors.textSecondary,
  },
});

export const ActionPill = memo(ActionPillComponent);
