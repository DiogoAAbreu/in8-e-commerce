import axios from 'axios';

const brazilianProviderUrl = process.env.BRAZILIAN_PROVIDER_URL;
const europeanProviderUrl = process.env.EUROPEAN_PROVIDER_URL;

const mapBrazilianProduct = (product) => ({
    id: `br_${product.id}`,
    name: product.nome,
    description: product.descricao,
    imageUrl: `https://picsum.photos/seed/${product.id}/640/480`,
    material: product.material,
    adjective: product.departamento,
    hasDiscount: false,
    price: parseInt(product.preco.replace('.', '')),
    discountValue: 0,
    origin: 'brazilian',
});

const mapEuropeanProduct = (product) => ({
    id: `eu_${product.id}`,
    name: product.name,
    description: product.description,
    imageUrl: `https://picsum.photos/seed/${product.id}/640/480`,
    material: product.details.material,
    adjective: product.details.adjective,
    hasDiscount: product.hasDiscount,
    price: parseInt(product.price.replace('.', '')),
    discountValue: parseInt(product.discountValue.replace('.', '')),
    origin: 'european',
});

export const fetchAllProducts = async () => {
    try {
        const [brazilianResponse, europeanResponse] = await Promise.all([
            axios.get(brazilianProviderUrl),
            axios.get(europeanProviderUrl),
        ]);

        const brazilianProducts = brazilianResponse.data.map(mapBrazilianProduct);
        const europeanProducts = europeanResponse.data.map(mapEuropeanProduct);

        return [...brazilianProducts, ...europeanProducts];
    } catch (error) {
        throw new Error('Falha ao buscar dados dos fornecedores.');
    }
};

export const fetchProductById = async (compositeId) => {
    const [origin, id] = compositeId.split('_');

    if (!origin || !id) {
        throw new Error('Formato de ID inválido.');
    }

    try {
        if (origin === 'br') {
            const response = await axios.get(`${brazilianProviderUrl}/${id}`);
            return mapBrazilianProduct(response.data);
        } else if (origin === 'eu') {
            const response = await axios.get(`${europeanProviderUrl}/${id}`);
            return mapEuropeanProduct(response.data);
        } else {
            return null;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }

        throw new Error('Falha ao buscar detalhes do produto.');
    }
};