import { Slot } from "@/app/generated/prisma";

export const getSlots = async (signal?: AbortSignal): Promise<Slot[]> => {
  const res = await fetch("/api/slots", {signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

    return res.json();
};



