import { prisma } from "@/prisma/client";
import KartaSlotow from "./KartySlotow";
import ButtonMarlenka from "./ButtonMarlenka";

export default async function ListaGrupSlotow() {
  const grupy = await prisma.slot.groupBy({
    by: ["data", "locationId"],
    where: { active: true },
    _count: true,
    orderBy: [{ data: "asc" }],
  });

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {grupy.map((grupa) => (
          <KartaSlotow
            key={`${grupa.data}-${grupa.locationId}`}
            data={grupa.data}
            locationId={grupa.locationId}
          />
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <ButtonMarlenka />
      </div>
    </>
  );
}
