import {useState, type FormEvent, memo, useEffect, useRef} from 'react';

interface MessageInputProps {
    onSend: (author: string, message: string) => void;
    isSending: boolean;
}

const AUTHOR_NAME = "You";

export const MessageInput = memo(({onSend, isSending}: MessageInputProps) => {
    const [text, setText] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isSending && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSending]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim() && !isSending) {
            onSend(AUTHOR_NAME, text);
            setText('');
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
                <button type="submit"
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