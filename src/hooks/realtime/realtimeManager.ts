import type { QueryClient } from '@tanstack/react-query';

import { apiConfig } from '@/api/config';
import { prependCommentToCache, updatePostLikeAcrossCache } from '@/hooks/cache';
import { postQueryKeys, postsQueryKeys } from '@/hooks/queries/queryKeys';
import type { CommentAddedPayload, LikeUpdatedPayload, WsEventPayload } from '@/hooks/realtime/interfaces';
import type { PostsResponse } from '@/schemas/post';

class RealtimeManager {
  private socket: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private queryClient: QueryClient | null = null;
  private isStarted = false;
  private readonly watchedPostIds = new Set<string>();
  private readonly sentSubscriptions = new Set<string>();
  private readonly subscriptionRefCount = new Map<string, number>();

  public start(queryClient: QueryClient): void {
    this.queryClient = queryClient;
    if (this.isStarted) return;
    this.isStarted = true;
    this.connect();
  }

  public stop(): void {
    this.isStarted = false;
    this.queryClient = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.watchedPostIds.clear();
    this.sentSubscriptions.clear();
    this.subscriptionRefCount.clear();
    if (!this.socket) return;
    this.socket.close();
    this.socket = null;
  }

  public watchPost(postId: string): () => void {
    if (postId.length === 0) return () => { };
    const nextCount = (this.subscriptionRefCount.get(postId) ?? 0) + 1;
    this.subscriptionRefCount.set(postId, nextCount);
    this.watchedPostIds.add(postId);
    this.sendSubscribe(postId);

    return () => {
      const current = this.subscriptionRefCount.get(postId) ?? 0;
      if (current <= 1) {
        this.subscriptionRefCount.delete(postId);
        this.watchedPostIds.delete(postId);
        this.sentSubscriptions.delete(postId);
        this.sendUnsubscribe(postId);
        return;
      }
      this.subscriptionRefCount.set(postId, current - 1);
    };
  }

  private connect(): void {
    if (!this.isStarted) return;
    if (!this.queryClient) return;
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.socket = new WebSocket(this.toWebSocketUrl());

    this.socket.onopen = () => {
      this.sentSubscriptions.clear();
      for (const postId of this.watchedPostIds) this.sendSubscribe(postId);
    };

    this.socket.onmessage = (event) => {
      const payload = this.safeParseJson(event.data);
      if (!payload || typeof payload.type !== 'string') return;
      this.handleEvent(payload);
    };

    this.socket.onerror = () => { };

    this.socket.onclose = () => {
      this.socket = null;
      if (!this.isStarted) return;
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(() => this.connect(), 2_000);
    };
  }

  private sendSubscribe(postId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    if (this.sentSubscriptions.has(postId)) return;
    this.socket.send(JSON.stringify({ type: 'subscribe', postId }));
    this.sentSubscriptions.add(postId);
  }

  private sendUnsubscribe(postId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({ type: 'unsubscribe', postId }));
  }

  private handleEvent(payload: WsEventPayload): void {
    if (!this.queryClient) return;
    if (payload.type === 'like_updated') this.applyLikeUpdated(payload);
    if (payload.type === 'comment_added') this.applyCommentAdded(payload);
  }

  private applyLikeUpdated(payload: WsEventPayload): void {
    if (!this.queryClient) return;

    const data = (payload.data ?? payload.payload) as LikeUpdatedPayload | undefined;
    const postId = data?.postId ?? payload.postId;
    const likesCount = data?.likesCount ?? payload.likesCount;
    if (!postId || typeof likesCount !== 'number') return;

    const previousLikeState = this.getPreviousLikeState(postId);
    const incomingIsLiked = data?.isLiked ?? payload.isLiked;
    const derivedIsLiked =
      likesCount > (previousLikeState?.likesCount ?? 0)
        ? true
        : likesCount < (previousLikeState?.likesCount ?? 0)
          ? false
          : previousLikeState?.isLiked ?? false;

    updatePostLikeAcrossCache(this.queryClient, postId, {
      likesCount,
      isLiked: incomingIsLiked ?? derivedIsLiked,
    });
  }

  private applyCommentAdded(payload: WsEventPayload): void {
    if (!this.queryClient) return;

    const data = (payload.data ?? payload.payload) as CommentAddedPayload | undefined;
    const comment = data?.comment ?? payload.comment;
    const postId = data?.postId ?? comment?.postId ?? payload.postId;
    if (!postId || !comment) return;

    prependCommentToCache(this.queryClient, postId, comment, true);
  }

  private getPreviousLikeState(postId: string): { isLiked: boolean; likesCount: number } | undefined {
    if (!this.queryClient) return undefined;

    const detailPost = this.queryClient.getQueryData<{ data: { post: { isLiked: boolean; likesCount: number } } }>(
      postQueryKeys.detail(postId),
    )?.data.post;
    if (detailPost) return detailPost;

    return this.queryClient
      .getQueriesData<{ pages: PostsResponse[] }>({
        queryKey: postsQueryKeys.all,
        exact: false,
      })
      .flatMap(([, value]) => value?.pages ?? [])
      .flatMap((page) => page.data.posts)
      .find((post) => post.id === postId);
  }

  private toWebSocketUrl(): string {
    const baseUrl = new URL(apiConfig.baseUrl);
    baseUrl.protocol = baseUrl.protocol === 'https:' ? 'wss:' : 'ws:';
    baseUrl.pathname = `${baseUrl.pathname.replace(/\/$/, '')}/ws`;
    baseUrl.search = '';
    baseUrl.searchParams.set('token', apiConfig.token);
    return baseUrl.toString();
  }

  private safeParseJson(value: string | ArrayBuffer): WsEventPayload | null {
    if (typeof value !== 'string') return null;
    try {
      return JSON.parse(value) as WsEventPayload;
    } catch {
      return null;
    }
  }
}

export const realtimeManager = new RealtimeManager();
