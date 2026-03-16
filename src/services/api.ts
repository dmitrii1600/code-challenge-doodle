import type {Message, SendMessagePayload} from '../types';

// Load environment variables securely using Vite's import.meta.env
const API_URL = import.meta.env.VITE_API_BASE_URL + '/messages';
const TOKEN = import.meta.env.VITE_API_TOKEN;

// Pre-configure headers to ensure consistency and reusability across all API calls
const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

/**
 * Fetches a paginated list of messages using cursor-based pagination.
 *  @param before - The timestamp cursor. Fetches messages strictly older than this date. Defaults to current time.
 * @param limit - The maximum number of messages to return per request (chunk size).
 */
export const fetchMessages = async (
    before: string = new Date().toISOString(),
    limit: number = 10
): Promise<Message[]> => {
    // Safely construct the URL with query parameters using the modern URL API
    // instead of manual string concatenation (prevents formatting bugs)
    const url = new URL(API_URL);

    if (before) {
        url.searchParams.append('before', before);
    }
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers
    });

    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }

    return response.json();
};

/**
 * Submits a new message payload to the server.
 */
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