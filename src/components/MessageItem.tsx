import {memo} from "react";
import type {Message} from '../types';
import {formatDate} from "../utils/formatDate.ts";
import {decodeText} from "../utils/decodeText.ts";

interface MessageItemProps {
    message: Message;
}

export const MessageItem = memo(({message}: MessageItemProps) => {
    const isMine = message.author === 'You'
    return (
        <div className={`message-item ${isMine ? 'mine' : ''}`}>
            <span className="message-author">{decodeText(message.author)}</span>
            <p className="message-text">{decodeText(message.message)}</p>
            <time className="message-time">{formatDate(message.createdAt)}</time>
        </div>
    );
});