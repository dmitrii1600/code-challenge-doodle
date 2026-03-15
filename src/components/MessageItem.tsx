import {memo} from "react";
import type {Message} from '../types';
import {formatDate} from "../utils/formatDate.ts";

interface MessageItemProps {
    message: Message;
}

export const MessageItem = memo(({message}: MessageItemProps) => {
    return (
        <div className="message-item">
            <span className="message-author">{message.author}</span>
            <p className="message-text">{message.message}</p>
            <span className="message-time">{formatDate(message.createdAt)}</span>
        </div>
    );
});