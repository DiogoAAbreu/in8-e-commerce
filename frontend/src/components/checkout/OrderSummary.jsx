import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import formatCurrency from "../../utils/formatCurrency";

const OrderSumary = () => {
    const { cartTotal } = useContext(CartContext);

    const totalFormated = formatCurrency(cartTotal);
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
                    className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors cursor-pointer">
                    Pagar Agora
                </button>
            </div>
        </div>
    )
}

export default OrderSumary;