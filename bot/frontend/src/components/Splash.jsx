const noop = () => {};

/**
 * 
 * @param {{ options: string[], onSelect: Function }} param0 
 */
function Splash({ options = [], onSelect = noop }) {

    function handleClick(ev) {
        if (onSelect && typeof onSelect === 'function' ) {
            onSelect(ev.target.value);
        }
    }

    return (
        <div className="rounded-lg bg-slate-100 h-full flex items-center justify-center">
            <div className="flex flex-col gap-4 w-44">
                {options.map(opt => (
                    <button 
                        key={opt}
                        value={opt}
                        onClick={handleClick}
                        className="bg-slate-900 text-white text-sm font-semibold px-3 py-2 flex justify-center rounded-md hover:bg-slate-700">
                        {opt.replace('_', ' ')}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Splash;