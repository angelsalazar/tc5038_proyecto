function Splash({ onStart }) {
    function handleClick() {
        if (onStart && typeof onStart === 'function' ) {
            onStart()
        }
    }


    return (
        <div className="rounded-lg bg-slate-100 h-full flex items-center justify-center">
            <button 
                className="bg-slate-900 text-white text-sm font-semibold px-3 py-2 inline-flex justify-center rounded-md hover:bg-slate-700"
                onClick={handleClick}>Start Now</button>
        </div>
    );
}

export default Splash;