import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from '../hooks/logoutHandler';

const api = axios.create({
    baseURL: 'http://192.168.0.18:8000/api',
});

api.interceptors.request.use(async (config) => {
    console.log("teste")
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Se o access token expirar
        if (error.response?.status === 401 && !originalRequest._retry) {
            await AsyncStorage.removeItem('access_token');
            triggerLogout();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;
