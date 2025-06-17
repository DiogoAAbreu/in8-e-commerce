import { useState } from "react";
import Header from "../components/common/Header";
import Filter from "../components/products/Filter";
import ProductGrid from "../components/products/ProductGrid";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
    const [productsAddedToCart, setProductsAddedToCart] = useState([]);

    const [selectedOrigin, setSelectedOrigin] = useState('todos');

    const {
        products,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalItems,
        setCurrentPage } = useProducts();

    return (
        <>
            <Header
                productsAddedToCart={productsAddedToCart} />
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <Filter
                        selectedOrigin={selectedOrigin}
                        setSelectedOrigin={setSelectedOrigin} />
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
                </div>
            </main>
        </>
    )
}