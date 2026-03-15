import type {Message, SendMessagePayload} from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/messages';
const TOKEN = import.meta.env.VITE_API_TOKEN;

const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

export const fetchMessages = async (before: string = new Date().toISOString(), limit: number = 10): Promise<Message[]> => {
    const url = new URL(API_URL);

    if (before) {
        url.searchParams.append('before', before);
    }

    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {method: 'GET', headers});

    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }

    return response.json();
};

export const sendMessage = async (payload: SendMessagePayload): Promise<Message> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
};