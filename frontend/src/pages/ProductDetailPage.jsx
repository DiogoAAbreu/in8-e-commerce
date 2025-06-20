import Header from "../components/common/Header";
import formatCurrency from "../utils/formatCurrency";

export default function ProductDetailPage() {
    const product = {
        id: 'br_1',
        name: 'Produto Fantástico de Exemplo',
        description: 'Esta é uma descrição detalhada e atraente do produto, explicando os seus benefícios, materiais e porque o cliente deveria comprá-lo. O texto pode ser um pouco mais longo para preencher o espaço.',
        price: 4990,
        imageUrl: `https://picsum.photos/seed/${1}/640/480`,
        origin: 'european',
        hasDiscount: true,
        discountValue: 5,
        material: 'Aço Inoxidável',
        adjective: 'Moderno'
    };
    return (
        <>
            <Header
                productsAddedToCart={[1, 2,]}
                showSearch={false} />
            <main className="container mx-auto px-4 lg:px-8 py-10">
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
                            </span>}
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
                            <button className="w-full md:w-auto px-10 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}