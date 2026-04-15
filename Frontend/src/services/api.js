import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const authStorageKey = "ngo-impact-token";
const userStorageKey = "ngo-impact-user";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(authStorageKey);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = String(
      error?.response?.data?.msg || error?.response?.data?.error || "",
    ).toLowerCase();
    const isTokenError =
      status === 401 ||
      (status === 422 &&
        (message.includes("subject must be a string") ||
          message.includes("invalid token") ||
          message.includes("missing") ||
          message.includes("signature")));

    if (isTokenError) {
      localStorage.removeItem(authStorageKey);
      localStorage.removeItem(userStorageKey);
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
