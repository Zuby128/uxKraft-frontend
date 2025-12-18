import { create } from "zustand";

interface LoadingState {
  isOpen: boolean;
  openLoading: () => void;
  closeLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isOpen: false,
  openLoading: () => set({ isOpen: true }),
  closeLoading: () => set({ isOpen: false }),
}));
