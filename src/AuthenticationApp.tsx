import { RouterProvider } from "react-router";
import { Approuter } from "./router/AppRouter";

export const AuthenticationApp = () => {
  return (
    <>
      <RouterProvider router={Approuter} />
    </>
  );
};
