import { AxiosError } from "axios";
import { authApi } from "@/api/authApi";
// import { sleep } from "@/helpers/sleep";

interface verifyResponse {
  status: string;
  ok: boolean;
}

export const verifyEmailAction = async (code: string) => {
  // await sleep();

  try {
    const { data } = await authApi.get<verifyResponse>(`/auth/verify/${code}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log({ error: error.response });
      const message = error.response?.data?.error || "Error en la petición";
      throw message;
    }
    throw error;
  }
};
