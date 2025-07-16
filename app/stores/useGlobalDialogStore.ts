import { create } from "zustand";

interface GlobalDialogStore {
  idDoUsuniecia: number | null;
  setIdDoUsuniecia: (id: number) => void;
  resetIdDoUsuniecia: () => void;
}

export const useGlobalDialogStore = create<GlobalDialogStore>((set) => ({
  idDoUsuniecia: null,
  setIdDoUsuniecia: (id) => set({ idDoUsuniecia: id }),
  resetIdDoUsuniecia: () => set({ idDoUsuniecia: null }),
}));
