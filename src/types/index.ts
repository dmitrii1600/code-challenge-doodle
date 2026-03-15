export interface Message {
    _id: string;
    author: string;
    message: string;
    createdAt: string;
}

export interface SendMessagePayload {
    author: string;
    message: string;
}