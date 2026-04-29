import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  safeCenter: {
    flex: 1,
    backgroundColor: colors.pageBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: spacing.x3,
    backgroundColor: colors.cardBackground,
  },
  content: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    marginHorizontal: 0,
    marginTop: 0,
    overflow: 'hidden',
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
    gap: spacing.x2,
  },
  cover: {
    height: 393,
    marginHorizontal: -spacing.x4,
    borderRadius: radii.none,
    backgroundColor: colors.skeleton,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.x2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.x2,
  },
  sectionTitle: {
    ...typography.button,
    lineHeight: 20,
    color: colors.textMuted,
  },
  sortLabel: {
    ...typography.button,
    lineHeight: 20,
    color: colors.brandPurple,
  },
  commentRow: {
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x2,
    backgroundColor: colors.cardBackground,
  },
  footer: {
    paddingBottom: spacing.x4,
    backgroundColor: colors.cardBackground,
  },
});
