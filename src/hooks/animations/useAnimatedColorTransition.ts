import { useEffect } from 'react';
import { Easing, interpolateColor, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

interface UseAnimatedColorTransitionArgs {
  isActive: boolean;
  fromColor: string;
  toColor: string;
  duration?: number;
}

export function useAnimatedColorTransition({
  isActive,
  fromColor,
  toColor,
  duration = 180,
}: UseAnimatedColorTransitionArgs) {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration,
      easing: Easing.out(Easing.quad),
    });
  }, [duration, isActive, progress]);

  return useAnimatedProps(() => ({
    color: interpolateColor(progress.value, [0, 1], [fromColor, toColor]),
  }));
}
