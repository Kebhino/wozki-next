import { create } from "zustand";

interface EdytowanePolaMapa {
  map: Map<number, string[]>;
  sprawdzCzyEdytowane: (id: number, pole: string) => boolean;
  dodajPoleDoMapy: (id: number, pole: string) => void;
  usunPoleZMapy: (id: number, pole: string) => void;
}

export const useEdytowanePolaMapa = create<EdytowanePolaMapa>((set, get) => ({
  map: new Map(),
  dodajPoleDoMapy: (id, pole) => {
    const nowaMapa = new Map(get().map);
    const aktualnePola = nowaMapa.get(id) || [];
    if (!aktualnePola.includes(pole))
      nowaMapa.set(id, [...aktualnePola, pole]);
    set({ map: nowaMapa });
  },
  usunPoleZMapy: (id, pole) => {
    const nowaMapa = new Map(get().map);
    const aktualne = nowaMapa.get(id)?.filter((p) => p !== pole) || [];
    if (aktualne.length > 0) {
      nowaMapa.set(id, aktualne);
    } else {
      nowaMapa.delete(id);
    }
    set({ map: nowaMapa });
  },
  sprawdzCzyEdytowane: (id, pole) => {
    const zapisywane = get().map.get(id);
    return !!zapisywane?.includes(pole);
  },
}));
