import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";

export const useAuthCentralized = () => {
  const mutation = useMutation({
    mutationFn: registerAction,
  });

  return {
    mutation,
  };
};
