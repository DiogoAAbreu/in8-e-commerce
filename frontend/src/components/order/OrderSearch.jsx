import { useState } from "react";
import { useNavigate } from "react-router-dom"

const OrderSearch = () => {

    const [orderId, setOrderId] = useState('');

    const navigate = useNavigate();
    const handleForm = (event) => {
        event.preventDefault();
        if (orderId) {
            navigate(`/order-details/${orderId}`)
        }
    }

    return (
        <aside>
            <form onSubmit={handleForm}
                className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-gray-800">Acompanhar Pedido</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        value={orderId}
                        onChange={(event) => setOrderId(event.target.value)}
                        placeholder="Digite o código do pedido"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors cursor-pointer"
                    >
                        Pesquisar
                    </button>
                </div>
            </form>
        </aside>
    )
}

export default OrderSearch