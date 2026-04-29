import CommentGlyph from '@assets/icons/comment-outline.svg';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, layout } from '@/theme';

interface CommentIconProps {
  size?: number;
  color?: string;
}
function CommentIconComponent({
  size = layout.actionIconSize,
  color = colors.iconDefault,
}: CommentIconProps) {  const boxStyle = size === layout.actionIconSize ? styles.box : [styles.box, { width: size, height: size }];
  return (
    <View style={boxStyle}>
      <CommentGlyph width={layout.actionCommentGlyph} height={layout.actionCommentGlyph} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: layout.actionIconSize,
    height: layout.actionIconSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const CommentIcon = memo(CommentIconComponent);
