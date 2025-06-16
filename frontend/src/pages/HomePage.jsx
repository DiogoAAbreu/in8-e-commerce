import { useState } from "react";
import Header from "../components/common/Header";
import Filter from "../components/products/Filter";
import ProductGrid from "../components/products/ProductGrid";
import ProductCard from "../components/products/ProductCard";

export default function HomePage() {
    const [productsAddedToCart, setProductsAddedToCart] = useState([]);

    const [selectedOrigin, setSelectedOrigin] = useState('todos');

    const [product, setProduct] = useState({
        id: 1,
        name: 'teste',
        description: 'teste descriçao',
        imageUrl: `https://picsum.photos/seed/1/400/400`,
        material: 'teste material',
        adjective: 'teste aaaa',
        hasDiscount: true,
        price: 7000,
        discountValue: 5,
        origin: 'european',
    })
    return (
        <>
            <Header
                quantityProducts={productsAddedToCart.length} />
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <Filter
                        selectedOrigin={selectedOrigin}
                        setSelectedOrigin={setSelectedOrigin} />
                    <ProductGrid>
                        <ProductCard product={product} />
                    </ProductGrid>
                </div>
            </main>
        </>
    )
}