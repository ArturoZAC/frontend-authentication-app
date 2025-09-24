import { create } from "zustand";
import type { User } from "../interfaces/user.response";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: Omit<User, "password"> | null;
  token: string | null;
  status: "pending" | "authorized" | "unauthorized";
  login: (dataUser: Omit<User, "password">, dataToken: string | null) => void;
  logout: () => void;
  renewToken: (
    dataUser: Omit<User, "password">,
    dataToken: string | null
  ) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    token: null,
    status: "pending",
    login: (dataUser: Omit<User, "password">, dataToken: string | null) => {
      localStorage.setItem("token", dataToken!);
      set({ user: dataUser, token: dataToken, status: "authorized" });
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, token: null, status: "unauthorized" });
    },
    renewToken: (
      dataUser: Omit<User, "password">,
      dataToken: string | null
    ) => {
      localStorage.setItem("token", dataToken!);
      set({ user: dataUser, token: dataToken, status: "authorized" });
    },
  }))
);
