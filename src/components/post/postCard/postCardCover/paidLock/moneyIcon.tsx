import MoneyGlyph from '@assets/icons/money.svg';
import { memo } from 'react';

import { colors, layout } from '@/theme';

interface MoneyIconProps {
  size?: number;
  color?: string;
}
function MoneyIconComponent({ size = layout.donateIconSize, color = colors.textOnPurple }: MoneyIconProps) {
  return <MoneyGlyph width={size} height={size} color={color} />;
}

export const MoneyIcon = memo(MoneyIconComponent);
