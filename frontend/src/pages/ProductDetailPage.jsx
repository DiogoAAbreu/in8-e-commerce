import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import formatCurrency from "../utils/formatCurrency";
import { useProductDetail } from "../hooks/useProductDetail";
import Spinner from "../components/common/Spinner";
import { useCartContext } from "../hooks/useCartContext";

const ProductDetailPage = () => {

    const { id } = useParams();

    const { product, isLoading, error } = useProductDetail(id);

    const { addToCart } = useCartContext();

    const handleClick = () => {
        addToCart(product);
    }

    return (
        <>
            <Header showSearch={false} />
            <main className="container mx-auto px-4 lg:px-8 py-10">
                {isLoading && <Spinner />}

                {error &&
                    <div className="flex flex-col items-center">
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
                {product &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                        <div className="w-full">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${product.origin === 'brazilian' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {product.origin === 'brazilian' ? 'Brasileiro 🇧🇷' : 'Europeu 🇪🇺'}
                            </span>
                            {product.hasDiscount &&
                                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Desconto 🏷️
                                </span>}ProductDetailPage
                            <h1 className="text-4xl font-bold text-gray-800 mt-4">{product.name}</h1>
                            <div className="my-4">
                                {product.hasDiscount &&
                                    <span className="mt-2 text-xl font-light line-through decoration-red-500 decoration-2 text-gray-900 mr-3">
                                        R$ {formatCurrency(product.price)}
                                    </span>}
                                <span className="text-3xl font-bold text-purple-600"> R$ {formatCurrency(product.price, product.discountValue)}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                            <div className="mt-6 border-t pt-4">
                                <h3 className="font-semibold text-gray-700">Detalhes:</h3>
                                <ul className="list-disc list-inside mt-2 text-gray-600">
                                    <li>Material: {product.material}</li>
                                    <li>Estilo: {product.adjective}</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <button onClick={handleClick}
                                    className="w-full md:w-auto px-10 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors cursor-pointer">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>}
            </main>
        </>
    )
}

export default ProductDetailPage;