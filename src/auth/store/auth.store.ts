import { create } from "zustand";
import type { User, UserResponse } from "../interfaces/user.response";
import { devtools } from "zustand/middleware";
import { renewTokenAction } from "../actions/renewToken.action";
import { loginAction } from "../actions/login.action";

interface AuthState {
  user: Omit<User, "password"> | null;
  token: string | null;
  status: "pending" | "authorized" | "unauthorized";
  login: (email: string, password: string) => Promise<string | UserResponse>;
  logout: () => void;
  renewToken: () => Promise<boolean>;
  setPath: (path: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    path: null,
    user: null,
    token: null,
    status: "pending",
    login: async (email: string, password: string) => {
      try {
        const data = await loginAction({ email, password });
        localStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token, status: "authorized" });
        return data;
      } catch (error) {
        localStorage.removeItem("token");
        set({ user: null, token: null, status: "unauthorized" });
        return error;
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, token: null, status: "unauthorized" });
    },
    renewToken: async () => {
      try {
        const { token: newToken, user } = await renewTokenAction();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;

        if (newToken) {
          localStorage.setItem("token", newToken);
        }

        set({ user: rest, token: newToken, status: "authorized" });
        return true;
      } catch {
        localStorage.removeItem("token");
        set({ user: null, token: null, status: "unauthorized" });
        return false;
      }
    },
  }))
);
