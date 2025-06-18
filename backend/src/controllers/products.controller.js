import { fetchAllProducts, fetchProductById } from '../services/provider.service.js';

export const getAllProducts = async (req, res) => {
    try {
        let allProducts = await fetchAllProducts();

        const { filter, search } = req.query;
        const page = parseInt(req.query.page, 10) || 1;

        if (filter) {
            if (filter === 'discount') {
                allProducts = allProducts.filter(product => product.hasDiscount === true);
            } else {
                allProducts = allProducts.filter(product => product.origin === filter);
            }
        }

        if (search) {
            allProducts = allProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }

        const limit = 20;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedProducts = allProducts.slice(startIndex, endIndex);

        const totalItems = allProducts.length;
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            data: paginatedProducts,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
        });

    } catch (error) {
        console.error("Erro no controller ao buscar produtos:", error);

        res.status(500).json({ message: "Erro interno ao buscar os produtos." });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await fetchProductById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(`Erro no controller ao buscar produto com ID ${req.params.id}:`, error);

        res.status(500).json({ message: "Erro interno ao buscar o produto." });
    }
};