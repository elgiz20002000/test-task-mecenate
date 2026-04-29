import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';

import { useUiStore } from '@/stores/rootStore';
import { colors, spacing } from '@/theme';

import { FeedTabItem } from './feedTabItem';
import { FEED_TABS } from './feedTabsConfig';

export const FeedTabs = observer(function FeedTabs() {
  const { tierFilter, setTierFilter } = useUiStore();

  return (
    <View style={styles.container} accessibilityRole="tablist">
      {FEED_TABS.map((tab) => (
        <FeedTabItem
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isActive={tierFilter === tab.id}
          onSelect={setTierFilter}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 999,
    flexDirection: 'row',
    width: 361,
    maxWidth: '100%',
    alignSelf: 'center',
    padding: 1,
    marginHorizontal: spacing.x4,
  },
});
