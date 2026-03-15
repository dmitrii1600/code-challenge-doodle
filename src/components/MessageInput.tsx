import {useState, type FormEvent, memo} from 'react';

interface MessageInputProps {
    onSend: (author: string, message: string) => void;
    isSending: boolean;
}

const author = "Me";

export const MessageInput = memo(({onSend, isSending}: MessageInputProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSend(author, text);
        setText('');
    };

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    placeholder="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSending}
                    className="message-input"
                />
                <button type="submit" disabled={isSending || !text.trim()} className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
});