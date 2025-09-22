import { AxiosError } from "axios";
import { authApi } from "@/api/authApi";
import type { User } from "../interfaces/user.response";

interface loginInputs {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: loginInputs) => {
  try {
    const { data } = await authApi.post<User>("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error);
    }
    throw error;
  }
};
