import { create } from "zustand";
import type { Cart } from "@/types";

interface CartState {
  cart:       Cart | null;
  itemCount:  number;
  setCart:    (cart: Cart) => void;
  clearCart:  () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  cart:      null,
  itemCount: 0,

  setCart: (cart) =>
    set({ cart, itemCount: cart.totalItems }),

  clearCart: () => set({ cart: null, itemCount: 0 }),
}));
