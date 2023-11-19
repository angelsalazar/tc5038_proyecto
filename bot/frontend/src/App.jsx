import { useState } from 'react';
import { useEffect } from 'react';
import { getTasks, start, dispose } from './api';

import Navbar from './components/Navbar';
import Splash from './components/Splash';
import Chat from './components/Chat';

function App() {
    const [loading, setLoading] = useState(true); 
    const [tasks, setTasks] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        getTasks()
            .then(tasks => {
                setTasks(tasks);
                setLoading(false);
            })
    }, []);


    function handleSelectedTask(task) {
        setLoading(true);
        start(task)
            .then(() => {
                setSelectedTask(task);
                setLoading(false);
            });
    }

    function handleFinish() {
        setLoading(true);
        dispose()
            .then(() => {
                setSelectedTask(null);
                setLoading(false);
            })
    }

    function handleError(error) {
        alert(`Oops something when wrong (${error}). the app will restart`);
        setSelectedTask(null);
    }

    if (!tasks) {
        return (
            <div className="h-screen">
                <div className="h-full flex items-center justify-center">
                    <div className="animate-bounce">
                        <h1 className="text-3xl text-slate-900 font-semibold">Hotel <span className="text-orange-400">AI</span>ssistant</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <Navbar>
                {selectedTask && (
                    <button 
                        className="bg-slate-900 text-white text-sm font-semibold px-3 py-2 flex justify-center rounded-md hover:bg-slate-700"
                        onClick={handleFinish}>
                        Finish
                    </button>
                )}
            </Navbar>
            <main className="flex-1 sm:py-4">
                <div className="h-full max-h-full container mx-auto sm:px-4">
                    <div className="h-full grid grid-cols-1 gap-0 sm:grid-cols-3 sm:gap-4">
                        <section className="col-span-1 sm:col-span-2">
                            {selectedTask ? (
                                <Chat 
                                    onError={handleError}
                                />
                            ) : (
                                <Splash 
                                    options={tasks}
                                    onSelect={handleSelectedTask}
                                />
                            )}
                        </section>
                        <aside className="hidden  sm:block sm:col-auto">
                            <div className="rounded-lg bg-slate-100 p-4 space-y-4">
                                <h2 className="text-slate-900 text-lg font-semibold">Information</h2>
                                <p className="text-slate-900">
                                    Introducing our all-in-one chatbot, your personal concierge for seamless bookings and effortless stay management. From making reservations to facilitating check-ins and check-outs, this AI assistant ensures a smooth and hassle-free experience. Say goodbye to lengthy procedures and hello to convenience—book, arrive, and depart with ease, all through a simple chat interface.                                
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            {loading && (
                <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center">
                    <p className="text-2xl">Loading...</p>
                </div>
            )}
        </div>
    )
}

export default App
