import { create } from "zustand";
import type { AdminUser } from "../types/auth";

interface AuthState {
  token: string | null;
  admin: AdminUser | null;
  setCredentials: (token: string, admin: AdminUser) => void;
  logout: () => void;
}

const STORAGE_KEY = "aws-club-admin-auth";

const readInitialState = (): Pick<AuthState, "token" | "admin"> => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { token: null, admin: null };
  }

  try {
    return JSON.parse(raw) as Pick<AuthState, "token" | "admin">;
  } catch {
    return { token: null, admin: null };
  }
};

const persistState = (token: string | null, admin: AdminUser | null): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, admin }));
};

export const useAuthStore = create<AuthState>((set) => ({
  ...readInitialState(),
  setCredentials: (token, admin) => {
    persistState(token, admin);
    set({ token, admin });
  },
  logout: () => {
    persistState(null, null);
    set({ token: null, admin: null });
  }
}));
