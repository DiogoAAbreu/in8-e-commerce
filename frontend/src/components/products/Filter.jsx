export default function Filter({ filterSelected, setFilterSelected }) {
    const handleOriginChange = (event) => {
        setFilterSelected(event.target.value);
    }

    return (
        <aside className="w-full">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Filtros</h2>
                <div>
                    <h3 className="font-semibold mb-2">Origem</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={""}
                                onChange={handleOriginChange}
                                checked={filterSelected === ""}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Todos</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"brazilian"}
                                onChange={handleOriginChange}
                                checked={filterSelected === "brazilian"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Fornecedor Brasileiro 🇧🇷</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"european"}
                                onChange={handleOriginChange}
                                checked={filterSelected === "european"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Fornecedor Europeu 🇪🇺</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"discount"}
                                onChange={handleOriginChange}
                                checked={filterSelected === "discount"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Produtos com desconto 🏷️</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    )
}
