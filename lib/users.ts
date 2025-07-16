import { Uzytkownik } from "@/app/types/user";

export const getParticipants = async (): Promise<Uzytkownik[]> => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Błąd pobierania uczestników");
  return res.json();
};

export const getUserTypes = async (): Promise<{ id: number; type: string }[]> => {
  const res = await fetch("/api/user-types");
  if (!res.ok) throw new Error("Błąd pobierania statusów");
  return res.json();
};
