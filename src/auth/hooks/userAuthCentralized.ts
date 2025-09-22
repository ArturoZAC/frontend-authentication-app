import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";
import { loginAction } from "../actions/login.action";

export const useAuthCentralized = () => {
  const mutation = useMutation({
    mutationFn: registerAction,
  });

  const mutationLogin = useMutation({
    mutationFn: loginAction,
  });

  return {
    mutation,
    mutationLogin,
  };
};
