import clsx from 'clsx';


function Message({ content, author }) {
    const isBot = author === 'bot';

    return (
       <div className="px-4 py-1">
            <div className={clsx('flex', isBot ? ' justify-start' : 'justify-end')}>
                <div className={clsx('p-2', 'rounded-lg', isBot ? 'bg-gray-200 rounded-bl-none' : 'bg-orange-200 rounded-br-none')}>
                    <p>{content}</p>
                </div>
            </div>
       </div>

    )
}

// TODO: fix max-height and overflow-y

function Messages({ messages = [] }) {
    return (
        <div className="max-h-[704px] overflow-y-auto">
            {messages.map(msg => (
                <Message 
                    key={msg.id}
                    content={msg.content}
                    author={msg.author}
                />
            ))}
        </div>
    )
}

export default Messages