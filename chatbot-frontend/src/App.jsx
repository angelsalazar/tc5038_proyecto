import { useState } from 'react';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import Chat from './components/Chat';

function App() {
    const [started, setStarted] = useState(false);

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 sm:py-4">
                <div className="h-full max-h-full container mx-auto sm:px-4">
                    <div className="h-full grid grid-cols-1 gap-0 sm:grid-cols-3 sm:gap-4">
                        <div className="col-span-1 sm:col-span-2">
                            {started ? (
                                <Chat />
                            ) : (
                                <Splash onStart={() => setStarted(true)}/>
                            )}
                        </div>
                        <div className="hidden  sm:block sm:col-auto">
                            <div className="rounded-lg bg-slate-100 p-4">
                                <h2 className="text-slate-900 text-lg font-semibold">Information</h2>
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default App
