import { useCallback } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressAnimationOptions {
  baseScale?: number;
  pressedScale?: number;
  pressedOpacity?: number;
  duration?: number;
}

interface PressAnimation {
  animatedStyle: AnimatedStyle;
  onPressIn: () => void;
  onPressOut: () => void;
}

export function usePressAnimation({
  baseScale = 1,
  pressedScale = 0.96,
  pressedOpacity = 1,
  duration = 120,
}: PressAnimationOptions = {}): PressAnimation {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const t = progress.value;
    return {
      transform: [{ scale: baseScale + (pressedScale - baseScale) * t }],
      opacity: 1 - (1 - pressedOpacity) * t,
    };
  });

  const onPressIn = useCallback(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.quad),
    });
  }, [progress, duration]);

  const onPressOut = useCallback(() => {
    progress.value = withTiming(0, {
      duration: Math.round(duration * 1.5),
      easing: Easing.out(Easing.quad),
    });
  }, [progress, duration]);

  return { animatedStyle, onPressIn, onPressOut };
}
