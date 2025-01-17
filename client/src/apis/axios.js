import axios from "axios";
import { getAuth } from "../utils/auth";
import { server_url } from "../utils/config.js";

const host = server_url + "/api";

const successStatusResponse = [200, 201, 204];

const axiosClient = axios.create({
  baseURL: host
});

axiosClient.interceptors.request.use(
  (config) =>
  {
    if (!config.url.includes("login") || !config.url.includes("register")) {
      const auth = getAuth();
      if (auth && auth.authToken) {
        config.headers.Authorization = `Bearer ${auth.authToken}`;
      }
      return config;
    }
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) =>
  {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) =>
  {
    throw error;
  }
);

export default axiosClient;