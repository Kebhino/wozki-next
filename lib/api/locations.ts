import { Location } from "@/app/generated/prisma";

export const getLocations = async (signal?: AbortSignal): Promise<Location[]> => {
  const res = await fetch("/api/locations",{signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

    return res.json();
};



