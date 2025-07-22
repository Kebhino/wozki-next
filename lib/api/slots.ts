import { Slot } from "@/app/generated/prisma";

export const getSlots = async (signal?: AbortSignal): Promise<Slot[]> => {
  const res = await fetch("/api/slots", {signal});
  if (!res.ok) throw new Error("Błąd pobierania uczestników");

    return res.json();
};


export async function updateSlotInDb(
  id: number,
  field: keyof Slot,
  value: string | number | boolean | Date
) {
  const res = await fetch("/api/slots", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, field, value }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się zaktualizować slotu.");
  }

  return await res.json();
}

export async function deleteSlotFromDb(id: number) {
  const res = await fetch("/api/slots", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się usunąć slotu.");
  }

  return await res.json();
}


