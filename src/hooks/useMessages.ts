import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, sendMessage as apiSendMessage } from '../services/api';
import type {SendMessagePayload} from '../types';

export const useMessages = () => {
    const queryClient = useQueryClient();

    const {
        data: messages = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['messages'],
        queryFn: () => fetchMessages(),
    });

    const {
        mutate: sendMessage,
        isPending: isSending
    } = useMutation({
        mutationFn: (payload: SendMessagePayload) => apiSendMessage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });

    return {
        messages,
        isLoading,
        isError,
        sendMessage,
        isSending,
    };
};