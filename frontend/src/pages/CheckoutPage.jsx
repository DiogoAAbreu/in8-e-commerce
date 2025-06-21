import CheckoutItem from "../components/checkout/CheckoutItem";
import OrderSumary from "../components/checkout/OrderSummary";
import Header from "../components/common/Header";
import { CartContext } from "../context/CartContext";
import { useCartContext } from "../hooks/useCartContext";

const CheckoutPage = () => {
    const { productsAddedToCart, itemCount } = useCartContext(CartContext);
    return (
        <>
            <Header showSearch={false} />
            {productsAddedToCart[0] ?
                < main className="container mx-auto px-4 lg:px-8 py-10">
                    <h1 className="text-3xl font-bold text-purple-800 mb-8">Finalizar a sua Compra</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                                <p className="font-thin text-gray-500">{itemCount} itens</p>
                                <div className="space-y-4">
                                    {productsAddedToCart.map(product =>
                                        <CheckoutItem key={product.id}
                                            product={product} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <aside className="lg:col-span-1">
                            <OrderSumary />
                        </aside>
                    </div>
                </main >
                :
                <div className="w-full p-14 text-2xl font-bold text-gray-600 text-center">
                    <p>Carrinho vazio...</p>
                </div>}
        </>
    )
}

export default CheckoutPage;