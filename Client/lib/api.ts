// lib/api.ts
import api from "./axiosInstance";

export const setAuthToken = (role: "user" | "admin", token: string) => {
  localStorage.setItem(`${role}Token`, token)
}

export const getAuthToken = (role: "user" | "admin") => {
  return localStorage.getItem(`${role}Token`)
}

export const clearAuthToken = (role: "user" | "admin") => {
  localStorage.removeItem(`${role}Token`)
  document.cookie = `${role}Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

// userApi wrapper
export const userApi = {
  get: (url: string, config: any = {}) => api.get(url, { ...config, role: "user" }),
  post: (url: string, data?: any, config: any = {}) => api.post(url, data, { ...config, role: "user" }),
  put: (url: string, data?: any, config: any = {}) => api.put(url, data, { ...config, role: "user" }),
  delete: (url: string, config: any = {}) => api.delete(url, { ...config, role: "user" }),
};

// adminApi wrapper
export const adminApi = {
  get: (url: string, config: any = {}) => api.get(url, { ...config, role: "admin" }),
  post: (url: string, data?: any, config: any = {}) => api.post(url, data, { ...config, role: "admin" }),
  put: (url: string, data?: any, config: any = {}) => api.put(url, data, { ...config, role: "admin" }),
  patch: (url: string, data?: any, config: any = {}) => api.patch(url, data, { ...config, role: "admin" }),
  delete: (url: string, config: any = {}) => api.delete(url, { ...config, role: "admin" }),
}

export default api