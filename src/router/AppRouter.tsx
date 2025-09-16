import { createBrowserRouter, Navigate } from "react-router";

// HOME PAGE
import { HomeLayout } from "@/home/layouts/HomeLayout";
import { DashboardPage } from "@/home/pages/DashboardPage";
import { HomePage } from "@/home/pages/HomePage";

//AUTH PAGE
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegistePage";
import { ResetPasswordPage } from "@/auth/pages/ResetPassword";

export const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to={"/auth/login"} /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
