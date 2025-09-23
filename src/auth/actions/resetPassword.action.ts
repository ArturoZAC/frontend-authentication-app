import { AxiosError } from "axios";
import { authApi } from "@/api/authApi";

export const resetPasswordAction = async ({
  email,
  frontBaseUrl,
}: {
  email: string;
  frontBaseUrl: string;
}) => {
  try {
    const { data } = await authApi.post("/auth/reset_password/email", {
      email,
      frontBaseUrl,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error);
    }

    throw error;
  }
};
