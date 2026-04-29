import * as Haptics from 'expo-haptics';
import { memo, useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { AnimatedPressable, usePressAnimation } from '@/hooks/animations';
import type { FeedFilter } from '@/schemas/post';
import { colors, fonts } from '@/theme';

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
    baseScale: isActive ? 1.12 : 1,
    pressedScale: isActive ? 1.06 : 0.97,
  });

  const handlePress = useCallback(() => {
    void Haptics.selectionAsync().catch(() => { });
    onSelect(id);
  }, [id, onSelect]);

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
    : 'transparent';
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
      <Text style={[styles.label, isActive && styles.labelActive, { color: textColor }]} numberOfLines={1}>
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
    paddingHorizontal: 10,
    borderRadius: 22,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.medium,
  },
  labelActive: {
    fontFamily: fonts.bold,
  },
});
