import { create } from "zustand";

interface GlobalDialogStore {
  idDoUsuniecia: string | null;
  setIdDoUsuniecia: (id: string) => void;
  resetIdDoUsuniecia: () => void;
}

export const useGlobalDialogStore = create<GlobalDialogStore>((set) => ({
  idDoUsuniecia: null,
  setIdDoUsuniecia: (id) => set({ idDoUsuniecia: id }),
  resetIdDoUsuniecia: () => set({ idDoUsuniecia: null }),
}));
