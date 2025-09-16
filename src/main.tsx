import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthenticationApp } from "./AuthenticationApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthenticationApp />
  </StrictMode>
);
