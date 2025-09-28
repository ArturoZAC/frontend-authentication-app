import {
  /* createBrowserRouter, */ createHashRouter,
  Navigate,
} from "react-router";

// HOME PAGE
import { DashboardPage } from "@/home/pages/DashboardPage";
import { HomePage } from "@/home/pages/HomePage";

//AUTH PAGE
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegistePage";
import { ResetPasswordPage } from "@/auth/pages/ResetPassword";
import { VerifyEmail } from "@/auth/pages/VerifyEmail";
import { ResetPasswordWithCode } from "@/auth/pages/ResetPasswordWithCode";
import { lazy } from "react";

const HomeLayout = lazy(() => import("../home/layouts/HomeLayout"));

// export const Approuter = createBrowserRouter([
export const Approuter = createHashRouter([
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
      {
        path: "reset-password/:codePassword",
        element: <ResetPasswordWithCode />,
      },
      {
        path: "verify-email/:codeVerification",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
