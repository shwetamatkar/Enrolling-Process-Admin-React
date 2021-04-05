import axios from "axios";
import AuthService from "../authentication/AuthService";

const axiosConfig = axios.create({
  baseURL: "http://10.33.202.223:8081"
});

axiosConfig.defaults.withCredentials = true;
axiosConfig.defaults.headers["Accept"] = "application/json";

axiosConfig.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = AuthService.getAuthHeader();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axiosConfig;
