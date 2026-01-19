import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
