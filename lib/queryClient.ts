import { QueryClient } from '@tanstack/react-query';

// Query key constants for consistent cache management
export const queryKeys = {
    projects: ['projects'] as const,
    contacts: ['contacts'] as const,
    contact: (id: string) => ['contacts', id] as const,
} as const;

// Create QueryClient with appropriate defaults for retry logic, cache times, and error handling
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered stale after 5 minutes
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Data is garbage collected after 10 minutes of being unused
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            // Retry failed requests up to 3 times
            retry: 3,
            // Exponential backoff with max delay of 30 seconds
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,
            // Refetch when network reconnects
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry mutations once on failure
            retry: 1,
        },
    },
});