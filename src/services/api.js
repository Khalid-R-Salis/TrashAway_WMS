import axios from "axios";

const api = axios.create({
  baseURL: "https://waste-mangement-backend-j7t0.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is saved in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
