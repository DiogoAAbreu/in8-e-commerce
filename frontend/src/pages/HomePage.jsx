import { useState } from "react";
import Header from "../components/common/Header";
import Filter from "../components/products/Filter";
import ProductGrid from "../components/products/ProductGrid";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";
import Pagination from "../components/common/Pagination";

export default function HomePage() {
    const [productsAddedToCart, setProductsAddedToCart] = useState([]);

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
                search={search}
                setSearch={setSearch}
                productsAddedToCart={productsAddedToCart} />
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <Filter
                        filterSelected={filterSelected}
                        setFilterSelected={setFilterSelected} />
                    <div className="w-full">
                        <ProductGrid
                            isLoading={isLoading}
                            error={error}>
                            {products.map(product =>
                                <ProductCard key={product.id}
                                    product={product}
                                    productsAddedToCart={productsAddedToCart}
                                    setProductsAddedToCart={setProductsAddedToCart} />
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