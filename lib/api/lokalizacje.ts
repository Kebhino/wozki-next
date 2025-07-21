import { Location } from "@/app/generated/prisma";

export const pobierzLokalizacje = async (signal?: AbortSignal): Promise<Location[]> => {
  const res = await fetch("/api/lokalizacje",{signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

    return res.json();
};



