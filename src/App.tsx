import {useCallback, useLayoutEffect, useRef, type UIEvent} from "react";
import {useMessages} from './hooks/useMessages';
import {MessageItem} from './components/MessageItem';
import {MessageInput} from './components/MessageInput';
import './App.css';

function App() {
    const {messages, isLoading, sendMessage, loadMore, hasNextPage, isFetchingMore, isSending} = useMessages();
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevScrollHeightRef = useRef<number>(0);
    const isInitialLoad = useRef(true);

    useLayoutEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        if (prevScrollHeightRef.current > 0) {
            container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
            prevScrollHeightRef.current = 0;
        } else if (isInitialLoad.current && messages.length > 0) {
            container.scrollTop = container.scrollHeight;
            isInitialLoad.current = false;
        }
    }, [messages.length]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;

        if (container.scrollTop < 50 && hasNextPage && !isFetchingMore && !isLoading) {
            prevScrollHeightRef.current = container.scrollHeight;
            loadMore();
        }
    };

    const handleSend = useCallback((author: string, text: string) => {
        sendMessage({author, message: text});

        const container = scrollRef.current;
        if (!container) return;
        container.scrollTo({top: container.scrollHeight, behavior: 'smooth'});
    }, [sendMessage]);

    return (
        <div className="chat-app">
            <div
                className="messages-list"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {isFetchingMore && <div className="loading-more">Loading history...</div>}
                {messages.map((msg) => (
                    <MessageItem key={msg._id} message={msg}/>
                ))}
                {isLoading && <div className="loading">Initializing chat...</div>}
            </div>
            <MessageInput onSend={handleSend} isSending={isSending}/>
        </div>
    );
}

export default App;