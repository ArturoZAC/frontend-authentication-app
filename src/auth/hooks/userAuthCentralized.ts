import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "../actions/resetPassword.action";
import { resetPasswordWithCodeAction } from "../actions/resetPasswordWithCode.action";

export const useAuthCentralized = () => {
  const mutationResetPasswordWithEmail = useMutation({
    mutationFn: resetPasswordAction,
  });

  const mutationResetPasswordWithCode = useMutation({
    mutationFn: resetPasswordWithCodeAction,
  });

  return {
    mutationResetPasswordWithEmail,
    mutationResetPasswordWithCode,
  };
};
