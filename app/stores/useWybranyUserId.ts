import { create } from "zustand";

interface UzytkownikId { 
    uzytkownikId: number | null 
    ustawUzytkownika: (id: number | null) => void 
}

export const useWybranyUzytkownik = create<UzytkownikId>((set) => ({ 
    uzytkownikId: null, 
    ustawUzytkownika: (id) => set({uzytkownikId: id})
}))