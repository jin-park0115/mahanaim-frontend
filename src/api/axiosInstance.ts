import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8080/api", //공통 주소
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
