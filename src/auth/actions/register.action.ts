import { authApi } from "@/api/authApi";
import type { User } from "../interfaces/user.response";
import { AxiosError } from "axios";

export const registerAction = async (
  name: string,
  email: string,
  password: string,
  rootLocation: string
) => {
  try {
    const { data } = await authApi.post<User>("/auth/register", {
      name,
      email,
      password,
      frontBaseUrl: rootLocation,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Error en la petición";
      throw new Error(message);
    }
    throw error;
  }
};
