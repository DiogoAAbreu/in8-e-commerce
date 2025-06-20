import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function getProducts(page = 1, filter, search) {
    const params = {
        page: page,
    };

    if (filter) {
        params.filter = filter;
    }

    if (search) {
        params.search = search;
    }

    return api.get('/products', { params });
}

export const getProductById = (productId) => {
    return api.get(`/products/${productId}`);
};

export default api;