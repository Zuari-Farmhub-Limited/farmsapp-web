import { create } from "zustand";

interface UiState {
  isCartOpen:      boolean;
  isAuthModalOpen: boolean;
  openCart:        () => void;
  closeCart:       () => void;
  openAuthModal:   () => void;
  closeAuthModal:  () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  isCartOpen:      false,
  isAuthModalOpen: false,

  openCart:        () => set({ isCartOpen: true }),
  closeCart:       () => set({ isCartOpen: false }),
  openAuthModal:   () => set({ isAuthModalOpen: true }),
  closeAuthModal:  () => set({ isAuthModalOpen: false }),
}));
