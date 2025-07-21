import type { UserZTypem } from "@/app/components/TablicaUczestnikow/TabelaUczestnikow";


export const pobierzUczestnikow = async (signal?: AbortSignal): Promise<UserZTypem[]> => {
  const res = await fetch("/api/users", {signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

  const users: UserZTypem[] = await res.json();

  return users.map((u) => ({
    ...u,
    createdAt: new Date(u.createdAt),
  }));
};

