import axios from "axios";
import { getCookie } from "../utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = getCookie("token"); // Changed to use cookie
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Errors (Global)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optional: Handle 401 Unauthorized globally (e.g., auto logout)
        if (error.response && error.response.status === 401) {
            // We might want to clear token here, but usually context handles this
            // localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;
