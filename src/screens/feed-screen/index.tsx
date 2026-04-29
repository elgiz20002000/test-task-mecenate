import { LegendList } from '@legendapp/list';
import { observer } from 'mobx-react-lite';
import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  FeedEmptyState,
  FeedErrorState,
  FeedFooter,
  FeedSkeletonList,
  FeedTabs,
} from '@/components/feed';
import type { Post } from '@/schemas/post';

import { useFeedScreen } from './hooks';
import { styles } from './styles';

export const FeedScreen = observer(function FeedScreen() {
  const {
    listRef,
    posts,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    showFullScreenError,
    refreshControl,
    renderItem,
    keyExtractor,
    handleEndReached,
    handleRefresh,
    estimatedItemSize,
    screenWidth,
  } = useFeedScreen();

  const listFooter = useMemo(
    () => <FeedFooter isFetchingNextPage={isFetchingNextPage} isEmpty={posts.length === 0} />,
    [isFetchingNextPage, posts.length],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.tabsWrap}>
        <FeedTabs />
      </View>
      {showFullScreenError ? (
        <View style={styles.padded}>
          <FeedErrorState onRetry={handleRefresh} isRetrying={isRefetching} />
        </View>
      ) : isLoading ? (
        <View style={styles.padded}>
          <FeedSkeletonList width={screenWidth} />
        </View>
      ) : (
        <LegendList
          ref={listRef}
          data={posts}
          extraData={screenWidth}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={FeedEmptyState}
          ListFooterComponent={listFooter}
          refreshControl={refreshControl}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          estimatedItemSize={estimatedItemSize}
          recycleItems
          ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
});

const Separator = memo(function Separator(_props: { leadingItem: Post }) {
  return <View style={styles.separator} />;
});
