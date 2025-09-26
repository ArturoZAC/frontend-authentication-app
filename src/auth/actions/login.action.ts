import { AxiosError } from "axios";
import { authApi } from "@/api/authApi";
import type { UserResponse } from "../interfaces/user.response";

interface loginInputs {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: loginInputs) => {
  try {
    const { data } = await authApi.post<UserResponse>("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.error;
    }
    throw error;
  }
};
