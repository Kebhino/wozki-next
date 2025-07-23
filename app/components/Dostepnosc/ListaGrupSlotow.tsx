import { prisma } from "@/prisma/client";
import KartaSlotow from "./KartySlotow";

export default async function ListaGrupSlotow() {
  const grupy = await prisma.slot.groupBy({
    by: ["data", "locationId"],
    where: { active: true },
    _count: true,
    orderBy: [{ data: "asc" }],
  });

  const komponenty = await Promise.all(
    grupy.map((grupa) => (
      <KartaSlotow
        key={`${grupa.data}-${grupa.locationId}`}
        data={grupa.data}
        locationId={grupa.locationId}
      />
    ))
  );

  return <div className="flex flex-wrap gap-6">{komponenty}</div>;
}
