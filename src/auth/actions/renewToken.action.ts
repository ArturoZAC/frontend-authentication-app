import { authApi } from "@/api/authApi";
import { AxiosError } from "axios";

export const renewTokenAction = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await authApi.get<{ token: string }>("/auth/renew_token");
    localStorage.setItem("token", data.token);
    console.log({ data });
    return data;
  } catch (error) {
    localStorage.removeItem("token");
    if (error instanceof AxiosError) {
      throw error.response?.data.error;
    }
    throw new Error("Token expired or not valid");
  }
};
