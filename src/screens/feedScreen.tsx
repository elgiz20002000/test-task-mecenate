import {
  LegendList,
  type LegendListRef,
  type LegendListRenderItemProps,
} from '@legendapp/list';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  FeedEmptyState,
  FeedErrorState,
  FeedFooter,
  FeedSkeletonList,
  FeedTabs,
} from '@/components/feed';
import { PostCard } from '@/components/postCard';
import { useFeedPosts } from '@/hooks/useFeedPosts';
import type { Post } from '@/schemas/post';
import { useUiStore } from '@/stores/rootStore';
import { colors, layout } from '@/theme';


export const FeedScreen = observer(function FeedScreen() {
  const ui = useUiStore();
  const { width: screenWidth } = useWindowDimensions();
  const listRef = useRef<LegendListRef>(null);

  const {
    posts,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = useFeedPosts({
    tier: ui.tierQueryParam,
    simulateError: ui.simulateError,
  });

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<Post>) => <PostCard post={item} width={screenWidth} />,
    [screenWidth],
  );
  const estimatedItemSize = useMemo(() => screenWidth + 160, [screenWidth]);


  const keyExtractor = useCallback((item: Post) => item.id, []);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        tintColor={colors.textSecondary}
        colors={[colors.brandPurple]}
        progressBackgroundColor={colors.cardBackground}
      />
    ),
    [isRefetching, handleRefresh],
  );

  const listFooter = useMemo(
    () => <FeedFooter isFetchingNextPage={isFetchingNextPage} isEmpty={posts.length === 0} />,
    [isFetchingNextPage, posts.length],
  );

  const showFullScreenError = Boolean(error) && posts.length === 0;


  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [ui.tierFilter]);

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

function Separator(_props: { leadingItem: Post }) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
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
