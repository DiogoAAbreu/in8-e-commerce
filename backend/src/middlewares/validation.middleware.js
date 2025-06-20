import { fetchProductById } from "../services/provider.service.js";

export const validateOrderRequest = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "O corpo da requisição deve conter um array 'items' com pelo menos um produto." });
        }

        for (const cartItem of items) {
            if (!cartItem.id || !cartItem.quantity || cartItem.quantity <= 0) {
                return res.status(400).json({ message: `Item do carrinho inválido: ${JSON.stringify(cartItem)}` });
            }
        }

        const productPromises = items.map(item => fetchProductById(item.id));
        const fetchedProducts = await Promise.all(productPromises);

        const notFoundIndex = fetchedProducts.findIndex(product => product === null);
        if (notFoundIndex !== -1) {
            const invalidProductId = items[notFoundIndex].id;
            return res.status(404).json({ message: `Produto com ID '${invalidProductId}' não foi encontrado.` });
        }
        console.log(fetchedProducts)
        req.validatedProducts = fetchedProducts;

        next();
    } catch (error) {
        console.error("Erro no middleware de validação de pedido:", error);
        return res.status(500).json({ message: "Erro interno ao validar os produtos do pedido." });
    }
}