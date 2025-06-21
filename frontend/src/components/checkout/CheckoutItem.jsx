import formatCurrency from "../../utils/formatCurrency";
import { useCartContext } from "../../hooks/useCartContext";

const CheckoutItem = ({ product }) => {
    const {
        id,
        name,
        quantity,
        imageUrl,
        price,
    } = product;

    const { removeFromCart, updateQuantity } = useCartContext()

    const formatedPrice = formatCurrency(price * quantity);

    const handleRemoveItem = () => {
        removeFromCart(id)
    }

    const handleDecreseQuantity = () => {
        updateQuantity(id, quantity - 1);
    }

    const handleIncreaseQuantity = () => {
        updateQuantity(id, quantity + 1);
    }

    return (
        <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
                <img src={imageUrl} alt="Produto" className="w-20 h-20 object-cover rounded-md" />
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center mt-2 border rounded-md w-fit">
                        <button onClick={handleDecreseQuantity}
                            className="px-1 md:px-3 py-1 text-lg font-semibold text-gray-600 cursor-pointer hover:opacity-70">-</button>
                        <span className="px-4 font-semibold">{quantity}</span>
                        <button onClick={handleIncreaseQuantity}
                            className="px-1 md:px-3 py-1 text-lg font-semibold text-gray-600 cursor-pointer hover:opacity-70">+</button>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <span className="font-semibold text-sm md:text-lg">R$ {formatedPrice}</span>
                <button onClick={handleRemoveItem}
                    className="text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CheckoutItem;