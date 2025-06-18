import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [filterSelected, setFilterSelected] = useState('');

    const fetchProducts = useCallback(async (page, filter) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getProducts(page, filter);

            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
        } catch (err) {
            console.error("Falha ao buscar produtos:", err);
            setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(currentPage, filterSelected);
    }, [currentPage, filterSelected, fetchProducts]);

    return {
        products,
        isLoading,
        error,
        currentPage,
        totalPages,
        filterSelected,
        setFilterSelected,
        totalItems,
        setCurrentPage
    };
}
