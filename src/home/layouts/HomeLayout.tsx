import { useAuthStore } from "@/auth/store/auth.store";
import { CustomLoader } from "@/components/ui/CustomLoader";
import { Navigate, Outlet } from "react-router";

export const HomeLayout = () => {
  const { status } = useAuthStore();

  if (status === "pending") {
    return <CustomLoader />;
  }

  if (status === "unauthorized") {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
