import { Slot } from "@/app/generated/prisma";

export const pobierzSloty = async (signal?: AbortSignal): Promise<Slot[]> => {
  const res = await fetch("/api/sloty", {signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

    return res.json();
};



