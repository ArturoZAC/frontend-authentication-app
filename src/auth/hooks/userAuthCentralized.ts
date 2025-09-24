import { useMutation, useQuery } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";
import { loginAction } from "../actions/login.action";
import { resetPasswordAction } from "../actions/resetPassword.action";
import { resetPasswordWithCodeAction } from "../actions/resetPasswordWithCode.action";
import { renewTokenAction } from "../actions/renewToken.action";

export const useAuthCentralized = () => {
  const mutation = useMutation({
    mutationFn: registerAction,
  });

  const mutationLogin = useMutation({
    mutationFn: loginAction,
  });

  const mutationResetPasswordWithEmail = useMutation({
    mutationFn: resetPasswordAction,
  });

  const mutationResetPasswordWithCode = useMutation({
    mutationFn: resetPasswordWithCodeAction,
  });

  const renewTokenQuery = useQuery({
    queryKey: ["renew"],
    queryFn: renewTokenAction,
    retry: false,
    refetchInterval: 1000 * 60 * 90,
    refetchOnWindowFocus: false,
  });

  return {
    mutation,
    mutationLogin,
    mutationResetPasswordWithEmail,
    mutationResetPasswordWithCode,
    renewTokenQuery,
  };
};
