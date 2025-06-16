export default function Filter({ selectedOrigin, setSelectedOrigin }) {
    const handleOriginChange = (event) => {
        setSelectedOrigin(event.target.value);
    }

    return (
        <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Filtros</h2>
                <div>
                    <h3 className="font-semibold mb-2">Origem</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"all"}
                                onClick={handleOriginChange}
                                checked={selectedOrigin === "all"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Todos</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"br"}
                                onClick={handleOriginChange}
                                checked={selectedOrigin === "br"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Fornecedor Brasileiro 🇧🇷</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"eu"}
                                onChange={handleOriginChange}
                                checked={selectedOrigin === "eu"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Fornecedor Europeu 🇪🇺</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="origin"
                                value={"discount"}
                                onChange={handleOriginChange}
                                checked={selectedOrigin === "discount"}
                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500" />
                            <span className="ml-2 text-gray-700">Produtos com desconto 🏷️</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    )
}
