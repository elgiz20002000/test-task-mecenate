import {
  type LegendListRef,
  type LegendListRenderItemProps,
} from '@legendapp/list';
import { router } from 'expo-router';
import type { JSX, RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';

import { PostCard } from '@/components/post';
import { useFeedPosts } from '@/hooks/queries';
import { realtimeManager } from '@/hooks/realtime';
import type { Post } from '@/schemas/post';
import { useUiStore } from '@/stores/rootStore';
import { colors } from '@/theme';

interface UseFeedScreenResult {
  readonly listRef: RefObject<LegendListRef | null>;
  readonly posts: Post[];
  readonly isLoading: boolean;
  readonly isRefetching: boolean;
  readonly isFetchingNextPage: boolean;
  readonly showFullScreenError: boolean;
  readonly refreshControl: JSX.Element;
  readonly renderItem: (props: LegendListRenderItemProps<Post>) => JSX.Element;
  readonly keyExtractor: (item: Post) => string;
  readonly handleEndReached: () => void;
  readonly handleRefresh: () => void;
  readonly estimatedItemSize: number;
  readonly screenWidth: number;
}

export function useFeedScreen(): UseFeedScreenResult {
  const ui = useUiStore();
  const { width: screenWidth } = useWindowDimensions();
  const listRef = useRef<LegendListRef>(null);
  const watchersRef = useRef<Map<string, () => void>>(new Map());

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
    if (!hasNextPage || isFetchingNextPage) return;
    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<Post>) => (
      <PostCard
        post={item}
        width={screenWidth}
        onPress={() =>
          router.push({
            pathname: '/posts/[id]',
            params: { id: item.id },
          })
        }
      />
    ),
    [screenWidth],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);
  const estimatedItemSize = useMemo(() => screenWidth + 160, [screenWidth]);
  const showFullScreenError = Boolean(error) && posts.length === 0;

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
    [handleRefresh, isRefetching],
  );

  const feedPostIds = useMemo(() => posts.map((post) => post.id), [posts]);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [ui.tierFilter]);

  useEffect(() => {
    const nextIds = new Set(feedPostIds);
    const currentWatchers = watchersRef.current;

    for (const postId of nextIds) {
      if (currentWatchers.has(postId)) continue;
      currentWatchers.set(postId, realtimeManager.watchPost(postId));
    }

    for (const [postId, unwatch] of currentWatchers) {
      if (nextIds.has(postId)) continue;
      unwatch();
      currentWatchers.delete(postId);
    }
  }, [feedPostIds]);

  useEffect(
    () => () => {
      for (const [, unwatch] of watchersRef.current) unwatch();
      watchersRef.current.clear();
    },
    [],
  );

  return {
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
  };
}
