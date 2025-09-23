import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";
import { loginAction } from "../actions/login.action";
import { resetPasswordAction } from "../actions/resetPassword.action";

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

  return {
    mutation,
    mutationLogin,
    mutationResetPasswordWithEmail,
  };
};
