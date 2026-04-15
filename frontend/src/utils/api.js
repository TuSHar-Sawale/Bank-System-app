import axios from "axios";

const rawApiUrl = process.env.REACT_APP_API_URL?.trim();
const normalizedBaseUrl = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, "").endsWith("/api")
    ? rawApiUrl.replace(/\/+$/, "")
    : `${rawApiUrl.replace(/\/+$/, "")}/api`
  : "http://localhost:5000/api";

const API = axios.create({
  baseURL: normalizedBaseUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
