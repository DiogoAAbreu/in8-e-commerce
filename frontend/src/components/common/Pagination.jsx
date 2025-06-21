const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage, }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxButtonsToShow = 5;

        if (totalPages <= maxButtonsToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage < 4) {
            endPage = maxButtonsToShow;
        }

        if (currentPage > totalPages - 3) {
            startPage = totalPages - maxButtonsToShow + 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav>
            <ul className="flex justify-center items-center py-8 space-x-1 sm:space-x-2">
                <li>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                </li>

                {pageNumbers.map(pageNumber => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-4 py-2 border rounded-lg text-sm font-semibold cursor-pointer
                ${currentPage === pageNumber
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Próximo
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;