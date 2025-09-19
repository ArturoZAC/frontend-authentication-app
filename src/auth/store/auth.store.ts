import { create } from "zustand";
import type { User } from "../interfaces/user.response";

interface AuthState {
  user: User | null;
}

export const useAuthStore = create<AuthState>()(() => ({
  user: null,
}));
