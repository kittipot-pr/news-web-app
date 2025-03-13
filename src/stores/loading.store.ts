import { create } from "zustand";

interface LoadingStore {
  setLoading: (state: boolean) => void;
  openLoading: boolean;
}
export const useLoading = create<LoadingStore>((set) => ({
  setLoading: (value) => set(() => ({ openLoading: value })),
  openLoading: false,
}));
