import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PincodeInfo } from "@/types";

interface PincodeState {
  pincode:     number | null;
  storeId:     number | null;
  pincodeInfo: PincodeInfo | null;
  dismissed:   boolean;              // user dismissed the prompt

  setPincode:  (pincode: number, info: PincodeInfo, storeId?: number) => void;
  clearPincode:() => void;
  dismiss:     () => void;
}

export const usePincodeStore = create<PincodeState>()(
  persist(
    (set) => ({
      pincode:     null,
      storeId:     null,
      pincodeInfo: null,
      dismissed:   false,

      setPincode: (pincode, info, storeId) =>
        set({ pincode, pincodeInfo: info, storeId: storeId ?? null, dismissed: true }),

      clearPincode: () =>
        set({ pincode: null, storeId: null, pincodeInfo: null }),

      dismiss: () => set({ dismissed: true }),
    }),
    {
      name:    "farmsapp-pincode",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
    },
  ),
);
