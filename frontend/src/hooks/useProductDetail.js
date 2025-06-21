import { useState, useEffect, useCallback } from 'react';
import { getProductById } from '../services/api';

export const useProductDetail = (productId) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async () => {
        if (!productId) {
            setIsLoading(false);
            return;
        };

        setIsLoading(true);
        setError(null);
        try {
            const response = await getProductById(productId);

            setProduct(response.data);
        } catch (err) {
            setError('Não foi possível detalhar este produto. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { product, isLoading, error };
}