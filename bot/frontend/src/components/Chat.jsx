import { useState } from 'react';
import Messages from './Messages'
import MessageInput from './MessageInput';

import { prompt } from '../api';

function createMessage(content, author) {
    return {
        id: Date.now(),
        content,
        author
    }
}

function Chat({ onError }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleMessage(message) {
        setMessages(prev => ([
            ...prev,
            createMessage(message, 'user')
        ]))
        setLoading(true);
        prompt(message)
            .then(payload => {
                console.log(payload);
                setMessages(prev => ([
                    ...prev,
                    {
                        id: Date.now(),
                        content: payload.reply,
                        author: 'bot'
                    }
                ]))
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                if (onError && typeof onError === 'function') {
                    onError(error)
                }
            });
    }

    return (
        <div className="h-full flex flex-col bg-slate-100 sm:rounded-lg sm:relative">
            <div className="flex-1">
                <Messages messages={messages} />
            </div>
            <div className="p-4 shrink-0" >
                <MessageInput disabled={loading} onMessage={handleMessage}/>
            </div>
        </div>
    )
}

export default Chat;