import { BlurView } from 'expo-blur';
import { memo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radii, spacing, typography } from '@/theme';

import { PrimaryButton } from '@/components/ui/primaryButton';
import { MoneyIcon } from './moneyIcon';

interface PaidLockProps {
  onDonatePress?: () => void;
}

const blurViewProps =
  Platform.OS === 'android'
    ? ({
      experimentalBlurMethod: 'dimezisBlurView' as const,
      intensity: 50,
      blurReductionFactor: 3,
    } as const)
    : ({
      intensity: 50,
    } as const);

function PaidLockComponent({ onDonatePress }: PaidLockProps) {
  const hasDonateAction = typeof onDonatePress === 'function';

  return (
    <View style={styles.fill} pointerEvents={hasDonateAction ? 'box-none' : 'none'}>
      <BlurView tint="dark" style={styles.fill} {...blurViewProps} pointerEvents="none" />
      <View style={[styles.fill, styles.scrim]} pointerEvents="none" />
      <View style={styles.content} pointerEvents={hasDonateAction ? 'box-none' : 'none'}>
        <View style={styles.iconBox}>
          <MoneyIcon />
        </View>
        <Text style={styles.message}>
          Контент скрыт пользователем.{'\n'}
          Доступ откроется после доната
        </Text>
        {hasDonateAction && (
          <PrimaryButton
            label="Отправить донат"
            onPress={onDonatePress}
            style={styles.donateButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  scrim: {
    backgroundColor: colors.paidOverlay,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x4,
    gap: spacing.x2,
  },
  iconBox: {
    width: layout.donateIconBox,
    height: layout.donateIconBox,
    borderRadius: layout.donateIconRadius,
    backgroundColor: colors.brandPurple,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  message: {
    ...typography.alertMessage,
    color: colors.textOnDark,
    textAlign: 'center',
    marginTop: spacing.x2,
  },
  donateButton: {
    width: 239,
    marginTop: spacing.x2,
    borderRadius: radii.xl,
  },
});

export const PaidLock = memo(PaidLockComponent);
