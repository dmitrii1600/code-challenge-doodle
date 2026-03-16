import {useCallback, useLayoutEffect, useRef, type UIEvent} from "react";
import {useMessages} from './hooks/useMessages';
import {MessageItem} from './components/MessageItem';
import {MessageInput} from './components/MessageInput';
import './App.css';

function App() {
    const {messages, isLoading, sendMessage, loadMore, hasNextPage, isFetchingMore, isSending} = useMessages();

    // We use refs instead of state for scroll tracking because updating them
    // doesn't trigger component re-renders, ensuring a smooth 60fps scrolling experience.
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevScrollHeightRef = useRef<number>(0);
    const isInitialLoad = useRef(true);

    // useLayoutEffect fires synchronously after DOM mutations but BEFORE the browser paints.
    // This is strictly required for scroll manipulations to prevent visual flickering/jumping.
    useLayoutEffect(() => {
        const container = scrollRef.current;

        // Early return: if container is not ready or there are no messages, do nothing
        if (!container || messages.length === 0) return;

        // Scenario 1: History loaded (user scrolled to top).
        // Calculate the height difference to keep the scroll position exactly where the user was looking.
        if (prevScrollHeightRef.current > 0) {
            container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
            prevScrollHeightRef.current = 0; // Reset after adjustment
            return; // Exit early since we handled the history load
        }

        // Scenario 2: First application load.
        // Instantly snap scroll to the bottom to show the most recent messages.
        if (isInitialLoad.current) {
            container.scrollTop = container.scrollHeight;
            isInitialLoad.current = false;
        }
            // Scenario 3: A new message was added to the bottom!
        // Smoothly scroll down to provide visual feedback for the new message.
        else {
            container.scrollTo({top: container.scrollHeight, behavior: 'smooth'});
        }
    }, [messages]);

    // Handle infinite scrolling mechanism
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;

        // Eagerly fetch older messages when the user is within 50px of the top boundary
        if (container.scrollTop < 50 && hasNextPage && !isFetchingMore && !isLoading) {
            // Snapshot the current scroll height BEFORE new DOM nodes are prepended
            prevScrollHeightRef.current = container.scrollHeight;
            loadMore();
        }
    };

    // Wrapped in useCallback to preserve function reference equality.
    // This guarantees that the memoized <MessageInput /> child component won't re-render
    // just because the App component re-renders.
    const handleSend = useCallback((author: string, text: string) => {
        sendMessage({author, message: text});
    }, [sendMessage]);

    return (
        <div className="chat-app">
            <div
                className="messages-list"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {/* Displaying inline loading states for better UX during network requests */}
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