import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Approuter } from "./router/AppRouter";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const AuthenticationApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <RouterProvider router={Approuter} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
