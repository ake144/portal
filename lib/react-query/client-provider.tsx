'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
             // Check if error has a response property with a status
             const status = (error as any)?.response?.status;
             return status !== 401 && failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: (failureCount, error) => {
             // Check if error has a response property with a status
             const status = (error as any)?.response?.status;
             return status !== 401 && failureCount < 3;
        },
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}