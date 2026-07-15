import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/types/nav";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  // role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "hms-auth" }
  )
);
