import { create } from "zustand";

interface UzytkownikStore { 
    uzytkownikId: number | null 
    ustawUzytkownika: (id: number | null) => void 
}

export const useWybranyUzytkownik = create<UzytkownikStore>((set) => ({ 
    uzytkownikId: null, 
    ustawUzytkownika: (id) => set({uzytkownikId: id})
}))