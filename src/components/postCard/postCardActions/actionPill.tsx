import { memo, useCallback, useState, type ReactNode } from 'react';
import { StyleSheet, Text, type GestureResponderEvent } from 'react-native';

import { AnimatedPressable, usePressAnimation } from '@/hooks/usePressAnimation';
import { colors, radii, spacing, typography } from '@/theme';

interface ActionPillProps {
  icon: ReactNode;
  count: number;
  accessibilityLabel?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

function ActionPillComponent({ icon, count, accessibilityLabel, onPress }: ActionPillProps) {
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
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={8}
      style={[
        styles.pill,
        { backgroundColor: pressed ? colors.pillSurfacePressed : colors.pillSurface },
        animatedStyle,
      ]}
    >
      {icon}
      <Text style={styles.count}>{String(count)}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x1,
    paddingLeft: 6,
    paddingRight: spacing.x3,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  count: {
    ...typography.actionCount,
    color: colors.textSecondary,
  },
});

export const ActionPill = memo(ActionPillComponent);
