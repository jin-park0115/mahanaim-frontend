import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "토큰이 만료되었거나 유효하지 않습니다. 로그아웃 처리합니다.",
      );

      localStorage.removeItem("accessToken");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
