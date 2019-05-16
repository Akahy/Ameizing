import axios from 'axios';
import store from '@/store';

const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (store.state.authentification.token) {
        config.headers.Authorization = `Bearer ${store.state.authentification.token}`;
    }
    return config;
});

export default api;
