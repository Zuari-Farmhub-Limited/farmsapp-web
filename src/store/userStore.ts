import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Farmer } from "@/types";

interface SessionMeta {
  customerStore?:    number;
  preferredLanguage: string;
}

interface UserState {
  farmer:      Farmer | null;
  sessionMeta: SessionMeta;
  isLoggedIn:  boolean;

  setFarmer:      (farmer: Farmer, meta?: Partial<SessionMeta>) => void;
  clearSession:   () => void;
  updateLanguage: (lang: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      farmer:      null,
      isLoggedIn:  false,
      sessionMeta: { preferredLanguage: "English" },

      setFarmer: (farmer, meta) =>
        set((s) => ({
          farmer,
          isLoggedIn:  true,
          sessionMeta: { ...s.sessionMeta, ...meta },
        })),

      clearSession: () =>
        set({ farmer: null, isLoggedIn: false, sessionMeta: { preferredLanguage: "English" } }),

      updateLanguage: (lang) =>
        set((s) => ({ sessionMeta: { ...s.sessionMeta, preferredLanguage: lang } })),
    }),
    {
      name:       "farmsapp-user",
      partialize: (s) => ({ farmer: s.farmer, isLoggedIn: s.isLoggedIn, sessionMeta: s.sessionMeta }),
    },
  ),
);
