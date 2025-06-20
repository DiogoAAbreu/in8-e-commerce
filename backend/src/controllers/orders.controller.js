import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const { validatedProducts } = req;

        let finalOrderTotal = 0;
        const orderItemsToCreate = [];

        for (const productDetails of validatedProducts) {
            const cartItem = items.find(item => item.id === productDetails.id);
            const quantity = cartItem.quantity;

            orderItemsToCreate.push({
                productId: productDetails.id,
                name: productDetails.name,
                price: productDetails.price,
                imageUrl: productDetails.imageUrl,
                quantity: quantity,
                description: productDetails.description,
                material: productDetails.material,
                adjective: productDetails.adjective,
                origin: productDetails.origin,
            });

            finalOrderTotal += productDetails.price * quantity;
        }
        const newOrder = await prisma.order.create({
            data: {
                total: finalOrderTotal,
                items: {
                    create: orderItemsToCreate,
                },
            },
            include: {
                items: true,
            },
        });

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        return res.status(500).json({ message: "Erro interno ao processar o pedido." });
    }
}