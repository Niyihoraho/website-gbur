'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Keep data in cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry 2 times on failure
            retry: 2,
            // Faster retry delay - max 3 seconds instead of 30
            retryDelay: (attemptIndex) => Math.min(300 * (attemptIndex + 1), 3000),
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Keep previous data while refetching (smoother UX)
            placeholderData: (previousData) => previousData,
            // Structural sharing to prevent unnecessary re-renders
            structuralSharing: true,
          },
          mutations: {
            // Retry mutations once
            retry: 1,
            // Faster mutation retry
            retryDelay: 500,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

