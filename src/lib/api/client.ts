import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "@/config/constants";
import { ApiError } from "@/types";

export const apiClient = axios.create({
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Resolve baseURL lazily at request time — avoids module-init env var issues
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url?.startsWith("/api/")) {
    // Internal Next.js API route — use current origin
    config.baseURL = typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";
  } else {
    // External backend API — read env var at call time
    config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://kiosk.farm";
  }
  return config;
});

// Attach Bearer token — only if no Authorization header already set (e.g. Basic Auth for login/OTP)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers.Authorization) {
    const token = Cookies.get(COOKIE_ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Track if a refresh is already in-flight to avoid parallel refresh calls
let isRefreshing = false;
let pendingQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

function processQueue(error: unknown, token: string | null) {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  pendingQueue = [];
}

// Response interceptor — handle 401 and refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN);

      if (!refreshToken) {
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(new ApiError(401, "Session expired"));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://kiosk.farm"}/kisaan/companion/v1/refresh-token`,
          { refreshToken },
        );

        const newAccessToken: string = data.data.accessToken;
        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(new ApiError(401, "Session expired"));
      } finally {
        isRefreshing = false;
      }
    }

    const status  = error.response?.status ?? 0;
    const message = (error.response?.data as { message?: string })?.message ?? error.message;
    return Promise.reject(new ApiError(status, message));
  },
);

const isSecure = process.env.NEXT_PUBLIC_PROFILE === "prod" || process.env.NEXT_PUBLIC_PROFILE === "uat";

// expiresIn is in milliseconds from backend (e.g. 86400000 = 24h)
export function setTokens(accessToken: string, refreshToken?: string, expiresIn = 86400000) {
  const expiresInDays = expiresIn / (1000 * 60 * 60 * 24);
  Cookies.set(COOKIE_ACCESS_TOKEN, accessToken, { secure: isSecure, sameSite: "strict", expires: expiresInDays });
  if (refreshToken) {
    Cookies.set(COOKIE_REFRESH_TOKEN, refreshToken, { secure: isSecure, sameSite: "strict", expires: 30 });
  }
}

export function setAccessToken(token: string) {
  Cookies.set(COOKIE_ACCESS_TOKEN, token, { secure: isSecure, sameSite: "strict", expires: 1 / 96 });
}

export function clearTokens() {
  Cookies.remove(COOKIE_ACCESS_TOKEN);
  Cookies.remove(COOKIE_REFRESH_TOKEN);
}

export function getAccessToken(): string | undefined {
  return Cookies.get(COOKIE_ACCESS_TOKEN);
}
