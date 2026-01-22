export interface User {
  userId: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  position: "FW" | "MF" | "DF" | "GK";
  age: number;
  height: number;
  phoneNumber: string;
}
