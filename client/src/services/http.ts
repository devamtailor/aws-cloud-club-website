import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import type { ApiErrorResponse } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is missing. Configure it in your client .env file.");
}

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message ?? "Request failed";
    toast.error(message);
    return Promise.reject(error);
  }
);
