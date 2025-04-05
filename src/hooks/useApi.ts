"use client";
import { useAuth } from "@clerk/nextjs";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const useApi = () => {
  const { getToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  const fetchWithAuth = async <T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const token = await getToken();
      const response: AxiosResponse<T> = await axiosInstance({
        url,
        ...options,
        headers: { Authorization: `Bearer ${token}`, ...options.headers },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle HTTP errors (4xx, 5xx)
        console.error("API Error:", axiosError.response.data);
        throw new Error("An error occurred");
      } else if (axiosError.request) {
        // Handle network errors (no response from server)
        console.error("Network Error:", axiosError.request);
        throw new Error("Network error. Please check your connection.");
      } else {
        // Handle other errors
        console.error("Error:", axiosError.message);
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const getAuth = <T>(url: string, options?: AxiosRequestConfig) =>
    fetchWithAuth<T>(url, { ...options, method: "GET" });

  const postAuth = <T>(url: string, data?: any, options?: AxiosRequestConfig) =>
    fetchWithAuth<T>(url, { ...options, method: "POST", data });

  const putAuth = <T>(url: string, data?: any, options?: AxiosRequestConfig) =>
    fetchWithAuth<T>(url, { ...options, method: "PUT", data });

  const delAuth = <T>(url: string, options?: AxiosRequestConfig) =>
    fetchWithAuth<T>(url, { ...options, method: "DELETE" });

  return { fetchWithAuth, getAuth, postAuth, putAuth, delAuth };
};
