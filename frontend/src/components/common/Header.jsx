import ProductCart from "../products/ProductCart";
import SearchBar from "../products/SearchBar";

export default function Header({
    quantityProducts
}) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-900 cursor-pointer">In8 e-Commerce</h1>
                <SearchBar />
                <ProductCart quantityProducts={quantityProducts} />
            </div>
        </header>
    )
}