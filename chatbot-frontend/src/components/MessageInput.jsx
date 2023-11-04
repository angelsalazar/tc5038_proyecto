function MessageInput({ onMessage }) {

    function handleSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const message = formData.get('message');
        
        if (
            message === undefined   || 
            message === null        || 
            message.length === 0
        ) {
            return;
        }


        if (onMessage && typeof onMessage === 'function') {
            onMessage(message)
        }

        ev.target.reset();
    }


    return (
        <div className="bg-white rounded-md px-4 py-2">
            <form className="flex gap-4" onSubmit={handleSubmit}>
                <div className="flex-1">
                    <input 
                        type="text" 
                        name="message"
                        placeholder="Type message here"
                        className="w-full h-10 outline-none"
                    />
                </div>
                <button className="rounded text-white bg-slate-900 inline-flex items-center justify-center w-10 h-10 hover:bg-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default MessageInput