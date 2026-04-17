import HeartGlyph from '@assets/icons/heart-outline.svg';
import { memo } from 'react';

import { colors, layout } from '@/theme';

interface HeartIconProps {
  size?: number;
  color?: string;
}
function HeartIconComponent({ size = layout.actionIconSize, color = colors.iconDefault }: HeartIconProps) {
  return <HeartGlyph width={size} height={size} color={color} />;
}

export const HeartIcon = memo(HeartIconComponent);
