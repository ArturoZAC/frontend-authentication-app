import { AxiosError } from "axios";
import { authApi } from "@/api/authApi";
import type { User } from "@/auth/interfaces/user.response";
// import { sleep } from "@/helpers/sleep";

export const getAllUsersAction = async () => {
  // await sleep();

  try {
    const { data } = await authApi.get<User[]>("/users");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.error;
    }
    throw error;
  }
};
