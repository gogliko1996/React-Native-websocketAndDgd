import axios from "axios";
import { appConfig } from "./appConfig";

import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: appConfig.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      await AsyncStorage.setItem("accessToken", newToken);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const response = await axios.post(`${appConfig.apiUrl}/auth/refresh-token`, {
    token: refreshToken,
  });
  const newToken = response.data.accessToken;
  await AsyncStorage.setItem("accessToken", newToken);
  return newToken;
};

export default api;
