import { create } from "zustand";
import { UserZTypem } from "../components/TablicaUczestnikow/TabelaUczestnikow";

interface WybranyUserObiekt {
  user: UserZTypem | null;
  ustawUsera: (user: UserZTypem | null) => void;
}

export const useWybranyUserStore = create<WybranyUserObiekt>((set) => ({
  user: null,
  ustawUsera: (user) => set({ user }),
}));
