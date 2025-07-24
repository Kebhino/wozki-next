import { create } from "zustand";
import { UserZTypem } from "../components/TablicaUczestnikow/TabelaUczestnikow";

interface WybranyUserObiekt {
  user: UserZTypem | null;
  loadingUser: boolean;
  ustawUsera: (user: UserZTypem | null) => void;
  ustawLoadingUser: (wartosc: boolean) => void;
}

export const useWybranyUserStore = create<WybranyUserObiekt>((set) => ({
  user: null,
   loadingUser: false,
  ustawUsera: (user) => set({ user }),
  ustawLoadingUser: (wartosc) => set({ loadingUser: wartosc }),

}));
