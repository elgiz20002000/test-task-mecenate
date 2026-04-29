import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { realtimeManager } from '@/hooks/realtime/realtimeManager';

export function useAppRealtime(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    realtimeManager.start(queryClient);
    return () => {
      realtimeManager.stop();
    };
  }, [queryClient]);
}
