import { UserType } from "@/app/generated/prisma";

export const pobierzStatusUczestnika = async (signal?: AbortSignal): Promise<UserType[]> => {
  const res = await fetch("/api/user-types", {signal});
  if (!res.ok) throw new Error("Błąd pobierania statusów");

  return res.json();
};
