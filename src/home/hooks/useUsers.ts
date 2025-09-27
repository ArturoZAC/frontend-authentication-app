import { useQuery } from "@tanstack/react-query";
import { getAllUsersAction } from "../actions/getUsers.action";

export const useUsers = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersAction,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    users,
  };
};
