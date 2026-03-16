import {memo} from "react";
import type {Message} from '../types';
import {formatDate} from "../utils/formatDate.ts";
import {decodeText} from "../utils/decodeText.ts";

interface MessageItemProps {
    message: Message;
}

// Wrapped in memo to prevent re-rendering every single message when the chat list updates
export const MessageItem = memo(({message}: MessageItemProps) => {
    // Check if the message belongs to the current user to apply specific styling
    const isMine = message.author === 'You';

    return (
        <div className={`message-item ${isMine ? 'mine' : ''}`}>
            {/* Decoding text to handle potential HTML entities (like &#39;) from the backend safely */}
            <span className="message-author">{decodeText(message.author)}</span>
            <p className="message-text">{decodeText(message.message)}</p>
            {/* Using semantic <time> tag with dateTime attribute for better accessibility */}
            <time className="message-time" dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
        </div>
    );
});