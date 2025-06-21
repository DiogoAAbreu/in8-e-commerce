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
                hasDiscount: productDetails.hasDiscount,
                discountValue: productDetails.discountValue,
                origin: productDetails.origin,
            });

            finalOrderTotal += productDetails.price * quantity;
        }
        const newOrder = await prisma.order.create({
            data: {
                total: finalOrderTotal,
                totalDiscount: orderItemsToCreate.reduce((sum, item) => sum + (item.discountValue * item.quantity), 0),
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
        return res.status(500).json({ message: "Erro interno ao processar o pedido." });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            }, include: {
                items: true,
            },
        });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(order);
    } catch {
        res.status(500).json({ message: "Erro interno ao buscar o pedido." });
    }
}