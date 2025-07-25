import { prisma } from "@/prisma/client";
import KartyPrzydzialu from "./KartyPrzydzialu";

export default async function ListaGrupPrzydzialow() {
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
          <KartyPrzydzialu
            key={`${grupa.data}-${grupa.locationId}`}
            data={grupa.data}
            locationId={grupa.locationId}
          />
        ))}
      </div>
      <div className="flex justify-center mt-3"></div>
    </>
  );
}
