import {useCallback} from "react";
import {useMessages} from './hooks/useMessages';
import {MessageItem} from './components/MessageItem';
import {MessageInput} from './components/MessageInput';
import './App.css';

function App() {
    const {messages, isLoading, isError, sendMessage, isSending} = useMessages();

    const handleSend = useCallback((author: string, text: string) => {
        sendMessage({author, message: text});
    }, [sendMessage]);

    if (isError) return <div className="error">Chat loading error :(</div>;

    return (
        <div className="chat-app">
            <div className="messages-list">
                {isLoading && <div className="loading">Loading...</div>}

                {[...messages].map((msg) => (
                    <MessageItem key={msg._id} message={msg}/>
                ))}
            </div>

            <MessageInput onSend={handleSend} isSending={isSending}/>
        </div>
    );
}

export default App;