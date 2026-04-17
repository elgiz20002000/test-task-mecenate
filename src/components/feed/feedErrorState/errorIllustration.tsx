import ErrorSticker from '@assets/illustrations/error.svg';
import { memo } from 'react';

import { layout } from '@/theme';

interface ErrorIllustrationProps {
  size?: number;
}
function ErrorIllustrationComponent({ size = layout.errorIllustrationSize }: ErrorIllustrationProps) {
  return <ErrorSticker width={size} height={size} />;
}

export const ErrorIllustration = memo(ErrorIllustrationComponent);
