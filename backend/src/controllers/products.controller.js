import { fetchAllProducts } from '../services/provider.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await fetchAllProducts();

        const page = parseInt(req.query.page, 10) || 1;
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