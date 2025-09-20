import { authApi } from "@/api/authApi";
import type { User } from "../interfaces/user.response";
import { AxiosError } from "axios";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  rootLocation: string;
}

export const registerAction = async ({
  name,
  email,
  password,
  rootLocation,
}: RegisterInput) => {
  try {
    const { data } = await authApi.post<User>("/auth/register", {
      name,
      email,
      password,
      frontBaseUrl: rootLocation,
    });
    return data;
  } catch (error) {
    // console.log(error);
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || "Error en la petición";
      throw new Error(message);
    }
    throw error;
  }
};
