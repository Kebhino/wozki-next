import type { UserZTypem } from "@/app/components/TablicaUczestnikow/TabelaUczestnikow";
import { UserType } from "@/app/generated/prisma";

export const getParticipants = async (): Promise<UserZTypem[]> => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

  const users: UserZTypem[] = await res.json();

  return users.map((u) => ({
    ...u,
    createdAt: new Date(u.createdAt),
  }));
};

export const getUserTypes = async (): Promise<UserType[]> => {
  const res = await fetch("/api/user-types");
  if (!res.ok) throw new Error("Błąd pobierania statusów");

  return res.json();
};
