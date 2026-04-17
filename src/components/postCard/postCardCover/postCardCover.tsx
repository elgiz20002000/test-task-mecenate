import { Image } from 'expo-image';
import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

import { PaidLock } from './paidLock';

interface PostCardCoverProps {
  postId: string;
  coverUrl: string;
  size: number;
  horizontalBleed: number;
  isPaid: boolean;
}

export const PostCardCover = memo(function PostCardCover({
  postId,
  coverUrl,
  size,
  horizontalBleed,
  isPaid,
}: PostCardCoverProps) {
  const wrapStyle = useMemo(
    () => [styles.wrap, { width: size, height: size, marginHorizontal: -horizontalBleed }],
    [size, horizontalBleed],
  );
  const imageSource = useMemo(() => ({ uri: coverUrl }), [coverUrl]);

  return (
    <View style={wrapStyle}>
      {coverUrl.length > 0 ? (
        <Image
          source={imageSource}
          style={styles.cover}
          contentFit="cover"
          transition={180}
          cachePolicy="memory-disk"
          recyclingKey={postId}
          allowDownscaling
          accessibilityIgnoresInvertColors
          accessible={false}
        />
      ) : (
        <View style={styles.coverFallback} />
      )}
      {isPaid && <PaidLock />}
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.skeleton,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coverFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.skeleton,
  },
});
