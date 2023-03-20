import axios, { AxiosError, AxiosResponse } from "axios";

const langaviApi = axios.create({
  // baseURL: "http://192.168.86.46:3000/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await langaviApi.get(url, { params });
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const post = async <T>(url: string, data?: object) => {
  try {
    const response: AxiosResponse<T> = await langaviApi.post(url, data);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const put = async (url: string, data?: object) => {
  try {
    const response = await langaviApi.put(url, data);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const del = async (url: string) => {
  try {
    const response = await langaviApi.delete(url);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};
