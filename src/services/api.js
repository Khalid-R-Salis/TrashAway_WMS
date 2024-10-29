import axios from "axios";

const api = axios.create({
  baseURL: "https://waste-mangement-backend-j7t0.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to set the Authorization header for each request
api.interceptors.request.use(
  (config) => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession?.token) {
      config.headers.Authorization = `Bearer ${userSession.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
