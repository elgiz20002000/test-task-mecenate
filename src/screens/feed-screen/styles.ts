import { StyleSheet } from 'react-native';

import { colors, layout } from '@/theme';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  listContent: {
    paddingBottom: layout.feedGap,
    flexGrow: 1,
  },
  padded: {
    paddingVertical: layout.feedGap,
  },
  tabsWrap: {
    paddingVertical: layout.feedGap,
  },
  separator: {
    height: layout.feedGap,
  },
});
