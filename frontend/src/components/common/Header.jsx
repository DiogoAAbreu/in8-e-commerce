import { Link } from "react-router-dom";
import ProductCart from "../products/ProductCart";
import SearchBar from "../products/SearchBar";

export default function Header({
    showSearch,
    search,
    setSearch
}) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
                <Link to={'/'}>
                    <h1 className="flex text-2xl font-bold text-purple-900 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                        in8 <span className="hidden md:block ml-2"> e-Commerce</span>
                    </h1>
                </Link>
                {showSearch && <SearchBar
                    search={search}
                    setSearch={setSearch} />}
                <ProductCart />
            </div>
        </header>
    )
}