import apiInstance from "./axiosInstance";

export const authApi = {
  login: (payload: { email: string; password: string }) => {
    return apiInstance.post("users/login", payload);
  },
  signup: (payload: {
    email: string;
    password: string;
    name: string;
    height: string;
    age: string;
    position: string;
    phoneNumber: string;
  }) => apiInstance.post("users/signup", payload),
  me: () => apiInstance.get("users/me"),
};
