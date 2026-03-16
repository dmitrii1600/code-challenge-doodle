import {useState, type FormEvent, memo, useEffect, useRef} from 'react';

interface MessageInputProps {
    onSend: (author: string, message: string) => void;
    isSending: boolean;
}

// Hardcoded author name for the current user's messages
const AUTHOR_NAME = "You";

// Wrapped in memo to prevent unnecessary re-renders when parent components update
export const MessageInput = memo(({onSend, isSending}: MessageInputProps) => {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Restore focus to the input field automatically after a message is sent
    useEffect(() => {
        if (!isSending && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSending]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Only send if text is not empty and a request is not already in progress
        if (text.trim() && !isSending) {
            onSend(AUTHOR_NAME, text);
            setText(''); // Clear input after successful send
        }
    };

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSending}
                    className="message-input"
                    aria-label="Type your message"
                    autoFocus
                />
                <button
                    type="submit"
                    // Disable button to prevent empty messages or double submissions
                    disabled={isSending || !text.trim()}
                    className="send-button"
                    aria-label="Send message"
                >
                    Send
                </button>
            </form>
        </div>
    );
});