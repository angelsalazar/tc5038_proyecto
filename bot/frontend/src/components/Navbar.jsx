function Navbar({ children }) {
    return (
        <header className="border-b py-4">
            <nav className="container mx-auto px-4 flex">
                <h1 className="text-slate-900 font-semibold flex-1">Hotel <span className="text-orange-400">AI</span>ssistant</h1>
                {children}
            </nav>
        </header>
    )
}

export default Navbar;