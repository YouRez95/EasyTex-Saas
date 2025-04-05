import axios, { AxiosInstance } from "axios";

export const createApiClient = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
