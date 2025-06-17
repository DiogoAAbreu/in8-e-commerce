import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function getProducts(page = 1, filter = '') {
    const params = {
        page: page,
    };

    if (origin) {
        params.filter = filter;
    }

    return api.get('/products', { params });
}

export default api;