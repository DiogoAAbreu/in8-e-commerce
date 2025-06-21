import { useCartContext } from "../../hooks/useCartContext";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const OrderSumary = () => {
    const { cartTotal, checkout, isCheckingOut, checkoutError } = useCartContext();

    const totalFormated = formatCurrency(cartTotal);

    const navigate = useNavigate();

    const handleCheckout = async () => {
        const newOrder = await checkout();
        if (newOrder) {
            navigate(`/order-details/${newOrder.id}`);
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Total da Compra</h2>

            <div className="space-y-2 my-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {totalFormated}</span>
                </div>
                <div className="flex justify-between">
                    <span>Envio</span>
                    <span className="text-green-600 font-semibold">Grátis</span>
                </div>
            </div>

            <div className="flex justify-between font-bold text-2xl mt-4 border-t pt-4">
                <span>Total</span>
                <span>R$ {totalFormated}</span>
            </div>
            <div className="mt-6">
                <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors cursor-pointer">
                    Pagar Agora
                </button>
                {checkoutError &&
                    <p className="text-center text-red-500 mt-4">{checkoutError}</p>}
            </div>
        </div>
    )
}

export default OrderSumary;