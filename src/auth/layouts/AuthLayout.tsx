import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { CustomLoader } from "@/components/ui/CustomLoader";

export const AuthLayout = () => {
  const { status } = useAuthStore();

  if (status === "pending") {
    return <CustomLoader />;
  }

  if (status === "authorized") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <Outlet />
      </div>
    </div>
  );
};
