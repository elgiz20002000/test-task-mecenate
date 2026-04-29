import { useEffect } from 'react';

import { realtimeManager } from '@/hooks/realtime/realtimeManager';

export function usePostRealtime(postId: string): void {
  useEffect(() => {
    return realtimeManager.watchPost(postId);
  }, [postId]);
}
