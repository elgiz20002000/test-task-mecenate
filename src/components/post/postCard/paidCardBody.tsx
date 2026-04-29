import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

function PaidCardBodyComponent() {
  return (
    <View style={styles.hiddenTextWrap} accessibilityLabel="Скрытый текст публикации">
      <View style={[styles.hiddenLine, styles.hiddenLineTitle]} />
      <View style={[styles.hiddenLine, styles.hiddenLineBodyPrimary]} />
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenTextWrap: {
    gap: spacing.x2,
    minHeight: 78,
    justifyContent: 'center',
    paddingVertical: spacing.x1,
  },
  hiddenLine: {
    backgroundColor: colors.skeletonLine,
    borderRadius: radii.pill,
  },
  hiddenLineTitle: {
    width: 170,
    height: 26,
  },
  hiddenLineBodyPrimary: {
    width: '100%',
    height: 40,
  },
});

export const PaidCardBody = memo(PaidCardBodyComponent);
