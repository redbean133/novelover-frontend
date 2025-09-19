import axios from "axios";
import { decodeJwt } from "@/shared/utils/helpers";

const passthroughAuth = [
  "/users/login",
  "/users/register",
  "/users/refresh-token",
];

// Main axios instance
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// Axios instance use to refresh token
const plainApiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

apiService.interceptors.request.use(
  async (config) => {
    if (passthroughAuth.some((path) => config.url?.includes(path))) {
      return config;
    }

    let token = localStorage.getItem("accessToken");
    const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");
    const now = Date.now();

    // Token expired
    if (accessTokenExpiry && now > parseInt(accessTokenExpiry) * 1000) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await plainApiService.post("/user/refresh-token");
          const newAccessToken = res.data.accessToken;
          const decodeNewToken = decodeJwt(newAccessToken);

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem(
            "accessTokenExpiry",
            decodeNewToken.exp.toString()
          );
          token = newAccessToken;

          refreshQueue.forEach((callback) => callback(newAccessToken));
          refreshQueue = [];
        } catch (error) {
          console.error("Error refreshing token:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("accessTokenExpiry");
          window.location.href = "/login";
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If refreshing new token now, wait for new token before send request
        return new Promise((resolve) => {
          refreshQueue.push((newToken) => {
            if (config.headers) {
              config.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(config);
          });
        });
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
