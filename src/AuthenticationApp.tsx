import { type PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Approuter } from "./router/AppRouter";
import { useAuthStore } from "./auth/store/auth.store";
import { CustomLoader } from "./components/ui/CustomLoader";

const queryClient = new QueryClient();

const RenewTokenAuthProvider = ({ children }: PropsWithChildren) => {
  const { renewToken } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["renew"],
    queryFn: renewToken,
    retry: false,
    refetchInterval: 1000 * 60 * 60 * 23,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <CustomLoader />;

  return children;
};

export const AuthenticationApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <RenewTokenAuthProvider>
        <RouterProvider router={Approuter} />
      </RenewTokenAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
