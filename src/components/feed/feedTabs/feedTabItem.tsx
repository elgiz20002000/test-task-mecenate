import { memo, useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { AnimatedPressable, usePressAnimation } from '@/hooks/usePressAnimation';
import type { FeedFilter } from '@/schemas/post';
import { colors, radii, spacing, typography } from '@/theme';

interface FeedTabItemProps {
  id: FeedFilter;
  label: string;
  isActive: boolean;
  onSelect: (id: FeedFilter) => void;
}

export const FeedTabItem = memo(function FeedTabItem({
  id,
  label,
  isActive,
  onSelect,
}: FeedTabItemProps) {
  const [pressed, setPressed] = useState(false);
  const { animatedStyle, onPressIn: animIn, onPressOut: animOut } = usePressAnimation({
    pressedScale: 0.97,
  });

  const handlePress = useCallback(() => onSelect(id), [id, onSelect]);

  const handlePressIn = useCallback(() => {
    setPressed(true);
    animIn();
  }, [animIn]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
    animOut();
  }, [animOut]);

  const backgroundColor = isActive
    ? pressed
      ? colors.brandPurplePressed
      : colors.brandPurple
    : pressed
      ? colors.pillSurfacePressed
      : colors.pillSurface;
  const textColor = isActive ? colors.textOnPurple : colors.textSecondary;

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
      hitSlop={8}
      style={[styles.item, { backgroundColor }, animatedStyle]}
    >
      <Text style={[styles.label, { color: textColor }]} numberOfLines={1}>
        {label}
      </Text>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x3,
    borderRadius: radii.pill,
  },
  label: {
    ...typography.button,
    lineHeight: 20,
  },
});
