import * as Haptics from 'expo-haptics';
import { memo, useCallback, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ActionPill } from '@/components/post/postCard/postCardActions/actionPill';
import { HeartIcon } from '@/components/post/postCard/postCardActions/heartIcon';
import { HeartSolidIcon } from '@/components/post/postCard/postCardActions/heartSolidIcon';
import { colors, typography } from '@/theme';

interface PostDetailLikeButtonProps {
  likesCount: number;
  isLiked: boolean;
  isPending?: boolean;
  onPress: () => void;
}

export const PostDetailLikeButton = memo(function PostDetailLikeButton({
  likesCount,
  isLiked,
  isPending = false,
  onPress,
}: PostDetailLikeButtonProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1.14;
    scale.value = withTiming(1, {
      duration: 220,
      easing: Easing.out(Easing.quad),
    });
  }, [likesCount, scale]);

  const counterAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
    onPress();
  }, [onPress]);

  return (
    <ActionPill
      icon={isLiked ? <HeartSolidIcon color={colors.like} /> : <HeartIcon color={colors.iconDefault} />}
      count={likesCount}
      onPress={handlePress}
      accessibilityLabel={`Лайк. Количество лайков: ${likesCount}`}
      disabled={isPending}
      countNode={
        <Animated.View style={counterAnimatedStyle}>
          <Text style={styles.likesCount}>{likesCount}</Text>
        </Animated.View>
      }
    />
  );
});

const styles = StyleSheet.create({
  likesCount: {
    ...typography.actionCount,
    color: colors.textSecondary,
  },
});
