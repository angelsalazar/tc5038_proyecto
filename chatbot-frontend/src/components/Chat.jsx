import { useState } from 'react';
import Messages from './Messages'
import MessageInput from './MessageInput';

const msgs = [{
    id: 1,
    content: 'hello, I am an agent',
    author: 'bot'
}] 
function Chat() {
    const [messages, setMessages] = useState(msgs);

    function handleMessage(message) {
        setMessages(prev => ([
            ...prev,
            {
                id: Date.now(),
                content: message,
                author: 'user'
            }
        ]));
    }

    return (
        <div className="h-full flex flex-col bg-slate-100 sm:rounded-lg">
            <div className="flex-1">
                <Messages messages={messages} />
            </div>
            <div className="p-4 shrink-0" >
                <MessageInput onMessage={handleMessage}/>
            </div>
        </div>
    )
}

export default Chat;