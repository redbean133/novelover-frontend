import axios from "axios";
import { UserRepositoryImpl } from "../repositories-implementation/user.repositoryImpl";
import { decodeJwt } from "@/shared/utils/helpers";

const passthroughAuth = [
  "/user/login",
  "/user/register",
  "/user/refresh-token",
];

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

apiService.interceptors.request.use(
  async (config) => {
    if (passthroughAuth.some((path) => config.url?.includes(path))) {
      return config;
    }

    const token = localStorage.getItem("accessToken");
    const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");
    const now = new Date().getTime();

    if (accessTokenExpiry && now > parseInt(accessTokenExpiry) * 1000) {
      try {
        const { accessToken: newAccessToken } =
          await new UserRepositoryImpl().refreshToken();
        const decodeNewToken = decodeJwt(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem(
          "accessTokenExpiry",
          decodeNewToken.exp.toString()
        );
        return config;
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpiry");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiService;
