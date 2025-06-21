import { useState, useEffect } from "react";
import { getOrderById } from "../services/api";

export const useOrder = (orderId) => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        if (!orderId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getOrderById(orderId);

            setOrder(response.data);
        } catch (error) {
            setError("Erro ao buscar pedido. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    return { order, isLoading, error };
}