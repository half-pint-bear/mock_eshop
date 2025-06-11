import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Error interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

// Basic CRUD functions
export const apiClientGet = (endpoint, params = {}) =>
    apiClient.get(endpoint,  params );

export const apiClientPost = (endpoint, data = {}) =>
    apiClient.post(endpoint, data);

export const apiClientPut = (endpoint, data = {}) =>
    apiClient.put(endpoint, data);

export const apiClientDelete = (endpoint) =>
    apiClient.delete(endpoint);
