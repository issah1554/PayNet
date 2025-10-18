// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
    withCredentials: true,
});

// Request interceptor: attach JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: refresh expired token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (refreshToken) {
                    const res = await axios.post("http://127.0.0.1:8000/auth/refresh/", {
                        refresh: refreshToken,
                    });
                    localStorage.setItem("access_token", res.data.access);

                    // retry original request
                    error.config.headers.Authorization = `Bearer ${res.data.access}`;
                    return api(error.config);
                }
            } catch {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
