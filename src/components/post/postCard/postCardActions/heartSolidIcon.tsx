import { memo } from 'react';

import { colors, layout } from '@/theme';
import HeartSolidGlyph from '@assets/icons/heart-solid.svg';


interface HeartSolidIconProps {
  size?: number;
  color?: string;
}

function HeartSolidIconComponent({
  size = layout.actionIconSize,
  color = colors.like,
}: HeartSolidIconProps) {
  return <HeartSolidGlyph width={size} height={size} color={color} />;
}

export const HeartSolidIcon = memo(HeartSolidIconComponent);
