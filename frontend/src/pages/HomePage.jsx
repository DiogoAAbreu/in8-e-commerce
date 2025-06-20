import Header from "../components/common/Header";
import Filter from "../components/products/Filter";
import ProductGrid from "../components/products/ProductGrid";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";
import Pagination from "../components/common/Pagination";
import OrderSearch from "../components/order/OrderSearch";

export default function HomePage() {

    const {
        products,
        isLoading,
        error,
        totalPages,
        totalItems,
        filterSelected,
        setFilterSelected,
        currentPage,
        setCurrentPage,
        search,
        setSearch
    } = useProducts();

    return (
        <>
            <Header
                showSearch={true}
                search={search}
                setSearch={setSearch} />
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <Filter
                            filterSelected={filterSelected}
                            setFilterSelected={setFilterSelected}
                        />
                        <OrderSearch />
                    </aside>
                    <div className="w-full">
                        <ProductGrid
                            isLoading={isLoading}
                            error={error}>
                            {products.map(product =>
                                <ProductCard key={product.id}
                                    product={product}
                                />
                            )}
                        </ProductGrid>
                        {!isLoading &&
                            <p className="w-full text-center mt-8 text-gray-400 font-thin">
                                {products.length} de {totalItems} produtos
                            </p>}
                        {(totalPages > 1 && !isLoading) &&
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />}
                    </div>
                </div>
            </main>
        </>
    )
}