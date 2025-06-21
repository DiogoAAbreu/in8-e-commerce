import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";

const ProductGrid = ({ children, isLoading, error }) => {
    return (
        <section className="w-full">
            {error &&
                <span className="text-2xl font-bold w-full h-full flex justify-center items-center text-gray-600 text-center">
                    {error}
                </span>}
            {isLoading ?
                <Spinner /> :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {children}
                </div>}
        </section>
    )
}

export default ProductGrid;