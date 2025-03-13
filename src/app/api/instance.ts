import axios, { CreateAxiosDefaults } from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v4/`;

const controller = new AbortController();

const config: CreateAxiosDefaults = {
  signal: controller.signal,
  baseURL: baseApiUrl,
};

const apiClient = axios.create(config);

export const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: { ...params, apikey: apiKey },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
