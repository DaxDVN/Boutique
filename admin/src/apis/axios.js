import axios from "axios";
import { getAuth } from "../utils/auth.js";
import { server_url } from "../utils/config.js";

const instance = axios.create({
  baseURL: server_url
});

instance.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/login") && !config.url.includes("/register")) {
      const auth = getAuth();
      if (auth && auth.authToken) {
        config.headers.Authorization = `Bearer ${auth.authToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
