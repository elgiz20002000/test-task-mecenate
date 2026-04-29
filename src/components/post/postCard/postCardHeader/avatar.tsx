import { Image } from 'expo-image';
import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, layout, radii } from '@/theme';

interface AvatarProps {
  uri?: string | null;
  size?: number;
}
function AvatarComponent({ uri, size = layout.avatarSize }: AvatarProps) {
  const dimensionStyle = useMemo(
    () => ({ width: size, height: size, borderRadius: radii.pill }),
    [size],
  );
  const imageSource = useMemo(() => (uri ? { uri } : null), [uri]);
  const imageStyle = useMemo(() => [styles.image, dimensionStyle], [dimensionStyle]);
  const fallbackStyle = useMemo(() => [styles.fallback, dimensionStyle], [dimensionStyle]);

  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={imageStyle}
        contentFit="cover"
        transition={160}
        cachePolicy="memory-disk"
        recyclingKey={uri ?? undefined}
        allowDownscaling
        accessible={false}
        accessibilityIgnoresInvertColors
      />
    );
  }

  return <View style={fallbackStyle} accessible={false} />;
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.skeleton,
  },
  fallback: {
    backgroundColor: colors.skeleton,
  },
});

export const Avatar = memo(AvatarComponent);
