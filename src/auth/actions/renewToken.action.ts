import { authApi } from "@/api/authApi";
import { AxiosError } from "axios";
import type { User } from "../interfaces/user.response";

export const renewTokenAction = async (): Promise<{
  user: User;
  token: string;
}> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await authApi.get<{ user: User; token: string }>(
      "/auth/renew_token"
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error ?? "Unauthorized");
    }
    throw new Error("Token expired or not valid");
  }
};
