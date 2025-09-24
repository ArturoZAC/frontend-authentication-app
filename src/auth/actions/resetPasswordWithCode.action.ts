import { authApi } from "@/api/authApi";
import { AxiosError } from "axios";

export const resetPasswordWithCodeAction = async ({
  newPassword,
  code,
}: {
  newPassword: string;
  code: string;
}) => {
  try {
    const { data } = await authApi.post(`/auth/reset_password/${code}`, {
      newPassword,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.error;
    }
    throw error;
  }
};
