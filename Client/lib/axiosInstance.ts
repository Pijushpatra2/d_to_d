// import axios from "axios"

// // Get from .env.local
// const ROOT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// export const API_BASE_URL = `${ROOT_BASE_URL}/api/v1`
// export const MEDIA_BASE_URL = ROOT_BASE_URL

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// })

// // Request interceptor to add token to headers
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle token expiration
// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem("token")
//       document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default api







//advanced






  
import axios, { AxiosRequestConfig } from "axios";

const ROOT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!ROOT_BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not defined");

export const API_BASE_URL = `${ROOT_BASE_URL}/api/v1`;

// -----------------------------
// Token helpers
// -----------------------------
export const setAuthToken = (role: "user" | "admin", token: string) =>
  localStorage.setItem(`${role}Token`, token);

export const getAuthToken = (role: "user" | "admin") =>
  localStorage.getItem(`${role}Token`);

export const clearAuthToken = (role: "user" | "admin") => {
  localStorage.removeItem(`${role}Token`);
};

// -----------------------------
// Axios instance
// -----------------------------
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config: AxiosRequestConfig & { role?: "user" | "admin" }) => {
  const role = (config as any).role;
  if (role) {
    const token = getAuthToken(role);
    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Optionally handle token expiration
      clearAuthToken("user");
      clearAuthToken("admin");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
