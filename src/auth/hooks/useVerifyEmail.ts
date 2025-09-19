import { useQuery } from "@tanstack/react-query";
import { verifyEmailAction } from "../actions/verifyEmail.action";

export const useVerifyEmail = (code: string) => {
  const { data: verifyData, isLoading } = useQuery({
    queryKey: ["codeVerification"],
    queryFn: () => verifyEmailAction(code),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    verifyData,
    isLoading,
  };
};
