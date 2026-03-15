import {useInfiniteQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchMessages, sendMessage as apiSendMessage} from '../services/api';

export const useMessages = () => {
    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['messages'],
        queryFn: ({pageParam}) => fetchMessages(pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return lastPage[0].createdAt;
        },
        select: (data) => {
            const allMessagesFlat = data.pages.toReversed().flat();
            return [...allMessagesFlat];
        },
    });

    const {mutate: sendMessage, isPending: isSending} = useMutation({
        mutationFn: apiSendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['messages']});
        },
    });

    return {
        messages: data || [],
        isLoading,
        sendMessage,
        isSending,
        loadMore: fetchNextPage,
        hasNextPage,
        isFetchingMore: isFetchingNextPage
    };
};