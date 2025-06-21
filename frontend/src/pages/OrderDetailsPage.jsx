import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import { useOrder } from "../hooks/useOrder";
import formatCurrency from "../utils/formatCurrency";
import OrderItem from "../components/order/OrderItem";
import Spinner from "../components/common/Spinner";


const OrderDetailsPage = () => {
    const { id } = useParams();
    const { isLoading, order, error } = useOrder(id);

    const formatedTotal = formatCurrency(order?.total);
    return (
        <>
            <Header showSearch={false} />
            {isLoading && <Spinner />}
            {error &&
                <div className="flex flex-col items-center mt-20">
                    <span className="text-2xl font-bold w-full h-full flex justify-center items-center text-gray-600 text-center">
                        {error}
                    </span>
                    <div className="mt-8">
                        <Link
                            to="/"
                            className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Voltar para a Página Inicial
                        </Link>
                    </div>
                </div>}
            {order &&
                <main className="container mx-auto max-w-2xl px-4 py-16">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                        <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mt-6">Pedido Realizado com Sucesso!</h1>
                        <p className="text-gray-500 mt-2">Obrigado pela sua compra. O seu pedido será processado em breve.</p>
                        <div className="mt-8 bg-purple-50 border-2 border-dashed border-purple-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Use este código para acompanhar o seu pedido:</p>
                            <p className="text-2xl font-mono font-bold text-purple-800 tracking-wider mt-1">{order?.id}</p>
                        </div>
                        <div className="text-left mt-8">
                            <h2 className="font-bold text-lg mb-4">Resumo da sua compra (3 itens):</h2>
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                {order?.items.map(item => <OrderItem key={item.id} item={item} />)}
                            </div>
                        </div>
                        <div className="flex justify-between font-bold text-xl mt-6 border-t border-t-gray-300  pt-4">
                            <span>Total:</span>
                            <span>R$ {formatedTotal}</span>
                        </div>
                        <div className="mt-10">
                            <Link to={'/'}>
                                <button className="w-full inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                                    Continuar a Comprar
                                </button>
                            </Link>
                        </div>
                    </div>
                </main >}
        </>
    )
}

export default OrderDetailsPage;