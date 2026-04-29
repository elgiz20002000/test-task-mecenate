
export const palette = {
  white: '#FFFFFF',
  black: '#000000',

  pageBackground: '#F5F8FD',
  textPrimary: '#111416',
  textSecondary: '#57626F',
  textMuted: '#68727D',
  textDisabled: '#B6BEC8',

  surfacePill: '#EFF2F7',
  surfacePillHover: '#DDDDDD',
  surfacePillPressed: '#D4D4D4',
  borderSubtle: '#E8ECEF',
  skeleton: 'rgba(238, 239, 241, 0.8)',
  skeletonLine: '#E3E7EE',

  likeBg: '#FF2B75',
  likeBgHover: '#EA276B',
  likeBgPressed: '#DE2465',
  likeBgDisabled: '#FFBAD2',
  likeTextActive: '#FFEAF1',

  brandPurple: '#6115CD',
  brandPurpleHover: '#7B36DA',
  brandPurplePressed: '#520FAE',
  brandPurpleDisabled: '#C6A7F2',

  paidOverlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const colors = {
  pageBackground: palette.pageBackground,
  cardBackground: palette.white,
  pillSurface: palette.surfacePill,
  pillSurfaceHover: palette.surfacePillHover,
  pillSurfacePressed: palette.surfacePillPressed,

  textPrimary: palette.textPrimary,
  textSecondary: palette.textSecondary,
  textMuted: palette.textMuted,
  textDisabled: palette.textDisabled,
  textOnDark: palette.white,
  textOnPurple: palette.white,

  iconDefault: palette.textSecondary,
  iconDisabled: palette.textDisabled,
  iconOnLike: palette.white,

  like: palette.likeBg,
  likeHover: palette.likeBgHover,
  likePressed: palette.likeBgPressed,
  likeDisabled: palette.likeBgDisabled,
  likeText: palette.likeTextActive,

  brandPurple: palette.brandPurple,
  brandPurpleHover: palette.brandPurpleHover,
  brandPurplePressed: palette.brandPurplePressed,
  brandPurpleDisabled: palette.brandPurpleDisabled,

  skeleton: palette.skeleton,
  borderSubtle: palette.borderSubtle,
  skeletonLine: palette.skeletonLine,
  paidOverlay: palette.paidOverlay,
} as const;

export const spacing = {
  none: 0,
  x1: 4,
  x2: 8,
  x3: 12,
  x4: 16,
  x5: 20,
  x6: 24,
  x8: 32,
  x12: 48,
} as const;

export const radii = {
  none: 0,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 22,
  pill: 9999,
} as const;

export const fonts = {
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;

export const typography = {
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 26,
  },
  authorName: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 20,
  },
  body: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 20,
  },
  actionCount: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 26,
  },
  alertMessage: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
  },
} as const;

export const layout = {
  cardPaddingH: spacing.x4,
  cardPaddingV: spacing.x3,
  cardGap: spacing.x4,
  cardRadius: radii.lg,
  feedGap: spacing.x4,
  feedPaddingH: 0,
  avatarSize: 40,
  actionIconSize: 18,
  actionCommentGlyph: 18,
  donateIconSize: 20,
  donateIconBox: 42,
  donateIconRadius: radii.md,
  errorIllustrationSize: 112,
  coverAspectRatio: 1,
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Typography = typeof typography;
