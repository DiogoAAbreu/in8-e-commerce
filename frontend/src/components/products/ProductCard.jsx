import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";
import formatCurrency from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
    const {
        id,
        name,
        imageUrl,
        hasDiscount,
        price,
        discountValue,
        origin,
    } = product;

    const { addToCart } = useCartContext();

    const formattedValue = formatCurrency(price);
    const formattedValueWithDiscount = formatCurrency(price, discountValue);

    function handleClick() {
        const productToAdd = {
            ...product,
            quantity: 1
        }
        addToCart(productToAdd)
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Link to={`/products/${id}`}>
                <img src={imageUrl} alt="Produto" className="w-full h-48 object-cover cursor-pointer" />
            </Link>
            <div className="p-4">
                {origin === 'european' ?
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-default">Europeu 🇪🇺</span> :
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full cursor-default">Brasileiro 🇧🇷</span>}
                {hasDiscount &&
                    <span className="text-xs bg-yellow-100 text-yellow-800-800 px-2 py-1 rounded-full cursor-default">Desconto 🏷️</span>}
                <Link to={`/products/${id}`}>
                    <h3 className="mt-2 font-semibold text-lg text-gray-800 truncate cursor-pointer">{name}</h3>
                </Link>
                {hasDiscount ?
                    <>
                        <span className="mt-2 text-md font-light line-through decoration-red-500 decoration-2 text-gray-900 mr-3">R$ {formattedValue}</span>
                        <span className="mt-2 text-2xl font-bold text-gray-900">R$ {formattedValueWithDiscount}</span>
                    </>
                    :
                    <p className="mt-2 text-2xl font-bold text-gray-900">R$ {formattedValue}</p>}

                <button onClick={handleClick}
                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    )
}