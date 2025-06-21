import { useState } from "react";

export default function SearchBar({
    search,
    setSearch
}) {
    const [inputValue, setInputValue] = useState('');

    const handleSearchSubmit = () => {
        setSearch(inputValue);
        console.log(search)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };
    return (
        <div className="w-1/2 lg:w-1/3">
            <div className="relative">
                <button
                    onClick={handleSearchSubmit}
                    className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                <input type="text"
                    name="search"
                    onChange={event => setInputValue(event.target.value)}
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar produtos..."
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
        </div>
    )
}