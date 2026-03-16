import {useInfiniteQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchMessages, sendMessage as apiSendMessage} from '../services/api';

export const useMessages = () => {
    const queryClient = useQueryClient();

    // Manage fetching chat history using cursor-based pagination
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['messages'],
        queryFn: ({pageParam}) => fetchMessages(pageParam),
        initialPageParam: undefined as string | undefined,

        // Determine the cursor for the next API call to load older messages
        getNextPageParam: (lastPage) => {
            // If the chunk is smaller than the limit (e.g., 10), we've reached the very first message
            if (!lastPage || lastPage.length < 10) return undefined;
            // Use the timestamp of the oldest message in the current batch as the next cursor
            return lastPage[0].createdAt;
        },

        // Transform the data structure before passing it to the UI components
        select: (data) => {
            // Reverse the chunks so older messages appear at the top and newer at the bottom (standard chat UI)
            const allMessagesFlat = data.pages.toReversed().flat();
            return [...allMessagesFlat];
        },
    });

    // Handle sending a new message to the backend
    const {mutate: sendMessage, isPending: isSending} = useMutation({
        mutationFn: apiSendMessage,
        onSuccess: () => {
            // Invalidate the cache to trigger a background refetch.
            // This guarantees 100% data consistency with the server and avoids duplicate keys.
            // serving as a reliable alternative to manual Optimistic Updates for this scope.
            queryClient.invalidateQueries({queryKey: ['messages']});
        },
    });

    return {
        messages: data || [],
        isLoading,
        sendMessage,
        isSending,
        isError,
        error,
        loadMore: fetchNextPage,
        hasNextPage,
        isFetchingMore: isFetchingNextPage
    };
};